import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);
        const email = session.user.email;

        if (req.method === 'POST') {
            const formData = req.body;

            // Fetch the user from the database
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (user) {
                // User exists, create an instance of ProductLaunchData and save the formData
                const savedData = await prisma.productLaunchData.create({
                    data: {
                        title: formData.title,
                        feature01: formData.feature01,
                        feature02: formData.feature02,
                        feature03: formData.feature03,
                        demographic: formData.demographic,
                        company: formData.company,
                        geographic: formData.geographic,
                        job_title: formData.job_title,
                        about: formData.about,
                        objectives: formData.objectives,
                        client_type: formData.client_type,
                        pain_point01: formData.pain_point01,
                        pain_point02: formData.pain_point02,
                        pain_point03: formData.pain_point03,
                        pain_point04: formData.pain_point04,
                        unique01: formData.unique01,
                        unique02: formData.unique02,
                        unique03: formData.unique03,
                        unique04: formData.unique04,
                        tool01: formData.tool01,
                        tool02: formData.tool02,
                        tool03: formData.tool03,
                        tool04: formData.tool04,
                        website: formData.website,
                    }
                });


                const postData = {
                    "model": "togethercomputer/llama-2-70b-chat",
                    "max_tokens": 2480,
                    "prompt": `[INST] You are a seasoned marketing strategist for a business-to-business software company.
                    "Objectives" = "Goals that you need to accomplish"
                    "Task" = "Steps taken to accomplish the goals"
                    Your "Objectives" are to:
                    1. Analyze the 'input': "${savedData.about}".         
                    2. "Task": Based on the analyzed input, create a detailed profile of
                    25 "ideal customers" based on market research, customer personas, and past customer data. 
                    Identify key characteristics, define pain points, and needs that the product addresses.    
                    3. "Task": Refine the above 'Ideal customer' list to include only ones that are likely to 
                    purchase the product based on the above ${savedData.feature01}, ${savedData.feature02}, ${savedData.feature03}.
                    4. "Task": Refine the above list of 'Ideal customer' to include ONLY ones that are likely 
                    to purchase the product based on ${savedData.pain_point01}, ${savedData.pain_point02}, ${savedData.pain_point03}, ${savedData.pain_point04} and the ${savedData.client_type}.
                    5. "Task": Refine the above list of 'Ideal customer' to include ONLY ones that are likely to 
                    purchase the product based on its ${savedData.unique01}, ${savedData.unique02}, ${savedData.unique03}, ${savedData.unique04}.
                    6. "Task": Based on 'REFINED LIST',  Write a code to generate email list of 'qualified contacts' for the 
                    product - Generate leads using Apollo API by following these tasks:
                    "Task":
                    1. Identify the job titles, industries, and locations of your ideal customers based on the refined list above.
                    2. Use Apollo.io's search filters to look for contacts that match your ideal customer profile. Filter by job title, company, location, industry, and other relevant criteria.
                    3. Export the contact information of the qualified leads into a spreadsheet, and save it to a variable with the name 'productLaunchEmailList'.[/INST]`,
                    "request_type": "language-model-inference",
                    "temperature": 0.7,
                    "top_p": 0.7,
                    "top_k": 50,
                    "repetition_penalty": 1,
                    "stream_tokens": true,
                    "stop": [
                        "[/INST]",
                        "</s>"
                    ],
                    "repetitive_penalty": 1,
                    "update_at": "2024-01-28T09:53:54.133Z",
                    "promptObj": {
                        "prompt": "“You are a seasoned marketing strategist for a business-to-business software company. Your objectives are to:* Analyzes the provided product information below.About the productThe product is 'A platform for brands, bloggers, and marketers to connect in a unified ecosystem. ForgedMart offers AI-powered tools and agency-level solutions tailored for brands and marketers    \"ForgedMart's flagship solutions include:    '1. **Email Marketing Tool:**  This unique AI-powered tool enables brands to send both transactional and marketing emails, and recipients to engage in inquiries about the email content, brand products, or services by interacting with an AI-powered chatbot embedded within the email body.    \"2. **Article Assistant:** Also powered by AI, this tool allows bloggers to integrate a conversational chatbot into every published article. It provides readers with a trusted companion to interact with, whether it's for fact-checking or inquiring about specific details while digesting the article content.\",Task: Based on the information about the product, Create a detailed profile of the 25 ideal customers based on market research, customer personas, and past customer data. Identify key characteristics, pain points, and needs that the product addresses.The product has the following  features:\u2028 feature01: 'Email Marketing tool',  feature02: 'Bloggers Article Helper',  feature03: 'Marketing automation',Task: Refine the above `Ideal customer` list to include only ones that are likely to purchase the product based on the above features.The product solves the following problems for 'B2B`(clientType): pain_point01: 'It improves open and click rates in email marketing', pain_point02: 'AI Powered marketing tool generates qualified email contact for brands and marketers', pain_point03: 'Provide a platform for marketing', pain_point04: 'Help brands and marketers launch successful email campaign, marketing campaign.', Task: Refine the above list of `Ideal customer` to include ONLY ones that are likely to purchase the product based on the problems it solves.The product is different from any other product in the market with these unique  features: unique01: 'The first of its kind to launch AI in the email body', unique02: 'It injects AI conversational chatbot in the email'Task: Refine the above list of `Ideal customer` to include ONLY ones that are likely to purchase the product based on its unique application.* Based on REFINED LIST, Generate an email list of qualified contacts for the product - leads using`Apollo.io` API.* Divide the email list into segments based on various criteria such as demographics, purchase history, engagement level, or preferences. * Create a detailed profile of the ideal customer based on market research, customer personas, and past customer data. Identify key characteristics, pain points, and needs that the product addresses.\" "
                    }
                };


                async function query(data) {
                    const response = await fetch(
                        "https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf",
                        {
                            headers: { Authorization: "Bearer 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" },
                            method: "POST",
                            body: JSON.stringify(data),
                        }
                    );
                    const result = await response.json();
                    return result;
                }

                query({
                    "inputs":
                        `You are a seasoned marketing strategist for a business-to-business software company.
                "Objectives" = "Goals that you need to accomplish"
                "Task" = "Steps taken to accomplish the goals"
                Your "Objectives" are to:
                1. Analyze the 'input': "${savedData.about}".         
                2. "Task": Based on the analyzed input, create a detailed profile of
                25 "ideal customers" based on market research, customer personas, and past customer data. 
                Identify key characteristics, define pain points, and needs that the product addresses.    
                3. "Task": Refine the above 'Ideal customer' list to include only ones that are likely to 
                purchase the product based on the above ${savedData.feature01}, ${savedData.feature02}, ${savedData.feature03}.
                4. "Task": Refine the above list of 'Ideal customer' to include ONLY ones that are likely 
                to purchase the product based on ${savedData.pain_point01}, ${savedData.pain_point02}, ${savedData.pain_point03}, ${savedData.pain_point04} and the ${savedData.client_type}.
                5. "Task": Refine the above list of 'Ideal customer' to include ONLY ones that are likely to 
                purchase the product based on its ${savedData.unique01}, ${savedData.unique02}, ${savedData.unique03}, ${savedData.unique04}.
                6. "Task": Based on 'REFINED LIST',  Write a code to generate email list of 'qualified contacts' for the 
                product - Generate leads using Apollo API by following these tasks:
                "Task":
                1. Identify the job titles, industries, and locations of your ideal customers based on the refined list above.
                2. Use Apollo.io's search filters to look for contacts that match your ideal customer profile. Filter by job title, company, location, industry, and other relevant criteria.
                3. Export the contact information of the qualified leads into a spreadsheet, and save it to a variable with the name 'productLaunchEmailList'`
                }).then((response) => {
                    console.log(JSON.stringify(response));
                });























                // const listUrl = 'https://api.together.xyz/v1/chat/completions';

                // const productLaunchList = await fetch(listUrl, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         Authorization: 'Bearer 208747a05763f1f4750eef08e65f1beac5dbad8e434629e3d7bf4858beb07184'
                //     },
                //     body: JSON.stringify(postData)
                // })

                // if (productLaunchList.ok) {
                //     try {
                //         const responseData = await productLaunchList.text();

                //         console.log(responseData);
                //     } catch (error) {
                //         console.error('Error parsing response body:', error);
                //     }
                // } else {
                //     console.error('Error fetching data:', productLaunchList.statusText);
                // }

                res.status(200).json({ message: 'Data received and processed successfully' });
            } else {
                // User not found
                res.status(404).json({ message: 'User not found' });
            }
        } else {
            // Handle other HTTP methods if needed
            res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
