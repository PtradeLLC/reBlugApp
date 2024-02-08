import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { content, postContent } = req.body;

        // Check if the content is defined and not empty
        if (!content || typeof content !== 'string' || !postContent) {
            throw new Error('Content is not provided or is not a string.');
        }

        // // Use cheerio to load the HTML content
        const $ = cheerio.load(postContent.content);

        // // Extract the text content without HTML tags
        const textContent = $('p').text();

        const articleQuery = { question: content, reference: textContent };
        const articleQuestion = articleQuery.question;
        const articleRef = articleQuery.reference;


        const run = async () => {

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


            if (articleQuestion && articleRef) {
                const user = `${articleQuestion}`

                const parts = [
                    {
                        text: `Please use ${user} as the question that the user wants to ask about this article, and use ${articleRef} as a reference to where you get your answers from about this article's content. 
                    Use the context of ${articleRef} to provide meaningful answers in a friendly and engaging manner.
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
                // Extract the non-starred parts of the response
                const nonStarredParts = text.split(/\*\*+/).filter(part => !part.trim().startsWith("Answer:"));

                // Join the non-starred parts to form the final response
                const finalResponse = nonStarredParts.join('');
                console.log(finalResponse);

                res.status(200).json({ message: 'Content extracted and saved successfully.', finalResponse });
            }
        };

        await run();

        // Save the content to the database using Prisma
        // Adjust this part based on your data model and how you want to save content
        // For example:
        // await prisma.post.create({
        //     data: {
        //         title: content.title,
        //         body: content.body,
        //     },
        // });


    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}