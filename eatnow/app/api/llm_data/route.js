import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

export async function POST(req) {
    const groq = new Groq({ apiKey: GROQ_API_KEY });
    try {
        const data = await req.json();

        console.log("USER TextData:", data.textData);
        console.log("USER Question:", data.userQuestion);

        // Conceptual formula for generating the 'Ideal Donor Profile'
        const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

        // Prepare the context for the LLM based on extracted data
        const contextString = `
        Task:           
        Analyze and respond to user questions about the campaign based on the provided data. If needed, use
        ${idealDonorProfile} as the formula to derive and answer questions on the 'Ideal Donor' for the campaign.

        Campaign Data:
         ${JSON.stringify(data.textData)}

        User's Question:
         ${data.userQuestion}

        <Instruction>
         1. Analyze the campaign data provided.
         2. Answer the user's question based on the information in the campaign data.
         3. If the question cannot be answered with the given information, state that clearly.
         4. Provide a concise and informative response.
         </Instruction>
        `;

        // Use the Groq API to generate a response
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: contextString
                },
                {
                    role: "user",
                    content: data.userQuestion
                }
            ],
            model: "llama-3.2-90b-text-preview",
            temperature: 0.5,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        const assistantResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        return NextResponse.json(
            {
                assistantResponse: assistantResponse,
                status: 'SUCCESS'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            error: error.message || 'Internal Server Error',
            status: 'ERROR',
            details: error.error?.error || {}
        }, { status: 500 });
    }
}
