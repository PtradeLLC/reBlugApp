import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const prisma = new PrismaClient();
const groq = new Groq({ apiKey: GROQ_API_KEY });

export async function POST(req) {
    try {
        // Ensure data is an array, even if a single object is sent
        let data = await req.json();
        if (!Array.isArray(data)) data = [data];

        const processedResults = await Promise.all(
            data.map(async (item) => {
                const { emails, plan, campaignPage } = item;

                // Safely destructure and provide default values
                const arrayPlanned = Array.isArray(plan) && plan.length > 0 ? plan[0]?.assistantResponse || '' : '';
                const { email: userEmail = '', name: userName = '' } = Array.isArray(emails) && emails.length > 0 ? emails[0] : {};

                // Check if we have the necessary data
                if (!userEmail || !userName) {
                    console.error('Missing email or name data:', item);
                    return { item, error: 'Missing email or name data' };
                }

                // Construct the prompt for the LLM
                const emailPrompt = `
                Write a catchy email subject line and an effective email body to promote a non-profit campaign to potential donors.

                Objectives and goals: ${arrayPlanned}
                Audience: ${userEmail} (${userName})

                Requirements:
                1. Subject Line: Summarize the objectives and goals in 9 words or less.
                2. Email Body: Write a persuasive email emphasizing the importance of the campaign, with a clear call to action. Make sure to directly address ${userName} and tailor the message to their interests. Keep email message friendly, short, and concise.
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
                const composedEmailLine = subjectMatch ? subjectMatch[1] : 'No Subject Found';

                // Extract email body by removing the line containing 'Subject:' and everything before it
                const emailBodyStartIndex = responseText.indexOf("Dear"); // Assumes email body starts with 'Dear {name}'
                let composedEmailBody = emailBodyStartIndex !== -1 ? responseText.substring(emailBodyStartIndex).trim() : '';

                // If there's no valid subject, do not proceed with sending the email
                if (composedEmailLine === 'No Subject Found') {
                    console.error('Invalid subject found for email:', { userEmail, composedEmailLine });
                    return { item, error: 'Invalid subject found for email' };
                }

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
                } else {
                    console.error('Invalid email data:', { userEmail, composedEmailLine, formattedEmailBody });
                    return { item, error: 'Invalid email data' };
                }
            })
        );

        console.log("PRORES", processedResults);

        // Return all processed results
        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}