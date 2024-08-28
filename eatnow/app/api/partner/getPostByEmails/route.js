
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
            const { emails, plan, campaignPage } = item;

            let arrayPlanned;
            let userEmail;
            let userName;

            for (const planArray of plan) {
                arrayPlanned = planArray.assistantResponse;
            }

            if (item) {
                for (const emailObj of emails) {
                    const { email, name } = emailObj;
                    try {
                        userEmail = email;
                        userName = name;

                        // Make a request to RESEND API HERE with name and email


                    } catch (error) {
                        console.error('Error fetching email data:', error);
                        // Continue processing even if an error occurs
                    }
                }
            }

            // Construct the prompt for the LLM
            const emailPrompt = `
            Write a catchy email subject line and an effective email body to promote a non-profit campaign to potential donors.

            Objectives and goals: ${arrayPlanned}
            Audience: ${userEmail} (${userName})

            Requirements:
            1. Subject Line: Summarize the objectives and goals in 9 words or less.
            2. Email Body: Write a persuasive email emphasizing the importance of the campaign, with a clear call to action. Make sure to directly address ${userName} and tailor the message to their interests.
            3. Encourage recipients to start a conversation with a trained assistant.
            4. Reference ${campaignPage} as the website of the campaign.
            5. Currency: Use the currency based on the selected country or symbol used for the currency (e.g: $ for United States, ₦ for Nigeria). 
            

            Example Email:
            Subject: "${userName}, help unlock support for the next generation."

            We need your support to help unlock opportunities for the next generation. Our campaign focuses on [insert key points from objectives and goals].

            By contributing, you can make a significant impact on the lives of [target audience], ensuring they receive the support they need to thrive. Your generosity can make all the difference.

            Please consider donating today by visiting ${campaignPage} to help us achieve our mission.
 
            If you have any questions or would like to learn more about our campaign, please respond to this very email to promptly chat with our AI assistant trained specifically to assist and answer your questions.

            Best regards,
            [Your Organization Name]
            `;

            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    { "role": "user", "content": emailPrompt }
                ],
                "model": "llama-3.1-70b-versatile",
                "temperature": 0.7,
                "max_tokens": 500,
                "top_p": 1,
                "stream": true
            });

            let responseText = "";
            for await (const chunk of chatCompletion) {
                responseText += chunk.choices[0]?.delta?.content || '';
            }

            const subjectMatch = responseText.match(/Subject: (.*)/i);
            const emailBodyMatch = responseText.split(/Dear\s+/i)[1];

            // Use a simple split or regex to separate subject line and body
            const [composedEmailLine, ...composedEmailBodyParts] = responseText.split("\n\n");
            const composedEmailBody = composedEmailBodyParts.join("\n\n").trim();

            processedResults.push({
                item,
                composedEmailLine: composedEmailLine.trim(),
                composedEmailBody: composedEmailBody
            });
        }

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}