import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

const MAX_RETRIES = 3;

async function processContent({ firstMessage }) {
    try {
        const processedResults = await processSingleMessage(firstMessage, 'User Input');
        return [processedResults].filter(result => result !== null);
    } catch (error) {
        console.error('Error in processContent:', error);
        throw error;
    }
}

async function processSingleMessage(message, source) {
    const groq = new Groq({ apiKey: GROQ_API_KEY });

    const messageContent = typeof message === 'string' ? message : JSON.stringify(message);

    const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

    const donorProfileString = `
        Task: 
        Develop Ideal Donor Profile based on data input ${JSON.stringify(message)} submitted by the user.

        Objective:
        Your objective and goal is to ${source === 'User Input' ? "derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause" : "respond to the user's inquiry and provide a concise and informative detailed analysis based on the content submitted by the user"}.

        Data:
        data: Use ${JSON.stringify(message)} as the initial data about the Cause and its target audience.

        Process:
        Data Understanding:
        Analyze data points in ${JSON.stringify(message)} to comprehend campaign goals, objectives, and available data points.
        Identify relevant data points within ${JSON.stringify(message)} to construct the 'Ideal Donor Profile'.

        Baseline Profile Creation:
        Structure a baseline profile using ${idealDonorProfile} as the formula to form a conceptual 
        framework and data analysis from ${JSON.stringify(message)} to produce your response. 

        By Implementing the steps below, you can derive an 'Ideal Donor Profile' for the campaign:
        1. Data Collection
        2. Profile Creation
        3. Targeted Outreach

        ${source === 'User Input' ? `
        <Instruction>
        Use this instructions for context when responding to the all user inquiries and providing answer, and when responding to the user and providing answer, do the following:

        1. Provide a concise and informative detailed analysis.
        2. Provide responses with credible sources.
        3. Use the following format for your response:

        Ideal Donor Profile for {Campaign Name}
        
        Objective and Goal:
        {Provide Objective and Goal}

        Data:
        Data Understanding:
        {Provide short summary of the campaign}

        **Baseline Profile Creation:**
        * **Campaign Details:**
        + Name: {Provide Name}
        + About: {Provide About}
        + Goals: {Provide Goals}
        + Objectives: {Provide Objectives}

        * **Target Demographics:**
        + Gender: {Provide Gender}
        + Age: {Provide Age}
        + Wealth: {Provide Wealth}

        * **Location:**
        + City: {Provide City}
        + State: {Provide State}
        + Country: {Provide Country}

        **Ideal Donor Profile Development:**

        Using the provided data and a conceptual formula, we will derive an 'Ideal Donor Profile' for {Campaign Name}:

        **Campaign Characteristics (C)**
        **Donor Demographics (D)**
        **Donor Behavior (B)**
        **Donor Personas (P)**

        **Ideal Donor Profile**

        Based on the analysis, the ideal donor profile for the campaign is:

        * **Name:** {Provide Name}
        * **Gender:** {Provide Gender}
        * **Age:** {Provide Age}
        * **Wealth:** {Provide Wealth}
        * **Location:** {Provide Location}
        * **Interests:** {Provide Interests}
        * **Values:** {Provide Values}
        * **Wealth indicators:**  {Provide Wealth Indicators}
        * **Donation behavior:** {Provide Donation Behavior}
        * **Communication preferences:** {Provide Communication Preferences}
        * **Professional background:** {Provide Professional Background}
        * **Philanthropic interests:** {Provide Philanthropic Interests}
        * **Political affiliation:** {Provide Political Affiliation}

        **Targeted Outreach Strategy**
        {Provide Targeted Outreach Strategy}

        **Actionable Recommendations:**
        {Provide actionable recommendations}
        </Instruction>
        ` : `
        <Instruction>
        Use the content of .... to provide answer 
        
        for context when responding to the all user inquiries and providing answer, and when responding to the user and providing answer, do the following:
    
        1. Provide a concise and informative detailed analysis based on ....
        2. Provide responses with credible sources.
        </Instruction>
        `}
    `;

    let assistantResponse = "";
    let attempts = 0;

    while (assistantResponse.trim() === "" && attempts < MAX_RETRIES) {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "user", content: donorProfileString }],
                model: "llama-3.2-90b-text-preview",
                temperature: 0.5,
                max_tokens: 8000,
                top_p: 1,
                stream: true,
            });

            for await (const chunk of chatCompletion) {
                assistantResponse += chunk.choices[0]?.delta?.content || '';
            }

            if (assistantResponse.trim() === "") {
                console.log(`Attempt ${attempts + 1} produced an empty response. Retrying...`);
                attempts++;
            }
        } catch (error) {
            console.error(`Error in Groq API call (attempt ${attempts + 1}):`, error);
            attempts++;
        }
    }

    if (assistantResponse.trim() === "") {
        throw new Error(`Failed to get a non-empty response for ${source} after multiple attempts`);
    }

    return { message, assistantResponse };
}


async function generateFinalResponse(idealDonorProfileAnalysis, firstMessage) {
    const groq = new Groq({ apiKey: GROQ_API_KEY });
    let assistantResponse = "";

    try {
        const systemContent = typeof idealDonorProfileAnalysis === 'string' ? idealDonorProfileAnalysis : JSON.stringify(idealDonorProfileAnalysis);
        const userContent = typeof firstMessage === 'string' ? firstMessage : JSON.stringify(firstMessage);

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Use the following content as context for user input: ${systemContent}`
                },
                {
                    role: "user",
                    content: userContent
                }
            ],
            model: "llama-3.2-90b-text-preview",
            temperature: 1,
            max_tokens: 8000,
            top_p: 1,
            stream: true,
            stop: null
        });

        for await (const chunk of chatCompletion) {
            assistantResponse += chunk.choices[0]?.delta?.content || '';
        }

        return assistantResponse;
    } catch (error) {
        console.error('Error in generateFinalResponse:', error);
        throw error;
    }
}

export async function POST(req) {
    try {
        const data = await req.json();

        if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
            return NextResponse.json({ error: 'Invalid messages format', status: 'INVALID_MESSAGES' }, { status: 400 });
        }

        const firstMessage = data.messages[0]?.content || '';

        const result = await processContent({ firstMessage });

        const idealDonorProfileAnalysis = result[0]?.assistantResponse || '';

        const finalResponse = await generateFinalResponse(idealDonorProfileAnalysis, firstMessage);

        return NextResponse.json(
            {
                assistantResponse: finalResponse,
                status: 'SUCCESS'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            error: error.message || 'Internal Server Error',
            status: 'ERROR',
            details: error.error?.error || {}
        }, { status: 500 });
    }
}