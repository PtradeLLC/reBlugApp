import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const prisma = new PrismaClient();
const groq = new Groq({ apiKey: GROQ_API_KEY });

export async function POST(req) {
    try {
        let data = await req.json();
        if (!Array.isArray(data)) data = [data]; // Ensure data is an array

        const processedResults = [];
        const emailPromises = data.map(async (item) => {
            const { emails, plan, campaignPage } = item;

            // Default values and destructuring
            const arrayPlanned = Array.isArray(plan) && plan.length > 0 ? plan[0]?.assistantResponse : '';
            const { email: userEmail = '', name: userName = '' } = Array.isArray(emails) && emails.length > 0 ? emails[0] : {};

            ///////////Scrape website to use as knowledge base////////////

            const knowledgeBase = "";


            ///////////////////////////////////////

            // Construct the prompt for the LLM
            const emailPrompt = `
            Write a catchy email subject line and an effective email body to promote a non-profit campaign to potential donors.

            Objectives and goals: ${arrayPlanned}
            Audience: ${userEmail} (${userName})

            Requirements:
            1. Subject Line: Summarize the objectives and goals in 9 words or less.
            2. Email Body: Write a persuasive email emphasizing the importance of the campaign, with a clear call to action. Make sure to directly address ${userName} and tailor the message to their interests. Keep email message friendly, short, and concise.
            3. Encourage recipients to start a conversation with a trained assistant.
            4. Currency: Use the currency based on the selected country or symbol used for the currency (e.g: $ for United States, ₦ for Nigeria).

            Example Email:
             Subject: "${userName}, help unlock support for the next generation."
             

             Best regards,
             [Your Organization Name]
             ;
            `;

            // Generate email using the LLM
            let responseText = '';
            try {
                const chatCompletion = await groq.chat.completions.create({
                    "messages": [{ "role": "user", "content": emailPrompt }],
                    "model": "llama-3.1-70b-versatile",
                    "temperature": 0.7,
                    "max_tokens": 500,
                    "top_p": 1,
                    "stream": true
                });

                for await (const chunk of chatCompletion) {
                    responseText += chunk.choices[0]?.delta?.content || '';
                }
            } catch (llmError) {
                console.error('Error generating email content:', llmError);
                return { item, error: 'Failed to generate email content' };
            }

            // Extract the subject line and email body
            const subjectMatch = responseText.match(/Subject:\s*"([^"]+)"/i);
            const composedEmailLine = subjectMatch ? subjectMatch[1] : 'How do we Win Tyrese!!!';
            const composedEmailBody = responseText.split("\n\n").slice(1).join("\n\n").trim();

            // Format the email body with proper HTML
            const formattedEmailBody = composedEmailBody
                .split("\n\n")
                .map(paragraph => `<p>${paragraph}</p>`)
                .join("\n");

            // Send email using the Resend API
            if (userEmail && composedEmailLine && formattedEmailBody) {
                try {
                    const res = await fetch('https://api.resend.com/emails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${RESEND_API_KEY}`,
                        },
                        body: JSON.stringify({
                            from: 'marketing@reblug.com',
                            to: [userEmail],
                            subject: composedEmailLine,
                            html: formattedEmailBody,
                        }),
                    });

                    if (!res.ok) {
                        throw new Error(`Failed to send email: ${res.statusText}`);
                    }

                    const emailResponse = await res.json();
                    return { item, composedEmailLine, formattedEmailBody, emailResponse };
                } catch (emailError) {
                    console.error('Error sending email:', emailError);
                    return { item, error: 'Failed to send email' };
                }
            }

            return { item, composedEmailLine, formattedEmailBody };
        });

        // Await all email processing promises
        const results = await Promise.all(emailPromises);
        processedResults.push(...results);

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}