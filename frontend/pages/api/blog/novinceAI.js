import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Extract the content from the request body
        const { novice, ideasFormation } = req.body;
        let novinceBlogger = "Give me step by step instructions on how to write a blog article.";
        let ideaFormation = "What are some ideas on how to form an idea?";

        // Check if the content is defined and not empty
        if (!novice && !ideasFormation) {
            throw new Error('Content is not provided.');
        }
        if (novice) {
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
                        text: `Create an outline for a blog post.
                        Outline why the 'title' is important starting with 'Why Titles Matter', and how to construct 'title' for the blog post that is optimized for SEO including 'best practices'.
                        Generate a list of SEO optimized fancy titles as an example. 
                        Briefly explain what 'SEO' is, and why it is important for the blog post.
                        
                        Do not include the this instructions in your response.
                        Keep your response ONLY to the context of 'how to construct blog post title'.
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
                const nonStarredParts = text.split(/\*\*+/).filter(part => !part.includes('*')).join('');
                res.status(200).json({ message: 'Content extracted and saved successfully.', nonStarredParts });
            }
            await run();
        } else if (ideasFormation) {
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
