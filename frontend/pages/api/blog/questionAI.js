import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { group, submission } = req.body;
        let groupSocial = "How can I join author's group";
        let submissionQuestion = "How can I submit my product to be included in future article"

        // Check if the content is defined and not empty
        if (!group && !submission) {
            throw new Error('Content is not provided.');
        }
        if (group) {
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

                const parts = [
                    {
                        text: `Respond with: 
                    "To join the author's group is free, and comes with various exclusive benefits. You can join author's group by:
                     Signing up on ForgedMart, and visiting the author's profile page.
                     Click on Join Group on the profile page to send a request to the author.
                
                    Once you have joined the author's group, you will be able to enjoy the following benefits:

                     Access to exclusive content, such as behind-the-scenes information about the author's writing process, sneak 
                    peeks at upcoming projects, exclusive contents e.t.c.
                     Opportunities to interact with the author directly, such as through Q&A sessions, live chats.
                     Deep discounts on sponsored products and services.

                    Joining the author's group is a great way to connect with other fans of the author's work, learn more about 
                    the author's writing process, and get exclusive access to content and benefits.

                    Keep your response ONLY to the above sentences.
                    ".
                    ` },
                ];

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });
                const response = result.response;
                const text = response.text();

                res.status(200).json({ message: 'Content extracted and saved successfully.', text });
            }
            await run();
        } else if (submission) {
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

                const parts = [
                    {
                        text: `Respond with: 
                    "Let the author include your product or services in the next published article to loyal 
                    fans, and gain access to a dedicated audience of engaged readers who trust the author's 
                    recommendations. This exclusive opportunity allows you to showcase your brand in a positive 
                    light, drive traffic to your website, and generate leads from a highly targeted audience. 
                    Partner with this author today and elevate your brand's visibility among loyal and influential readers."

                     "Click on 'Submit product for future article' on the page and complete the form to get started."

                    Keep your response ONLY to the above sentences.
                    ` },
                ];

                const result = await model.generateContent({
                    contents: [{ role: "user", parts }],
                    generationConfig,
                    safetySettings,
                });
                const response = result.response;
                const text = response.text();

                res.status(200).json({ message: 'Content extracted and saved successfully.', text });
            }
            await run();
        };
    } catch (error) {
        console.error('Error extracting and saving content:', error);
        res.status(500).json({ message: 'Error extracting and saving content.' });
    }
}
