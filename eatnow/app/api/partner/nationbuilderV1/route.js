import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import { sub } from 'date-fns';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

const MAX_RETRIES = 3;

async function processContent({ firstMessage }) {
    try {
        const processedResults = await processSingleMessage(firstMessage, 'User Input');

        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        // console.log("PROCESSED RESULTS:", processedResults); // Returned data from the frontend submission (JSON)
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

        return [processedResults].filter(result => result !== null);
    } catch (error) {
        console.error('Error in processContent:', error);
        throw error;
    }
}

async function processSingleMessage(message, userContent, source) {
    const groq = new Groq({ apiKey: GROQ_API_KEY });
    let messageContent;

    try {
        if (typeof message === 'object') {
            messageContent = JSON.stringify(message, null, 2); // Pretty-print the JSON for readability
        } else {
            messageContent = message; // Use the raw message content if it's not an object
        }
    } catch (error) {
        console.error('Error processing message:', error);
        messageContent = message; // Use raw message if processing fails
    }
    // Conceptual formula for generating the 'Ideal Donor Profile'
    const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

    // Dynamically extract key data points from the message object
    const campaignGoal = message.fundingGoals || "Goal not provided";
    const targetDonor = message.demographic?.targetDonor || "Donor type not provided";
    const campaignObjective = message.objectives || "Objective not provided";
    const campaignType = message.campaignType || "Campaign type not provided";
    const interests = message.interests || "Interests not provided";
    const strategies = message.strategy || "Strategies not provided";
    const location = `${message.demographic?.geographic?.city}, ${message.demographic?.geographic?.state}, ${message.demographic?.geographic?.country}` || "Location not provided";

    // Prepare the context for the LLM based on extracted data
    const contextString = `
     Task: 
        Develop Ideal Donor Profile based on data input submitted by the user.

        Objectives:
        Your objective and goal is to derive 'Ideal Donor Profile' dynamically to optimize fundraising effort for a given Campaign.

        <Instruction>
        If user inquires about something, respond to the user's inquiry and provide a concise and informative, detailed analysis based on the data submitted by the user.

        Data:
        Use the provided data as the initial data about the Campaign and its target donor audience.

        Process:
        Data Understanding:
        Analyze data points in the provided data to comprehend campaign goals, objectives, and available data points.
        Identify relevant data points within the provided data to construct the 'Ideal Donor Profile'.

        Baseline Profile Creation:
        Structure a baseline profile as the formula to form a conceptual 
        framework and data analysis from the provided data to produce your response. 

        Use the format below as a guide to structure your output for the 'Ideal Donor Profile':

        Ideal Donor Profile for {Provide Campaign Title}

        Objective and Goal:
        {Provide Objective and Goal}

        Data:
        Data Understanding:
        {Provide short summary of the campaign}

        **Baseline Profile Creation:**
        * **Campaign Details:**
        + Name: {Provide Campaign Title}
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

        Using the provided data and a conceptual formula (${idealDonorProfile}), derive an 'Ideal Donor Profile':

        **Campaign Characteristics (C)**
        **Donor Demographics (D)**
        **Donor Behavior (B)**
        **Donor Personas (P)**

        **Ideal Donor Profile**

        Based on the analysis, the ideal donor profile for the campaign is:

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

        **Extracted Data from User Submission**:
        - **Campaign Goal**: ${campaignGoal}
        - **Target Donor**: ${targetDonor}
        - **Campaign Objective**: ${campaignObjective}
        - **Campaign Type**: ${campaignType}
        - **Location**: ${location}
        - **Interests**: ${interests}
        - **Strategies**: ${strategies}
    `;

    // Use userContent from the generateFinalResponse as the follow-up query for the LLM
    const queryString = `
        If there is user's question, then provide your response based on the following context:
        
        ${contextString}

        User's Question: "${userContent}"
    `;

    let assistantResponse = "";
    let attempts = 0;

    while (assistantResponse.trim() === "" && attempts < MAX_RETRIES) {
        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "user", content: queryString }],
                model: "llama-3.1-70b-versatile",
                temperature: 0.7,
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
        let parsedSystemContent;
        if (typeof idealDonorProfileAnalysis === 'string') {
            try {
                parsedSystemContent = JSON.parse(idealDonorProfileAnalysis);
            } catch (e) {
                parsedSystemContent = idealDonorProfileAnalysis;
            }
        } else {
            parsedSystemContent = idealDonorProfileAnalysis;
        }

        const userContent = typeof firstMessage === 'string' ? firstMessage : JSON.stringify(firstMessage);

        console.log(">>>>>>>>>>>>>>>>>>>>>>>");
        console.log("SYSTEM CONTENT:", parsedSystemContent);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>");
        console.log("USER CONTENT:", userContent);

        const promptTemplate = `
        Based on the provided data, create an Ideal Donor Profile for the campaign.

        Ideal Donor Profile for ${JSON.parse(userContent).title}

        Objective and Goal:
        {Provide the campaign's objective and goal based on the 'about' and 'objectives' fields}

        Data:
        Data Understanding:
        {Provide a short summary of the campaign based on all relevant fields}

        **Baseline Profile Creation:**
        * **Campaign Details:**
        + Name: ${JSON.parse(userContent).title}
        + About: {Use the 'about' field}
        + Goals: {Use the 'fundingGoals' field}
        + Objectives: {Use the 'objectives' field}

        * **Target Demographics:**
        + Gender: {Use the 'gender' field}
        + Age: {Use the 'targetDonor' field}
        + Wealth: {Use the 'wealthIndicator' field}

        * **Location:**
        + City: {Use the 'demographic.geographic.city' field}
        + State: {Use the 'demographic.geographic.state' field}
        + Country: {Use the 'demographic.geographic.country' field}

        **Ideal Donor Profile Development:**

        Using the provided data and a conceptual formula, derive an 'Ideal Donor Profile':

        **Campaign Characteristics (C)**
        **Donor Demographics (D)**
        **Donor Behavior (B)**
        **Donor Personas (P)**

        **Ideal Donor Profile**

        Based on the analysis, the ideal donor profile for the campaign is:

        * **Gender:** {Provide Gender}
        * **Age:** {Provide Age}
        * **Wealth:** {Provide Wealth}
        * **Location:** {Provide Location}
        * **Interests:** {Use the 'interests' field}
        * **Values:** {Derive from the campaign's objectives and philanthropic interests}
        * **Wealth indicators:** {Use the 'wealthIndicator' field}
        * **Donation behavior:** {Use the 'donor_behavior' and 'recurringGiving' fields}
        * **Communication preferences:** {Use the 'strategy' field}
        * **Professional background:** {Derive from the 'supporters' field and other relevant information}
        * **Philanthropic interests:** {Use the 'philanthropic_Interests' field}
        * **Political affiliation:** {Use the 'politicalAffiliation' field}

        **Targeted Outreach Strategy**
        {Provide a targeted outreach strategy based on the 'momentum', 'strategy', and other relevant fields}

        **Actionable Recommendations:**
        {Provide 5 actionable recommendations based on the analysis}

        Use the provided data to fill in all the sections above. Ensure that the response is comprehensive and tailored to the specific campaign details provided in the user input.
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: promptTemplate
                },
                { role: "user", content: userContent }
            ],
            model: "llama-3.2-90b-text-preview",
            temperature: 0.7,
            max_tokens: 8000,
            top_p: 1,
            stream: true,
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

        // We no longer need to process the content separately
        // const result = await processContent({ firstMessage });
        // const idealDonorProfileAnalysis = result[0]?.assistantResponse || '';

        // Instead, we pass the firstMessage directly to generateFinalResponse
        const finalResponse = await generateFinalResponse(null, firstMessage);

        console.log("ASSISTANT RESPONSE from generateFinalResponse:", finalResponse);

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


// export async function POST(req) {
//     try {
//         const data = await req.json();

//         if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
//             return NextResponse.json({ error: 'Invalid messages format', status: 'INVALID_MESSAGES' }, { status: 400 });
//         }

//         const firstMessage = data.messages[0]?.content || '';

//         const result = await processContent({ firstMessage });

//         const idealDonorProfileAnalysis = result[0]?.assistantResponse || '';

//         const finalResponse = await generateFinalResponse(idealDonorProfileAnalysis, firstMessage);

//         console.log("ASSISTANT RESPONSE from generateFinalResponse:", finalResponse);

//         return NextResponse.json(
//             {
//                 assistantResponse: finalResponse,
//                 status: 'SUCCESS'
//             },
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({
//             error: error.message || 'Internal Server Error',
//             status: 'ERROR',
//             details: error.error?.error || {}
//         }, { status: 500 });
//     }
// }




// async function generateFinalResponse(idealDonorProfileAnalysis, firstMessage) {
//     const groq = new Groq({ apiKey: GROQ_API_KEY });
//     let assistantResponse = "";

//     try {
//         let parsedSystemContent;
//         if (typeof idealDonorProfileAnalysis === 'string') {
//             try {
//                 parsedSystemContent = JSON.parse(idealDonorProfileAnalysis);
//             } catch (e) {
//                 parsedSystemContent = idealDonorProfileAnalysis;
//             }
//         } else {
//             parsedSystemContent = idealDonorProfileAnalysis;
//         }

//         // Use firstMessage as userContent
//         const userContent = typeof firstMessage === 'string' ? firstMessage : JSON.stringify(firstMessage);

//         // console.log(">>>>>>>>>>>>>>>>>>>>>>>");
//         // console.log("SYSTEM CONTENT:", parsedSystemContent);
//         // console.log(">>>>>>>>>>>>>>>>>>>>>>>");
//         // console.log("USER CONTENT:", userContent); 
//         // console.log(">>>>>>>>>>>>>>>>>>>>>>>");

//         // Call processSingleMessage with parsedSystemContent and userContent
//         assistantResponse = await processSingleMessage(parsedSystemContent, userContent, firstMessage);

//         console.log("ASSISTANT RESPONSE from generateFinalResponse:", assistantResponse);

//         return assistantResponse;
//     } catch (error) {
//         console.error('Error in generateFinalResponse:', error);
//         throw error;
//     }
// }


// export async function POST(req) {
//     try {
//         const data = await req.json();

//         if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
//             return NextResponse.json({ error: 'Invalid messages format', status: 'INVALID_MESSAGES' }, { status: 400 });
//         }

//         const firstMessage = data.messages[0]?.content || '';

//         const result = await processContent({ firstMessage });

//         const idealDonorProfileAnalysis = result[0]?.assistantResponse || '';

//         const finalResponse = await generateFinalResponse(idealDonorProfileAnalysis, firstMessage);

//         // console.log("finalResponse from nationBuilder:", finalResponse);

//         return NextResponse.json(
//             {
//                 assistantResponse: finalResponse,
//                 status: 'SUCCESS'
//             },
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({
//             error: error.message || 'Internal Server Error',
//             status: 'ERROR',
//             details: error.error?.error || {}
//         }, { status: 500 });
//     }
// }
