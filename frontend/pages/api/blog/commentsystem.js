import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Replicate from "replicate";
import fetch from 'node-fetch';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { comment, content, email, postTitle, postId } = req.body;

        const postSlug = postTitle.toLowerCase().split(' ').join('-');

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

        if (email && postId) {
            const userPrompt = `${comment}`;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    firstName: true,
                }
            });

            const parts = [{
                text: `Please use ${userPrompt} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
                    user and providing answer, do the following
                    1. Provide a concise and informative answer (no more than 50 words) for a given comment.
                    2. Provide answers with credible sources.
                    3. Refer to the user by '@${user.firstName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
                    4. Do not repeat text. 
                    5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
                    and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
                    5a. Send an email to the author by executing the ${contactAuthor} function.
                    6. An example of a 'question' is "How do I craft a compelling blog article?".
                    6a. An example of a 'comment' is "This article is insightful".
                    7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
                    8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
                    'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
                    9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
                    get an accurate response from the article author.
                    10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
                    11. Use ${content} as context to provide your answers, but keep it brief.
                    `,
            }];

            let geminiResponse;

            try {
                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });

                if (result) {
                    const response = result.response;
                    const text = response.text();
                    // Extract the non-starred parts of the response
                    const nonStarredParts = text.split(/\*\*+/).filter(part => !part.trim().startsWith("Answer:"));
                    geminiResponse = nonStarredParts.join('\n');

                    console.log("AI rES", geminiResponse);
                }
            } catch (error) {
                console.error('Error extracting and saving content:', error);
                // Call replicate function here or handle the error as needed
                const geminiErrorResponse = await handleGeminiError(email, postId, user);
                if (geminiErrorResponse) {
                    // If Gemini error is handled successfully
                    console.log("From Replicate", geminiErrorResponse);
                    // res.status(201).json(geminiResponse);
                } else {
                    // If there's an issue handling Gemini error
                    res.status(500).json({ message: 'Error handling Gemini error.' });
                }
            }

            if (user) {
                const uniquePostBySlug = await prisma.post.findUnique({
                    where: {
                        slug: postSlug
                    }
                })

                if (uniquePostBySlug) {
                    const createdComment = await prisma.comments.create({
                        where: {
                            postSlug: uniquePostBySlug.slug
                        },
                        data: {
                            title: postTitle,
                            content: comment,
                            aiResponse: geminiResponse,
                            postSlug: postSlug,
                            userEmail: email
                        },
                        select: {
                            id: true
                        }
                    });

                    if (createdComment) {
                        const allComments = await prisma.comments.findMany({
                            where: {
                                id: createdComment.id
                            },
                            select: {
                                id: true,
                                content: true,
                                user: true,
                                aiResponse: true,
                            }
                        });
                        res.status(200).json(allComments);
                    }

                }



            }
        } else {
            console.log('Invalid data provided');
            res.status(400).json({ message: 'Invalid data provided.' });
        }
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }


    async function handleGeminiError(email, postId, user) {
        try {
            if (email && postId) {
                const userText = `Please use ${comment} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
                user and providing answer, do the following
                1. Provide a concise and informative answer (no more than 50 words) for a given comment.
                2. Provide answers with credible sources.
                3. Refer to the user by '@${user.firstName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
                4. Do not repeat text. 
                5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
                and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
                5a. Send an email to the author by executing the ${contactAuthor} function.
                6. An example of a 'question' is "How do I craft a compelling blog article?".
                6a. An example of a 'comment' is "This article is insightful".
                7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
                8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
                'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
                9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
                get an accurate response from the article author.
                10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
                11. Use ${content} as context to provide your answers, but keep it brief.
                `;

                // Handle Gemini error
                const response = await fetch("https://api.replicate.com/v1/predictions", {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // Pinned to a specific version of Stable Diffusion
                        // See https://replicate.com/stability-ai/stable-diffussion/versions
                        version: "2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48",

                        // This is the text prompt that will be submitted by a form on the frontend
                        input: {
                            debug: false,
                            top_p: 1,
                            prompt: userText,
                            temperature: 0.5,
                            system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
                            max_new_tokens: 500,
                            min_new_tokens: -1
                        },
                    }),
                });

                if (response.status !== 201) {
                    let error = await response.json();
                    console.error('Gemini error:', error);
                    return null; // Return null if there's an error
                }

                const prediction = await response.json();
                return prediction;
            }
        } catch (error) {
            console.error('Error extracting and saving model #2', error);
            return null; // Return null if there's an error
        }
    }

}








// import { PrismaClient } from '@prisma/client';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import Replicate from "replicate";
// import fetch from 'node-fetch'; // Import fetch for making HTTP requests

// const prisma = new PrismaClient();

// async function handleGeminiError(email, postId, user) {
//     try {
//         if (email && postId) {
//             const userText = `Please use ${comment} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
//                 user and providing answer, do the following
//                 1. Provide a concise and informative answer (no more than 50 words) for a given comment.
//                 2. Provide answers with credible sources.
//                 3. Refer to the user by '@${user.firstName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
//                 4. Do not repeat text. 
//                 5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
//                 and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
//                 5a. Send an email to the author by executing the ${contactAuthor} function.
//                 6. An example of a 'question' is "How do I craft a compelling blog article?".
//                 6a. An example of a 'comment' is "This article is insightful".
//                 7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
//                 8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
//                 'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
//                 9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
//                 get an accurate response from the article author.
//                 10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
//                 11. Use ${content} as context to provide your answers, but keep it brief.
//                 `;

//             // Handle Gemini error
//             const response = await fetch("https://api.replicate.com/v1/predictions", {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     // Pinned to a specific version of Stable Diffusion
//                     // See https://replicate.com/stability-ai/stable-diffussion/versions
//                     version: "2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48",

//                     // This is the text prompt that will be submitted by a form on the frontend
//                     input: {
//                         debug: false,
//                         top_p: 1,
//                         prompt: userText,
//                         temperature: 0.5,
//                         system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
//                         max_new_tokens: 500,
//                         min_new_tokens: -1
//                     },
//                 }),
//             });

//             if (response.status !== 201) {
//                 let error = await response.json();
//                 console.error('Gemini error:', error);
//                 return null; // Return null if there's an error
//             }

//             const prediction = await response.json();
//             return prediction;
//         }
//     } catch (error) {
//         console.error('Error extracting and saving model #2', error);
//         return null; // Return null if there's an error
//     }
// }

// // async function handleGeminiError(email, postId, user) {
// //     throw new Error("Intentional error from Gemini code"); // Throw an intentional error
// // }

// export default async function handler(req, res) {
//     try {
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         const { comment, content, email, postTitle, postId } = req.body;

//         const postSlug = postTitle.toLowerCase().split(' ').join('-');

//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const contactAuthor = () => {
//             console.log("Author is contacted with:", email);
//         };

//         const safetySettings = [
//             { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//             { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//             { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//             { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//         ];

//         const generationConfig = {
//             temperature: 0.3,
//             topK: 1,
//             topP: 1,
//         };

//         if (email && postId) {
//             const userPrompt = `${comment}`;

//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: email
//                 },
//                 select: {
//                     firstName: true,
//                 }
//             });

//             const parts = [{
//                 text: `Please use ${userPrompt} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
//                     user and providing answer, do the following
//                     1. Provide a concise and informative answer (no more than 50 words) for a given comment.
//                     2. Provide answers with credible sources.
//                     3. Refer to the user by '@${user.firstName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
//                     4. Do not repeat text. 
//                     5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
//                     and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
//                     5a. Send an email to the author by executing the ${contactAuthor} function.
//                     6. An example of a 'question' is "How do I craft a compelling blog article?".
//                     6a. An example of a 'comment' is "This article is insightful".
//                     7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
//                     8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
//                     'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
//                     9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
//                     get an accurate response from the article author.
//                     10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
//                     11. Use ${content} as context to provide your answers, but keep it brief.
//                     `,
//             }];

//             const result = await model.generateContent({
//                 contents: [{ role: "user", parts }],
//                 generationConfig,
//                 safetySettings,
//             });

//             if (result) {
//                 const response = result.response;
//                 const text = response.text();
//                 // Extract the non-starred parts of the response
//                 const nonStarredParts = text.split(/\*\*+/).filter(part => !part.trim().startsWith("Answer:"));
//                 const aiResponseText = nonStarredParts.join('\n');

//                 if (user) {
//                     const createdComment = await prisma.comments.create({
//                         data: {
//                             title: postTitle,
//                             content: comment,
//                             aiResponse: text,
//                             postSlug: postSlug,
//                         },
//                         select: {
//                             id: true
//                         }
//                     });

//                     if (createdComment) {
//                         const allComments = await prisma.comments.findMany({
//                             where: {
//                                 id: createdComment.id
//                             },
//                             select: {
//                                 content: true,
//                                 aiResponse: true,
//                             }
//                         });
//                         console.log("From Gemini", allComments);
//                         // res.status(200).json(allComments);
//                     }
//                 }
//             } else {
//                 console.error('Gemini error:', result);
//                 const geminiResponse = await handleGeminiError(email, postId, user);
//                 if (geminiResponse) {
//                     // If Gemini error is handled successfully
//                     console.log("From Replicate", geminiResponse);
//                     // res.status(201).json(geminiResponse);
//                 } else {
//                     // If there's an issue handling Gemini error
//                     res.status(500).json({ message: 'Error handling Gemini error.' });
//                 }
//             }
//         } else {
//             console.log('Invalid data provided');
//             res.status(400).json({ message: 'Invalid data provided.' });
//         }
//     } catch (error) {
//         console.error('Error extracting and saving content:', error);
//         res.status(500).json({ message: 'Error extracting and saving content.' });
//     }
// }







// import { PrismaClient } from '@prisma/client';
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import Replicate from "replicate";
// import { contents } from 'cheerio/lib/api/traversing';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     try {
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         // Extract the content from the request body
//         const { comment, content, email, postTitle, postId } = req.body;


//         const postSlug = postTitle.toLowerCase().split(' ').join('-');

//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//         const contactAuthor = () => {
//             console.log("Author is contacted with:", email);
//         };

//         const safetySettings = [
//             { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//             { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//             { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//             { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
//         ];

//         const generationConfig = {
//             temperature: 0.3,
//             topK: 1,
//             topP: 1,
//         };

//         if (email && postId) {
//             const userPrompt = `${comment}`;

//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: email
//                 },
//                 select: {
//                     firstName: true,
//                 }
//             });

//             const parts = [{
//                 text: `Please use ${userPrompt} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
//                     user and providing answer, do the following
//                     1. Provide a concise and informative answer (no more than 50 words) for a given comment.
//                     2. Provide answers with credible sources.
//                     3. Refer to the user by '@${user.firstName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
//                     4. Do not repeat text. 
//                     5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
//                     and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
//                     5a. Send an email to the author by executing the ${contactAuthor} function.
//                     6. An example of a 'question' is "How do I craft a compelling blog article?".
//                     6a. An example of a 'comment' is "This article is insightful".
//                     7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
//                     8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
//                     'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
//                     9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
//                     get an accurate response from the article author.
//                     10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
//                     11. Use ${content} as context to provide your answers, but keep it brief.
//                     `,
//             }];

//             const result = await model.generateContent({
//                 contents: [{ role: "user", parts }],
//                 generationConfig,
//                 safetySettings,
//             });

//             if (result) {
//                 const response = result.response;
//                 const text = response.text();
//                 // Extract the non-starred parts of the response
//                 const nonStarredParts = text.split(/\*\*+/).filter(part => !part.trim().startsWith("Answer:"));
//                 const aiResponseText = nonStarredParts.join('\n');

//                 console.log("AI rES", aiResponseText);
//                 if (user) {
//                     const createdComment = await prisma.comments.create({
//                         data: {
//                             title: postTitle,
//                             content: comment,
//                             aiResponse: text,
//                         },
//                         select: {
//                             id: true
//                         }
//                     });

//                     if (createdComment) {
//                         const allComments = await prisma.comments.findMany({
//                             where: {
//                                 id: createdComment.id
//                             },
//                             select: {
//                                 content: true,
//                                 aiResponse: true,
//                             }
//                         });
//                         res.status(200).json(allComments);
//                     }
//                 }
//             }
//         } else {
//             console.log('Invalid data provided');
//             res.status(400).json({ message: 'Invalid data provided.' });
//         }
//     } catch (error) {
//         console.error('Error extracting and saving content:', error);
//         if (error) {
//             const { comment, content, email, postTitle, postId } = req.body;
//             try {
//                 const contactAuthor = () => {
//                     console.log("Author is contacted with:", email);
//                 };

//                 if (email && postId) {
//                     const user = await prisma.user.findUnique({
//                         where: {
//                             email: email
//                         },
//                         select: {
//                             firstName: true,
//                         }
//                     });

//                     if (user) {
//                         const userText = `Please use ${comment} as the 'comment' or 'question' that the user is posting about the page article, and when responding to the 
//                 user and providing answer, do the following
//                 1. Provide a concise and informative answer (no more than 50 words) for a given comment.
//                 2. Provide answers with credible sources.
//                 3. Refer to the user by '@${user.firstName}'. For example, If User's name is 'Jon', then refer to the user as '@Jon'.
//                 4. Do not repeat text. 
//                 5. If you are uncertain or concerned about your response to a 'comment' or 'question', say that 'you will let the author know about the question or comment, 
//                 and can circle back to the user with accurate information. Ask if the user wants to reach out the author' If user says 'yes' or 'agrees', perform the following actions:
//                 5a. Send an email to the author by executing the ${contactAuthor} function.
//                 6. An example of a 'question' is "How do I craft a compelling blog article?".
//                 6a. An example of a 'comment' is "This article is insightful".
//                 7. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
//                 8. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
//                 'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
//                 9. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can 
//                 get an accurate response from the article author.
//                 10. If user posts comment referencing the page article, please refer to the button on the page labelled 'Chat with this Article'.
//                 11. Use ${content} as context to provide your answers, but keep it brief.
//                 `
//                         console.log(`${content}`);
//                         //IF Gemini error
//                         const response = await fetch("https://api.replicate.com/v1/predictions", {
//                             method: "POST",
//                             headers: {
//                                 Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                                 // Pinned to a specific version of Stable Diffusion
//                                 // See https://replicate.com/stability-ai/stable-diffussion/versions
//                                 version:
//                                     "2d19859030ff705a87c746f7e96eea03aefb71f166725aee39692f1476566d48",

//                                 // This is the text prompt that will be submitted by a form on the frontend
//                                 input: {
//                                     debug: false,
//                                     top_p: 1,
//                                     prompt: userText,
//                                     temperature: 0.5,
//                                     system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
//                                     max_new_tokens: 500,
//                                     min_new_tokens: -1
//                                 },
//                             }),
//                         });

//                         if (response.status !== 201) {
//                             let error = await response.json();
//                             res.statusCode = 500;
//                             res.end(JSON.stringify({ detail: error.detail }));
//                             return;
//                         }

//                         const prediction = await response.json();
//                         res.statusCode = 201;
//                         res.end(JSON.stringify(prediction));
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error exctracting and saving model #2', error);
//             }
//         }
//         res.status(500).json({ message: 'Error extracting and saving content.' });
//     }
// }