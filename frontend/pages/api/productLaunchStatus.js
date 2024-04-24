import prisma from "../../lib/db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "./auth/[...nextauth]";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";


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

                // LLM API CALL

                const MODEL_NAME = "gemini-1.5-pro-latest";

                async function runChat() {
                    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

                    const generationConfig = {
                        temperature: 0.9,
                        topK: 0,
                        topP: 0.95,
                        maxOutputTokens: 8192,
                    };

                    const safetySettings = [
                        {
                            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                        },
                        {
                            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                        },
                        {
                            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                        },
                        {
                            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                        },
                    ];

                    const chat = model.startChat({
                        generationConfig,
                        safetySettings,
                        history: [
                        ],
                    });

                    const prompt = [
                        `Your task is to analyze  '${savedData.about}', and write a short summary in a paragraph about it. Provide an informative description about how 'email marketing' can help its promotional efforts.
                        
                        Based on your "${savedData.about}" analysis above, do the following:
                        * Write a short summary 'About Product' in a paragraph about '${savedData.about}' to show how much you know about the product .
                        * Create a bulleted LIST of 'Ideal Customers' for the product as well as 'decision makers'. Highlight the individuals 'based on job titles' that are most likely to approve this product for purchase.
                        * Leverage web data as a research tool to identify 'pain points' that the product solves for 'Ideal Customers' and compare it in contrast with '${savedData.pain_point01}', ' ${savedData.pain_point02}', '${savedData.pain_point03}', '${savedData.pain_point04}'.
                        * Identify and provide a list of key characteristics of the 'Ideal Customers', and suggest how to engage and interest them in the product.
                         Suggest ways to market and promote the product to 'Ideal Customers'.
                         Base your strategies and suggestions for either 'B2B', B2C' or 'Both' - Identify which 'Customer Type' - 'B2B', B2C' or 'both' is most likely to purchase the product.
                         Create a LIST of 'decision makers', individuals based on 'job titles' that are most likely to approve this product for purchase"
                         When you provide your final answer, please 'EXPLAIN' the 'reasoning and assumptions' behind your suggested 'Ideal Customers', and why they are ideal for the product.
                        
                        Return your response in JSON format.
                        `,
                    ];

                    const result = await chat.sendMessage(prompt);
                    const response = result.response;
                    const text = response.text();

                    console.log("TEXT FROM PRODUCT API:", { text });
                    // Return the response as JSON
                    res.status(200).json({ text });
                }

                runChat();

                try {
                    // Send the parsed JSON data as the response
                    // Return the response as JSON
                    console.log("Lets see what happens next");

                    // res.status(200).json(text);
                } catch (error) {
                    // If JSON parsing fails, log the error and send a generic error response
                    console.error('Error parsing JSON from AI response:', error);
                    res.status(500).json({ message: 'Error processing AI response' });
                }
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

