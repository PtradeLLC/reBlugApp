// app/api/getNiche/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        let data = await req.json();

        // If data is not an array, convert it to one
        if (!Array.isArray(data)) {
            data = [data];
        }

        console.log("Data from the frontend", data);

        const processedResults = [];

        for (const item of data) {
            const groq = new Groq({ apiKey: GROQ_API_KEY });

            if (typeof item !== 'object') {
                return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
            }

            const composeSubjectLine = `${item.subject || 'Default Subject'}`;

            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    { "role": "user", "content": `Subject: ${composeSubjectLine}\n\n${item.message || ''}` }
                ],
                "model": "llama-3.1-70b-versatile",
                "temperature": 0.5,
                "max_tokens": 8000,
                "top_p": 1,
                "stream": true
            });

            let assistantResponse = "";
            for await (const chunk of chatCompletion) {
                assistantResponse += chunk.choices[0]?.delta?.content || '';
            }

            processedResults.push({ item, assistantResponse });
        }

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
