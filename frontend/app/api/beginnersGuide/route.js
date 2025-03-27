import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper function to format text by removing Markdown symbols
function formatText(text) {
    // Remove Markdown headings (###)
    let formattedText = text.replace(/###\s+/g, '');

    // Remove bold and italic formatting (*, **, ***)
    formattedText = formattedText.replace(/\*\*\*|\*\*|\*/g, '');

    // Remove list item formatting (* **)
    formattedText = formattedText.replace(/\*\s+\*\*/g, '');

    return formattedText;
}

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [],
    responseMimeType: "text/plain",
};

export const dynamic = "force-dynamic";

// Helper function to create a streaming response
function createStreamResponse(stream) {
    const encoder = new TextEncoder();
    return new Response(new ReadableStream({
        async start(controller) {
            try {
                // Send the initial message
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: "" })}\n\n`));

                // Process the stream
                for await (const chunk of stream) {
                    const content = chunk.text();
                    if (content) {
                        // Format the content to remove Markdown symbols
                        const formattedContent = formatText(content);
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: formattedContent })}\n\n`));
                    }
                }

                // Send the completion message
                controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
                controller.close();
            } catch (error) {
                console.error("Stream error:", error);
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
                controller.close();
            }
        },
    }), {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    });
}

// GET handler for streaming responses
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const prompt = url.searchParams.get("prompt");

        if (!prompt) {
            return new Response(JSON.stringify({ error: "Prompt is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Server configuration error: GEMINI_API_KEY is missing" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create a chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Get streaming response from Gemini
        try {
            const result = await chatSession.sendMessageStream(prompt);
            const stream = result.stream;

            if (!stream || typeof stream[Symbol.asyncIterator] !== 'function') {
                throw new Error('Invalid response stream from Gemini API');
            }

            return createStreamResponse(stream);
        } catch (error) {
            console.error('Generation error:', error);
            let statusCode = 500;
            let errorMessage = error.message;
            if (error.message.includes('API key') || error.message.includes('AUTH')) {
                statusCode = 401;
                errorMessage = 'Invalid API key';
            } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
                statusCode = 429;
                errorMessage = 'API quota exceeded';
            } else if (error.message.includes('network') || error.message.includes('connect')) {
                statusCode = 503;
                errorMessage = 'Network error connecting to AI service';
            }
            return new Response(JSON.stringify({ error: errorMessage }), {
                status: statusCode,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error("Error processing GET request:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// POST handler for non-streaming responses
export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!apiKey) {
            return NextResponse.json(
                { message: "Server configuration error: GEMINI_API_KEY is missing" },
                { status: 500 }
            );
        }

        // Create a chat session with Gemini
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        // Get the full response from Gemini
        const result = await chatSession.sendMessage(prompt);
        const responseText = result.response.text();

        // Format the response to remove Markdown symbols
        const formattedResponse = formatText(responseText);

        // Return the formatted response as JSON
        return NextResponse.json({ response: formattedResponse });
    } catch (error) {
        console.error("Error processing POST request:", error);
        let statusCode = 500;
        let errorMessage = error.message;
        if (error.message.includes('API key') || error.message.includes('AUTH')) {
            statusCode = 401;
            errorMessage = 'Invalid API key';
        } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
            statusCode = 429;
            errorMessage = 'API quota exceeded';
        } else if (error.message.includes('network') || error.message.includes('connect')) {
            statusCode = 503;
            errorMessage = 'Network error connecting to AI service';
        }
        return NextResponse.json(
            { message: errorMessage },
            { status: statusCode }
        );
    }
}
