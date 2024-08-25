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
            const { emails, plan } = item;

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
                    } catch (error) {
                        console.error('Error fetching email data:', error);
                        // Continue processing even if an error occurs
                    }
                }
            }

            // Construct the prompt for the LLM
            const emailPrompt = `
            Task:
            1. Write a catchy email subject line that increases open rates. 
            2. Write an effective email body to promote a non-profit campaign to potential donors.

            Objectives and goals: ${arrayPlanned}
            Audience: ${userEmail} (${userName})

            Instructions:
            - The subject line should summarize the objectives and goals in 9 words or less.
            - The email body should be persuasive, emphasize the importance of the campaign, and make a clear call to action.

            Example Subject Line:
            "${userName}, help unlock support for the next generation."

            Example Email Body:
            "Dear ${userName},

            We need your support to help unlock opportunities for the next generation. Our campaign focuses on [insert key points from objectives and goals]. 

            By contributing, you can make a significant impact on the lives of [target audience], ensuring they receive the support they need to thrive. Your generosity can make all the difference.

            Please consider donating today to help us achieve our mission.

            Best regards,
            [Your Organization Name]"
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

            // Separate the subject line from the body using regex or specific markers
            const [composedEmailLine, composedEmailBody] = responseText.split("\n\n");

            // Trim the responses to ensure they are clean
            const trimmedSubjectLine = composedEmailLine?.trim();
            const trimmedEmailBody = composedEmailBody?.trim();

            console.log("Composed Email Subject Line:", trimmedSubjectLine);
            console.log("Composed Email Body:", trimmedEmailBody);

            processedResults.push({
                item,
                composedEmailLine: trimmedSubjectLine,
                composedEmailBody: trimmedEmailBody
            });
        }

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import Groq from 'groq-sdk';
// import axios from 'axios';

// const GROQ_API_KEY = process.env.GROQ_API_KEY;
// const groq = new Groq({ apiKey: GROQ_API_KEY });

// const prisma = new PrismaClient();

// export async function POST(req) {
//     try {
//         let data = await req.json();

//         // If data is not an array, convert it to one
//         if (!Array.isArray(data)) {
//             data = [data];
//         }

//         const processedResults = [];

//         for (const item of data) {
//             const { emails, plan } = item;

//             let arrayPlanned;
//             let userEmail;
//             let userName;

//             for (const planArray of plan) {
//                 arrayPlanned = planArray.assistantResponse;
//             }

//             if (item) {
//                 for (const emailObj of emails) {
//                     const { email, name } = emailObj;
//                     try {
//                         userEmail = email;
//                         userName = name;
//                     } catch (error) {
//                         console.error('Error fetching email data:', error);
//                         // Continue processing even if an error occurs
//                     }
//                 }
//             }

//             const emailSubjectLine = `
//             Write a catchy email subject line that increases open rates. The subject line should summarize the following: 
//             1. objectives and goals: ${arrayPlanned} 
//             2. Audience: ${userEmail} (${userName})

//             <INSTRUCTION>
//             Use details in the ${arrayPlanned} to personalize each email's subject line.

//             Example:
//             1. ${userName}, help unlock support for the next generation.
//             2. Campaign needs comprehensive support for every child from you ${userName}.
//             3. Keep subject line down to nine words or less.
//             </INSTRUCTION>
//             `;

//             const chatCompletion = await groq.chat.completions.create({
//                 "messages": [
//                     { "role": "user", "content": emailSubjectLine }
//                 ],
//                 "model": "llama-3.1-70b-versatile",
//                 "temperature": 0.7,
//                 "max_tokens": 100,
//                 "top_p": 1,
//                 "stream": true
//             });

//             let composedEmailLine = "";
//             for await (const chunk of chatCompletion) {
//                 composedEmailLine += chunk.choices[0]?.delta?.content || '';
//             }

//             // Trim the response to ensure it's a single line
//             composedEmailLine = composedEmailLine.trim();
//             console.log("Composed Email Subject Line:", composedEmailLine);

//             processedResults.push({ item, composedEmailLine });
//         }

//         return NextResponse.json({ results: processedResults }, { status: 200 });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }