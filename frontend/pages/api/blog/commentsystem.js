import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        // Fetch comments from cache if available, otherwise fetch from the database

        // const fetchComments = async () => {
        //     try {
        //         const cache = await caches.open('comments-cache');
        //         const cachedResponse = await cache.match('/api/blog/commentsystem');

        //         if (cachedResponse) {
        //             const data = await cachedResponse.json();
        //             console.log('Comments fetched from cache:', data);
        //             return data;
        //         } else {
        //             const response = await fetch('/api/blog/commentsystem');

        //             if (!response.ok) {
        //                 throw new Error('Failed to fetch comments');
        //             }

        //             const data = await response.json();
        //             await cache.put('/api/blog/commentsystem', response.clone());
        //             console.log('Comments fetched from API:', data);
        //             return data;
        //         }
        //     } catch (error) {
        //         console.error('Error fetching comments:', error.message);
        //         throw new Error('Failed to fetch comments');
        //     }
        // };

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { title,
            featureImage,
            content,
            crossPromote,
            selectedValue,
            selectedFeatures,
            userInfo } = req.body;

        const post = {
            title,
            featureImage,
            content,
            crossPromote,
            selectedValue,
            selectedFeatures
        }

        const email = userInfo.email;

        console.log(email);
        const postSlug = title.toLowerCase().split(' ').join('-');

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const contactAuthor = () => {
            console.log("Author is contacted with:", email);
        };

        const safetySettings = [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ];

        const generationConfig = {
            temperature: 0.3,
            topK: 1,
            topP: 1,
        };

        if (email && post) {
            const userPrompt = `${content}`;

            const parts = [{
                text: `Please use ${userPrompt} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
                    user and providing answer, do the following
                    1. Provide a concise and informative answer (no more than 50 words) for a given comment.
                    2. Provide answers with credible sources.
                    3. Refer to the user by '@${userInfo}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
                    4. Do not repeat text. 
                    5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
                    and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
                    5a. Send an email to the author by executing the ${contactAuthor} function.
                    6. An example of a 'question' is "How do I craft a compelling blog article?".
                    6a. An example of a 'comment' is "This article is insightful".
                    7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
                    8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
                    'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
                    9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can get an accurate response from the article author.`,
            }];

            const result = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
                safetySettings,
            });

            const response = result.response;
            const text = response.text();
            // Extract the non-starred parts of the response
            const nonStarredParts = text.split(/\*\*+/).filter(part => !part.trim().startsWith("Answer:"));

            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (user) {
                const newPost = await prisma.post.create({
                    data: {
                        title: title,
                        featureImage: featureImage,
                        content: content,
                        crossPromote: crossPromote,
                        Category: selectedValue,
                        selectedFeatures: selectedFeatures,
                        postSlug: postSlug,
                        email: email,
                    },
                });

                // Fetch all posts after creating the new post
                const allPosts = await prisma.post.findMany();

                res.status(200).json({ allPosts, newPost });
            }
        } else {
            console.log('Invalid data provided');
            res.status(400).json({ message: 'Invalid data provided.' });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}