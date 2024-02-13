import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import { getSinglePost, getPosts } from '../../lib/posts';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { user, articleContent, email } = req.body;

        console.log("Comment:", user);
        console.log("Comment:", articleContent);
        console.log("Comment:", email);

        // Check if the content is defined and not empty
        // if (!content || !postContent) {
        //     throw new Error('Content is not provided or is not a string.');
        // }

        // Use cheerio to load the HTML content
        // const $ = cheerio.load(postContent.content);

        // Extract the text content without HTML tags
        // const textContent = $('p').text();

        // const articleQuery = { reference: textContent };
        // const articleRef = articleQuery.reference;
        // const articleComment = articleQuery.comment;


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


            // if (articleComment) {
            //     const user = `${articleComment}`;

            //     const parts = [
            //         {
            //             text: `Please use ${user} as the 'comment' that the user is posting about this article, and use ${articleRef} as a reference 
            //             to where you get your answers from about this article's content. Use the context of ${articleRef} to provide meaningful 
            //             response in a friendly and engaging manner. When addressing the content and providing answer, refer to the author of the 
            //             article as 'the Author'.

            //             Only use the context of this article to provide your response. 
            //             If user Anything post a comment outside the scope of ${articleRef}, please inform them that the comment is outside the scope 
            //             of the article. However, diligently research the web for meaningful answers or responses with notable sources.
            //         ` },
            //     ];

            //     const result = await model.generateContent({
            //         contents: [{ role: "user", parts }],
            //         generationConfig,
            //         safetySettings,
            //     });
            //     const response = result.response;
            //     const text = response.text();
            //     // Extract the non-starred parts of the response
            //     const nonStarredParts = text.split(/\*\*+/).filter(part => !part.trim().startsWith("Answer:"));

            //     // Join the non-starred parts to form the final response
            //     const finalResponse = nonStarredParts.join('');
            //     console.log("FINAL RES", finalResponse);

            //     res.status(200).json({ message: 'Content extracted and saved successfully.' });
            // }
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
