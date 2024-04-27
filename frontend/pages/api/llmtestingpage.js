import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        async function runChat() {
            const generationConfig = {
                temperature: 0.6,
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
                text: `Generate an image of a playground`,
            }];

            try {
                const chat = model.startChat({
                    generationConfig,
                    safetySettings,
                    history: [],
                });

                const result = await chat.sendMessage(parts);
                const response = result.response
                const geminiResponse = response.text();

                console.log(geminiResponse);

            } catch (error) {
                // If JSON parsing fai, log the error and send a generic error response
                console.error('Error parsing JSON from AI response:', error);
                res.status(500).json({ message: 'Error processing AI response' });
            }
        }

        runChat();



    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}