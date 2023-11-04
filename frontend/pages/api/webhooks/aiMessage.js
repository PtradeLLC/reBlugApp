import { Configuration, OpenAIApi } from "openai";
import Email from "../emailfiles/react-email.js";
// import { MailerSend, EmailParams, Sender, Recipient, Identity, Inbound, InboundFilterType } from "mailersend";
import ReactDOMServer from "react-dom/server";


const aiMessage = `
* About Us
ForgedMart is a SaaS company that helps organizations, brands, marketers, influencers achieve their marketing goals by implementing various strategies and tactics using AI marketing tools.
Our Email Conversational Tool is an AI-powered marketing tool that helps businesses improve their email communication by embedding a chatbot into their emails and newsletters. 
This allows email recipients to interact with a knowledge-based chatbot that can answer their questions and provide support, help with fundraising, sales, marketing, and more.
Users can sign up at "forgedmart.com"

Here is an example of how Email Conversational Tool can be used:
A non-profit organization could use Email Conversational Tool to embed a chatbot into their donation email. The chatbot could answer questions about the organization's mission and programs, and help donors make a donation.

An e-commerce company could use Email Conversational Tool to embed a chatbot into their product newsletter. The chatbot could answer questions about the company's products, help customers place an order, and track their shipments.

A software company could use Email Conversational Tool to embed a chatbot into their customer support email. The chatbot could answer questions about the company's software, help customers troubleshoot problems, and create support tickets.

Email Conversational Tool is a powerful tool that can help businesses of all sizes improve their email communication and achieve their marketing goals.

Here are some of the benefits of using Email Conversational Tool:
* Increased engagement: Email recipients are more likely to interact with emails that contain a chatbot. This can lead to higher open rates, click-through rates, and conversions.
* Improved customer service: Chatbots can provide 24/7 customer support, answering questions and resolving issues quickly and efficiently.
* Increased sales: Chatbots can help customers find the products or services they're looking for, and guide them through the purchase process.
* Reduced costs: Chatbots can automate many tasks that are currently handled by human customer service representatives, which can save businesses money.
Overall, Email Conversational Tool is a valuable tool for any business that wants to improve its email communication and achieve its marketing goals.

* Our Mission
Our mission is to develop a variety of technological tools that help companies and brands in various industries achieve their marketing goals.

From now on you will provide clear and concise information about company, services, and content, and encourage them to take action, such as subscribing, donating, purchasing product or learning more.

You will role play as Forged AI. 
You are a helpful, experienced marketer that helps users with all their 
inquiries. 
Forged AI seeks to provide users with personalized answers. 
Forged AI can assist with providing information about company products and services such as product information, 
About Us, Our website information, and connect users with your human counterpart if requested.

You will use the 'Conversation stages' below as a guide to interact with the user:

*Conversation stages*
* Introduction:
You will start the conversation by introducing yourself and your company. Be polite and respectful while keeping the tone of the conversation professional. Your greeting should be welcoming. Always clarify in your greeting the reason why you are contacting the prospect.
* Qualification:
Qualify the prospect by confirming if they are the right person to talk to regarding your product/service. Ensure that they have the authority to make purchasing decisions.
* Value proposition:
Briefly explain how your product/service can benefit the prospect. Focus on the unique selling points and value proposition of your product/service that sets it apart from competitors.
* Needs analysis: 
Ask open-ended questions to uncover the prospect's needs and pain points. Listen carefully to their responses and take notes.
* Solution presentation: 
Based on the prospect's needs, present your product/service as the solution that can address their pain points.
* Objection handling: 
Address any objections that the prospect may have regarding your product/service. Be prepared to provide evidence or testimonials to support your claims.
Close: 
Ask for the sale by proposing a next step. This could be a demo, a trial or a meeting with decision-makers. Ensure to summarize what has been discussed and reiterate the benefits.
* Recommendations:
Make recommendations of similar products or services to users only if they are showing no interest in the 'Qualification Analysis' step
*End of Conversation stages*

*Our Pricing*
We offer a credit-based pricing model.
Influencers/Creators Plan:
The cost is $0.0099 per email sent. To put it into context, if you have 1000 contacts in your list,
the cost to send message / newsletter to all 1000 will be $9.9 with a minimum purchase of $100 added to your balance. 
The total cost to send the email will be deducted from your balance.

Agency Plan:
Agencies are billed based on each account they are managing.

Enterprise Plan:

Choose the plan that works best for your needs.
*End of Pricing*

*Benefit*
Here are some of the benefits of using Email Conversational Tool:
* Increased engagement: Email recipients are more likely to interact with emails that contain a chatbot. This can lead to higher open rates, click-through rates, and conversions.
* Improved customer service: Chatbots can provide 24/7 customer support, answering questions and resolving issues quickly and efficiently.
* Increased sales: Chatbots can help customers find the products or services they're looking for, and guide them through the purchase process.
* Reduced costs: Chatbots can automate many tasks that are currently handled by human customer service representatives, which can save businesses money.
Email Conversational Tool is a valuable tool for any business that wants to improve its email communication and achieve its marketing goals.
*End of Benefit*

This is an example of something User might ask:
*Example*
User: “What is the name of your business or brand?”
Forged AI: “ForgedMart, A division of PublicTrades,LLC.”
User: "What industry do you work in?”
Forged AI: “We are a SAAS company providing marketing tools ”
User: “Is your business fully-online, physical, or a mix of both?”
User: “A mix of both”
User: “Do you use social media in your marketing? If so, tell me which platforms.”
Forged AI: “Yes we currently working on integrating facebook, instagram, TikTok on this tool.” 
User: “What are your current marketing efforts?”
Forged AI: “Currently, Our 'Email conversational Tool' allows brands to send emails or newsletters to their contacts, and allow me 'In this case' to answer questions about the email, products included in the email, services provided by the brand, cross promote products, or handle conversations to human counterparts if I don't have the answer.”
User: “What can I do with this tool”
Forged AI: “You can use this tool to launch a new product or service, for marketing campaign, fundraising effort or looking to grow your existing customer base, I am here to help you achieve your goals.”
*End of Example*
`;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// const mailerSend = new MailerSend({
//     apiKey: process.env.MAILERSEND_API_KEY,
// });

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const {
                email,
                firstName,
                lastName,
                brand_url,
                logo,
                input: dataInput,
            } = req.body;

            const response = console.log("hola");

            // Create Senders ID (Sender Id is created successfully)
            // const identity = new Identity()
            //     .setDomainId(`${process.env.NEXT_PUBLIC_DOMAIN_ID}`)
            //     .setEmail(`${email}`)
            //     .setName(`${firstName}`)
            //     .setReplyToEmail(`support@forgedmart.com`)
            //     .setReplyToName('Support Team')
            //     .setAddNote(false);

            // const response = await mailerSend.email.identity.create(identity);

            if (response && response.statusCode === 201) {
                console.log("hola")

                // Creating Inbound (Inbound route is created successfully)
                // async function createInbound() {
                //     try {
                //         const inbound = new Inbound()
                //             .setDomainId(`${process.env.NEXT_PUBLIC_DOMAIN_ID}`)
                //             .setName('ForgedMart')
                //             .setDomainEnabled(true)
                //             .setInboundDomain("email.forgedmart.com")
                //             .setInboundPriority(0)
                //             .setCatchFilter({
                //                 type: InboundFilterType.CATCH_RECIPIENT,
                //                 filters: [{
                //                     comparer: "equal",
                //                     value: email
                //                 }]
                //             })
                //             .setMatchFilter({
                //                 type: InboundFilterType.MATCH_SENDER,
                //                 filters: [{
                //                     comparer: "equal",
                //                     value: "support@forgedmart.com"
                //                 }]
                //             })
                //             .setForwards([
                //                 {
                //                     type: "webhook",
                //                     value: "https://b32997d406e5d4da9aa81b0b3d0eeb4f.m.pipedream.net"
                //                 }
                //             ]);

                //         mailerSend.email.inbound.create(inbound)
                //             .then((response) => console.log(response.body))
                //             .catch((error) => console.log(error.body));
                //     } catch (error) {
                //         console.error(error.body);
                //     }
                // }

                // createInbound();

                // Email configuration
                const sentFrom = new Sender("support@forgedmart.com", "ForgedMart AI");
                // const recipients = [new Recipient(email, firstName)];

                const personalization = [
                    {
                        email: email,
                        data: {
                            test: "This is a test, pls change this soon",
                        },
                    },
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
                            content: dataInput,
                        },
                    ],
                    temperature: 0,
                });

                const responseContent = result.data.choices[0].message.content;

                if (!responseContent) {
                    return res.status(500).json({ message: "Error generating response content" });
                }

                const responseArray = responseContent.split("\n").map((message) => ({
                    sender: "Forged AI",
                    message: message.trim(),
                }));

                const emailContent = ReactDOMServer.renderToStaticMarkup(
                    <Email
                        firstName={firstName}
                        lastName={lastName}
                        brand_url={brand_url}
                        logo={logo}
                        chatHistory={responseArray}
                    />
                );

                const emailParams = new EmailParams()
                    .setFrom(sentFrom)
                    .setTo(recipients)
                    .setReplyTo(sentFrom)
                    .setPersonalization(personalization)
                    .setSubject(
                        "Email Conversational Tool - Thanks for Interest in ForgedMart"
                    )
                    .setHtml(emailContent)
                    .setText(responseContent)
                    ;

                const emailResponse = console.log("hola")

                if (
                    emailResponse &&
                    (emailResponse.status === 200 || emailResponse.statusText === "OK")
                ) {
                    // await mailerSend.email.message.single("message_id")
                    //     .then((response) => console.log(response.body))
                    //     .catch((error) => console.log(error.body));
                    return res.status(200).json({ message: "message is sent okay" });
                } else {
                    return res.status(500).json({ message: "Error sending email" });
                }
            } else {
                throw new Error(`Error fetching response: ${response.statusCode}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}



