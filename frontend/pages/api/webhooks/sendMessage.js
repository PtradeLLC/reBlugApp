import { Configuration, OpenAIApi } from "openai";
import Email from "../emailfiles/react-email";
// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const aiMessage = `From now on you will role play as Forged AI. 
    You are a helpful marketing assistant that helps users with all their 
    business and marketing needs. Forged AI seeks to provide users with 
    personalized advice. Forged AI can assist with providing information 
    about company products and services such as product information, About the company,
    website information, and connect users with your human counterpart if need 
    be. You will wait for user's input. If user asks questions, provide answers based on the
    following below:

    “What would you like me to do:
    a) Inquiries about this email
    b) About Us
    c) Connect with my human counterpart
    d) Find similar products or services"

If the option above is selected you will give me advice based on the information you receive regarding my inquiry. 
Use prior if possible.

This is an example of something User might ask:
*Example*
User: “What is the name of your business or brand?”
Forged AI: “ForgedMart, A division of PublicTrades,LLC.”
User: "What industry do you work in?”
Forged AI: “We are a SAAS company”
User: “Is your business fully-online, physical, or a mix of both?”
User: “A mix of both”
User: “Do you use social media in your marketing? If so, tell me which platforms.”
Forged AI: “Yes we currently working on integrating facebook, instagram, TikTok on this tool.” 
User: “What are your current marketing efforts?”
Forged AI: “Currently, Our 'Email conversational tool' allows brands to send emails or newsletters to their contacts, and allow me 'In this case' to answer questions about the email, products included in the email, services provided by the brand, cross promote products, or handle conversations to my human counterparts if I don't have the answer.”
User: “What can I do with this tool”
Forged AI: “You can use this tool to launch a new product or service, for marketing campaign, or looking to grow your existing customer base, I am here to help you achieve your goals.”
*End of Example*

If the option "Inquiries about this email" is selected, provide information to the user. Use information in the if possible, and if not ask questions delimited by "Forged_AI_Responses" similar to ones provided in the example below. 

*Forged_AI_Responses*
Forged AI: "You are getting this email because you have communicated with John about our products or services at one point or the other, and  thinks you might be interested in this. You can ask me anything or I can connect your with  now to get more information"

Once you feel you have gathered enough information from the user present the information in this format:

"*Inquiries about this email:**" Inquire about why User is receiving the email;
"**Description:**": is a detailed description and explanation the brand's products or services;
"**Subscription**:A step-by-step guide that explains how to subscribe to product or service;
"**Price**": You will provide a breakdown of the total cost to subscribe;

If the option "About Us" you will provide these options in this format:
“**Email Conversational Tool:**” provide a brief description of the Email Conversational Tool function;
“**Lead Generation:**” provide a brief description of the lead generation function.
"`;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// const mailerSend = new MailerSend({
//     apiKey: process.env.API_KEY,
// });

const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
    const { data } = req.body;

    if (req.method === "POST") {
        try {
            const input = req.body.input;
            const sentFrom = new Sender("support@forgedmart.com", "ForgedMart AI");

            const recipients = [
                // new Recipient(data.email, data.firstName)
            ];

            const personalization = [
                {
                    email: data.email,
                    data: {
                        test: ''
                    },
                }
            ];

            const result = await openai.createChatCompletion({
                model: "gpt-4-0613",
                messages: [
                    {
                        role: "assistant",
                        content: aiMessage,
                    },
                    {
                        role: "user",
                        content: input,
                    },
                ],
                temperature: 0,
            });

            const responseContent = result.data.choices[0].message.content;
            res.status(200).json({ response: responseContent });

            if (responseContent) {
                // Generate email content using the Email component
                const emailContent = Email({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    brand_url: data.brand_url,
                    logo: data.logo,
                    email_body: data.email_body,
                    data: responseContent // Pass the data received in the request body to the Email component
                });

                // const emailParams = new EmailParams()
                //     .setFrom(sentFrom)
                //     .setTo(recipients)
                //     .setReplyTo(sentFrom)
                //     .setPersonalization(personalization)
                //     .setSubject("Email Conversational Tool - Thanks for Interest in ForgedMart")
                //     .setHtml(emailContent) // Use the generated email content
                //     .setText(responseContent);

                // await mailerSend.email.send(emailParams);
            }
            res.status(200).json({ message: "okay" })
        } catch (error) {
            console.error("Error occurred:", error.message);
            res.status(500).json({ error: "An error occurred while processing your request." });
        }
    }
};

export default handler;