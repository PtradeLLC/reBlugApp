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
            const contactAuthor = () => {
                console.log("Author is contacted");
            }

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


            if (articleContent) {
                const userPrompt = `${articleContent}`;

                const parts = [
                    {
                        text: `Please use ${userPrompt} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
                        user and providing answer, do the following
                        1. Provide a concise and informative answer (no more than 50 words) for a given comment.
                        2. Provide answers with credible sources.
                        3. Refer to the user by '@${user}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
                        4. Do not repeat text. 
                        5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
                        and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
                        5a. Send an email to the author by executing the ${contactAuthor} function.
                        6. An example of a 'question' is "How do I craft a compelling blog article?".
                        6a. An example of a 'comment' is "This article is insightful".
                        7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
                        8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
                        'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
                        9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can get an accurate response from the article author.
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

                res.status(200).json({ message: 'Content extracted and saved successfully.', articleContent, finalResponse });
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
