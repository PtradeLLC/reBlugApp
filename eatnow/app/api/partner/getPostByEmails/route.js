import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import axios from 'axios';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        let data = await req.json();

        // If data is not an array, convert it to one
        if (!Array.isArray(data)) {
            data = [data];
        }

        const processedResults = [];

        for (const item of data) {
            const { emails, subjectLine, message } = item;

            const accessToken = `${process.env.FACEBOOK_ACCESS_TOKEN}`

            // 1. Fetch Facebook data using emails and name in the emails array
            let facebookData = null;
            if (accessToken) {
                for (const emailObj of emails) {
                    const { email, name } = emailObj;

                    console.log("Email::", email, name);

                    try {
                        const fbResponse = await axios.get('https://graph.facebook.com/v12.0/me', {
                            params: {
                                fields: 'id,name,photos,email,political,education,age_range,feed,fundraisers,gender,posts,groups',
                                access_token: accessToken,
                                email,
                                name,
                            },
                        });
                        facebookData = fbResponse.data;

                        // Only break out of the loop if successful data is retrieved
                        if (facebookData) break;
                    } catch (error) {
                        console.error('Error fetching Facebook data:', error);
                        // Continue processing even if the Facebook API request fails
                    }
                }
            }

            console.log("Facebook Data", facebookData);

            const emailSubjectLine = `
            Task: Compose Subject line based on posts.

            Objective:

            Use 'KeyName' as the keyword to dynamically compose a subject line for an email.

            Data:

            data: Initial data about the Cause and its target audience.
            `;

            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    { "role": "user", "content": `Subject: ${emailSubjectLine}` }
                ],
                "model": "llama-3.1-70b-versatile",
                "temperature": 0.5,
                "max_tokens": 8000,
                "top_p": 1,
                "stream": true
            });

            let composedEmailLine = "";
            for await (const chunk of chatCompletion) {
                composedEmailLine += chunk.choices[0]?.delta?.content || '';
            }

            processedResults.push({ item, composedEmailLine, facebookData });
        }

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}