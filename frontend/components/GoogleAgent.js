import { useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

//Building multi-turn convo chat

const YourComponent = () => {
    useEffect(() => {
        // Access your API key as an environment variable
        const apiKey = process.env.API_KEY;

        // For text-only input, use the gemini-pro model
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: "Hello, I have 2 dogs in my house.",
                },
                {
                    role: "model",
                    parts: "Great to meet you. What would you like to know?",
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const msg = "How many paws are in my house?";

        const sendMessage = async () => {
            const result = await chat.sendMessage(msg);
            const response = await result.response;
            const text = response.text();
            console.log(text);
        };

        // Call the function to send a message
        sendMessage();
    }, []);

    return (
        // JSX content if needed
        <div>
            <p>Your JSX content here</p>
        </div>
    );
};

export default YourComponent;
