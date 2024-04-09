import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { content } = req.body;

        // Check if the content is defined and not empty
        if (!content || typeof content !== 'string') {
            throw new Error('Content is not provided or is not a string.');
        }

        const articleQuery = { question: content };
        const articleQuestion = articleQuery.question;

        const run = async () => {
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

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
                temperature: 0.4,
                topK: 1,
                topP: 1,
            };

            if (articleQuestion) {
                const userPrompt = `${articleQuestion}`
                const parts = [
                    {
                        text: `Please use ${userPrompt} as the 'comment' or 'question' that the user is posting about the page article, and provide meaningful answers in a friendly and engaging manner. 
                        When responding to the user and providing answer, do the following:
                        1. Provide a concise and informative answer (no more than 50 words) for a given comment.
                        2. Provide answers with credible sources.                     
                        3. Do not repeat text. 
                        5. If the user asks a question, respond back with a thoughtful, researched answer.
                        6. An example of a 'question' is "How do I craft a compelling blog title?".
                        7. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can get an accurate response and get back to them if they sign up for free and provide an email.
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
                res.status(200).json({ message: finalResponse });
            } else {
                res.status(400).json({ message: "Please provide an article question and reference." });
            }
        };
        await run();
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}