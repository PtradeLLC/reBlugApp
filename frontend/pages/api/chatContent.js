import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const prisma = new PrismaClient();

export default function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const requestData = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const { category, message } = requestData;

        console.log("message from API:", message, category, requestData);

        if (message) {
            async function runChat() {
                const generationConfig = {
                    temperature: 0.8,
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

                const parts = [{
                    text: `Please use ${message} as the 'message' that the user is sending to you.
                    When responding to the user and providing response, do the following:
                    1. Be courteous and friendly. 
                    2. Be kind and friendly.
                    3. Be humorous if necessary.
                    4. Be helpful and provide useful information.
                    6. Address the user by their name or title. For example, "@Smith"
                    `,
                }];

                try {
                    const chat = model.startChat({
                        generationConfig,
                        safetySettings,
                        history: [],
                    });

                    const result = await chat.sendMessage(parts);
                    const response = result.response;
                    const geminiResponse = response.text();

                    console.log("geminiResponse", geminiResponse);

                    // const user = await prisma.user.findUnique({
                    //     where: {
                    //         email: requestData.email
                    //     },
                    //     select: {
                    //         id: true
                    //     }
                    // });

                    // if (user) {
                    //     const uniqueUserChat = await prisma.post.findUnique({
                    //         where: {
                    //             id: postId
                    //         },
                    //     });

                    //     console.log("uniqueUserChat", uniqueUserChat);

                    //     if (uniquePostBySlug && geminiResponse) {
                    //         const createdComment = await prisma.comment.create({
                    //             data: {
                    //                 title: postTitle,
                    //                 content: comment,
                    //                 aiResponse: geminiResponse,
                    //                 postSlug: postSlug,
                    //                 userEmail: email,
                    //                 userId: user.id
                    //             },
                    //             select: {
                    //                 id: true
                    //             }
                    //         });

                    //         if (createdComment) {
                    //             const allComments = await prisma.comment.findMany({
                    //                 where: {
                    //                     id: createdComment.id
                    //                 },
                    //                 select: {
                    //                     id: true,
                    //                     content: true,
                    //                     user: true,
                    //                     aiResponse: true,
                    //                 }
                    //             });
                    //             res.status(200).json(allComments);
                    //         }
                    //     }
                    // }

                    res.status(200).json({ message: geminiResponse });
                } catch (error) {
                    // If JSON parsing fai, log the error and send a generic error response
                    console.error('Error parsing JSON from AI response:', error);
                    res.status(500).json({ message: 'Error processing AI response' });
                }
            }
            runChat();

        } else {
            console.log("no message");
        }
        res.status(200).json({ name: 'John Doe' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error: ${error.message}` })
    }
}
