import { useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini Pro vision

// Assuming you are using some method to handle file uploads in your React component
// eg prompt: Given an image of a product and its target audience, write an engaging marketing description temp: 0.9
// (e.g., a file input or fetching files from a server)
import { getFileData } from 'path-to-your-file-upload-helper';

const YourComponent = () => {
    useEffect(() => {
        // Access your API key as an environment variable
        const apiKey = process.env.API_KEY;

        // Create GoogleGenerativeAI instance
        const genAI = new GoogleGenerativeAI(apiKey);

        // Converts local file information to a GoogleGenerativeAI.Part object.
        const fileToGenerativePart = (path, mimeType) => {
            const fileData = getFileData(path); // Implement this based on your file upload mechanism
            return {
                inlineData: {
                    data: fileData.toString("base64"),
                    mimeType,
                },
            };
        };

        const run = async () => {
            // For text-and-image input (multimodal), use the gemini-pro-vision model
            const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

            const prompt = "What's different between these pictures?";

            // Assuming you have a mechanism to get file data for image1.png and image2.jpeg
            const image1Parts = fileToGenerativePart("image1.png", "image/png");
            const image2Parts = fileToGenerativePart("image2.jpeg", "image/jpeg");

            const result = await model.generateContent([prompt, image1Parts, image2Parts]);
            const response = await result.response;
            const text = response.text();
            console.log(text);
        };

        // Call the run function
        run();
    }, []);

    return (
        // JSX content if needed
        <div>
            <p>Your JSX content here</p>
        </div>
    );
};

export default YourComponent;
