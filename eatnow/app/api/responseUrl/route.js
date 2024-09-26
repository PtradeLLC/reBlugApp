import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import { error } from 'console';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

const MAX_RETRIES = 3;

function isValidChatbotResponse(response) {
    // Add any specific validation logic here
    return response.trim().length > 0;
}

// async function processSingleMessage(message) {
//     const groq = new Groq({
//         apiKey: GROQ_API_KEY,
//     });

//     let retries = 0;
//     let assistantResponse = '';

//     while (retries < MAX_RETRIES) {
//         try {
//             const chatCompletion = await groq.chat.completions.create({
//                 messages: [message],
//                 model: "llama-3.1-70b-versatile",
//                 temperature: 0.5,
//                 max_tokens: 8000,
//                 top_p: 1,
//                 stream: true,
//             });

//             for await (const chunk of chatCompletion) {
//                 assistantResponse += chunk.choices[0]?.delta?.content || '';
//             }

//             if (isValidChatbotResponse(assistantResponse)) {
//                 return assistantResponse;
//             } else {
//                 console.log(`Attempt ${retries + 1} produced an invalid response. Retrying...`);
//                 retries++;
//             }
//         } catch (error) {
//             console.error(`Attempt ${retries + 1} failed:`, error);
//             retries++;
//             if (retries === MAX_RETRIES) {
//                 throw new Error('Max retries reached');
//             }
//             await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
//         }
//     }

//     throw new Error('Failed to generate valid response after max retries');
// }

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Invalid messages format', status: 'INVALID_MESSAGES' }, { status: 400 });
        }

        // [ { role: 'user', content: 'whats the plan' }, { role: 'assistant' } ]

        const getContent = messages.map((message) => {
            return {
                role: message.role,
                content: message.content,
            };
        });

        const userMessage = getContent[0].content;

        if (userMessage) {
            //Fetch aiResponse from `/api/partner/nationbuilderV1`
            const response = await fetch("/api/partner/nationbuilderV1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: userMessage,
                }),
            });

            if (!response.ok) {
                console.log("Error fetching aiResponse:", error, response.statusText);
                throw new Error("Failed to fetch aiResponse", error);
            }

            const data = await response.json();
            console.log("Data from responseUrl:", data);

            return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid userMessage', status: 'INVALID_USER_MESSAGE' }, { status: 400 });
        }


        // const assistantResponse = await processSingleMessage(messages);

        // Save the response to the database
        // try {
        //     await prisma.conversation.create({
        //         data: {
        //             messages: content.messages,
        //             response: assistantResponse,
        //         },
        //     });
        // } catch (dbError) {
        //     console.error('Error saving to database:', dbError);
        //     // Continue with the response even if database save fails
        // }

        // return NextResponse.json({ assistantResponse, status: 'SUCCESS' }, { status: 200 });
        return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Internal Server Error',
            status: 'ERROR'
        }, { status: 500 });
    }
}