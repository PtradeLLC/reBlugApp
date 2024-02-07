import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import fs from 'fs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { content } = req.body;

        // Check if the content is defined and not empty
        if (!content) {
            throw new Error('Content is not provided or empty.');
        }

        // Use cheerio to load the HTML content
        const $ = cheerio.load(content.content);

        // Extract the text content without HTML tags
        const textContent = $.text();

        const run = async () => {
            // For text-and-image input (multimodal), use the gemini-pro-vision model
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });



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

            const generationConfig = {
                temperature: 0.3,
                topK: 1,
                topP: 1,
            };


            if (textContent) {
                const user = `What are Proven Strategies for Email Marketing?`

                const parts = [
                    {
                        text: `The ${user} asks a question, Please use ${textContent} as the reference to this article's content. 
                    Use the context of the article to provide meaningful answers in a friendly and engaging manner.
                    When addressing the content and providing answer, refer to the author of the article as 'the Author'.
                    ` },
                ];

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });
                const response = result.response;
                const text = response.text();
                console.log(response.text());
            }

        };

        // Call the run function
        run();

        // Save the content to the database using Prisma
        // Adjust this part based on your data model and how you want to save content
        // For example:
        // await prisma.post.create({
        //     data: {
        //         title: content.title,
        //         body: content.body,
        //     },
        // });

        res.status(200).json({ message: 'Content extracted and saved successfully.' });
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}