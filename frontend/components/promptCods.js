// node --version # Should be >= 18
// npm install @google/generative-ai

//PROMPTS SAMPLES:
// pages/index.js

import { useEffect } from 'react';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import fs from 'fs';

const YourComponent = () => {
    useEffect(async () => {
        // Ensure you have Node.js version >= 18 for this to work
        // npm install @google/generative-ai

        const MODEL_NAME = "gemini-1.0-pro-vision";
        const API_KEY = "YOUR_API_KEY";

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
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

        if (!fs.existsSync("image0.jpeg")) {
            throw new Error("Could not find images in the current directory.");
        }

        const parts = [
            { text: "Given an image of a product and its target audience, write an engaging marketing description" },
            { text: "Product Image: " },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: Buffer.from(fs.readFileSync("image0.jpeg")).toString("base64"),
                },
            },
            { text: "Target Audience: Mid-aged men" },
            { text: "Marketing Description: Introducing the epitome of power and sophistication - the sleek and captivating sports car. It's more than just a car; it's a symbol of your passion for life and your unwavering commitment to excellence. Embrace the thrill and indulge in the ultimate driving pleasure." },
            { text: "Product Image: " },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: Buffer.from(fs.readFileSync("image1.jpeg")).toString("base64"),
                },
            },
            { text: "Target Audience: Environmentalists" },
            { text: "Marketing Description: Looking for a sustainable and eco-friendly way to get around? Look no further than this black bicycle. Biking is a great way to reduce your carbon footprint and improve your health at the same time. If you're an environmentalist, there's no better way to get around than by bike!" },
            { text: "Product Image: " },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: Buffer.from(fs.readFileSync("image2.jpeg")).toString("base64"),
                },
            },
            { text: "Target Audience: Athletes" },
            { text: "Marketing Description: " },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        // console.log(response.text());
    }, []);

    return (
        // JSX content if needed
        <div>
            <p>Your JSX content here</p>
        </div>
    );
};

export default YourComponent;
