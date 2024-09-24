import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

const MAX_RETRIES = 3;

async function processContent({ firstMessage, textMessage }, retryCount = 0) {
    try {
        if (!firstMessage || !firstMessage.role || !firstMessage.content) {
            throw new Error("Invalid firstMessage data");
        }

        const processedResults = await Promise.all([
            processSingleMessage(firstMessage, 'User Input'),
            textMessage ? processSingleMessage(textMessage, 'Chatbot Response') : null,
        ]);

        return processedResults.filter(result => result !== null);
    } catch (error) {
        console.error('Error in processContent:', error);
        throw error;
    }
}


async function processSingleMessage(message, source) {
    // if (typeof message !== 'object' || !message || !message.content) {
    //     throw new Error(`Invalid ${source} data`);
    // }

    const groq = new Groq({ apiKey: GROQ_API_KEY });

    const userData = message.content;
    let chatAssistantResponse = "";

    // Check if the message is a `firstMessage`
    if (source === 'User Input') {
        // Instruction template for `firstMessage`
        const dataFormula = `
    - C1: Environmental Campaign, Objective: Reduce Pollution
    - C2: Causes: Environmental Sustainability, Problem: Pollution
    - C3: Unique Appeal: Sustainable Future, Motivation: Protecting the Planet
    - D1: Geolocation: New York, Target Donor: Tech Professionals
    - D2: Gender: Any, Wealth Indicators: Owns Property, Business Affiliations
    - B1: Donation History: Frequent, Amount: $100-$500
    - B2: Common Patterns: Supports Green Initiatives
    - P1: Interests: Sustainability, Clean Energy
    - P2: Communication: Prefers Email
    - P3: Professional Background: Tech Industry
    - P4: Philanthropic Interests: Environmental Projects
    - P5: Political Affiliation: Moderate or Progressive (if relevant)
    - P6: Wealth Indicators: Property Ownership, Business Affiliations, Stock Holdings
    `;

        const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

        const donorProfileString = `
            Task: 
            Develop Ideal Donor Profile based on data input ${JSON.stringify(message)} submitted by the user.

            Objective:
            Your objective and goal is to derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause.

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
                * By using data collected from the campaign in the ${JSON.stringify(message)} to build a comprehensive dataset.
                * Use statistical methods and machine learning algorithms to analyze the data, identify patterns, and rank potential donors based on the framework components.
            2. Profile Creation
                * Develop donor profiles by highlighting key attributes that align with the campaign characteristics and donor personas.
            3. Targeted Outreach
                * Tailor marketing and outreach efforts to focus on donors who fit the ideal profile, leveraging the identified patterns and commonalities.
            
            Example Logic to Derive Ideal Donor Profile
            1. Identify Campaign Characteristics (C)
                * Example: 
                   * Environmental Campaign, 
                   * Objectives: Reduce Pollution, 
                   * Appeal: Sustainable Future.
            2. Analyze Donor Demographics (D)
                * Example:
                    * Location: New York
                    * Gender: Any
                    * Wealth Indicators: Owns Property, Business Affiliations
            3. Evaluate Donor Behavior (B)
                * Example:
                    * Donation History: Frequent donations to environmental causes
                    * Typical Amount: $100-$500
            4. Define Donor Personas (P)
                * Example:
                    * Interests: Sustainability, Clean Energy
                    * Values: Environmental Responsibility
                    * Communication: Prefers email
                    * Professional Background: Works in tech industry
                    * Philanthropic Interests: Supports environmental projects
                    
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

                 1. **C1**: {Provide C1}
                 2. **C2**: {Provide C2}
                 3. **C3**: {Provide C3}

                 **Donor Demographics (D)**

                 1. **D1**: {Provide Demographic 1}
                 2. **D2**: {Provide Demographic 2}

                 **Donor Behavior (B)**

                 1. **B1**: {Provide Behavior 1}
                 2. **B2**: {Provide Behavior 2}
                 3. **B3**: {Provide Behavior 3}
                 4. **B4**: {Provide Behavior 4}
                 5. **B5**: {Provide Behavior 5}
                 6. **B6**: {Provide Behavior 6}

                 **Donor Personas (P)**

                 1. **P1**: {Provide Persona 1}
                 2. **P2**: {Provide Persona 2}
                 3. **P3**: {Provide Persona 3}
                 4. **P4**:{Provide Persona 4}
                 5. **P5**: {Provide Persona 5}
                 6. **P6**: {Provide Persona 6}
                 7. **P7**: {Provide Persona 7}
                 8. **P8**: {Provide Persona 8}
                 9. **P9**: {Provide Persona 9}
                 10. **P10**: {Provide Persona 10}

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
        `;


        let assistantResponse = "";
        let attempts = 0;

        while (assistantResponse.trim() === "" && attempts < MAX_RETRIES) {
            try {
                const chatCompletion = await groq.chat.completions.create({
                    messages: [{ role: "user", content: donorProfileString }],
                    model: "llama-3.1-70b-versatile",
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

        chatAssistantResponse = assistantResponse;

        return { message, assistantResponse };

    } else if (source === 'Chatbot Response') {
        // Operations for `textMessage`
        const dataFormula = `
        - C1: Environmental Campaign, Objective: Reduce Pollution
        - C2: Causes: Environmental Sustainability, Problem: Pollution
        - C3: Unique Appeal: Sustainable Future, Motivation: Protecting the Planet
        - D1: Geolocation: New York, Target Donor: Tech Professionals
        - D2: Gender: Any, Wealth Indicators: Owns Property, Business Affiliations
        - B1: Donation History: Frequent, Amount: $100-$500
        - B2: Common Patterns: Supports Green Initiatives
        - P1: Interests: Sustainability, Clean Energy
        - P2: Communication: Prefers Email
        - P3: Professional Background: Tech Industry
        - P4: Philanthropic Interests: Environmental Projects
        - P5: Political Affiliation: Moderate or Progressive (if relevant)
        - P6: Wealth Indicators: Property Ownership, Business Affiliations, Stock Holdings
        `;

        const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

        const donorProfileString = `
                Task: 
                Develop Ideal Donor Profile based on data input ${JSON.stringify(message)} submitted by the user.
    
                Objective:
                Your objective and goal is to derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause.
    
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
                    * By using data collected from the campaign in the ${JSON.stringify(message)} to build a comprehensive dataset.
                    * Use statistical methods and machine learning algorithms to analyze the data, identify patterns, and rank potential donors based on the framework components.
                2. Profile Creation
                    * Develop donor profiles by highlighting key attributes that align with the campaign characteristics and donor personas.
                3. Targeted Outreach
                    * Tailor marketing and outreach efforts to focus on donors who fit the ideal profile, leveraging the identified patterns and commonalities.
                
                Example Logic to Derive Ideal Donor Profile
                1. Identify Campaign Characteristics (C)
                    * Example: 
                       * Environmental Campaign, 
                       * Objectives: Reduce Pollution, 
                       * Appeal: Sustainable Future.
                2. Analyze Donor Demographics (D)
                    * Example:
                        * Location: New York
                        * Gender: Any
                        * Wealth Indicators: Owns Property, Business Affiliations
                3. Evaluate Donor Behavior (B)
                    * Example:
                        * Donation History: Frequent donations to environmental causes
                        * Typical Amount: $100-$500
                4. Define Donor Personas (P)
                    * Example:
                        * Interests: Sustainability, Clean Energy
                        * Values: Environmental Responsibility
                        * Communication: Prefers email
                        * Professional Background: Works in tech industry
                        * Philanthropic Interests: Supports environmental projects
                        
             <Instruction>

             Use ${userData} for context when responding to the all user inquiries and providing answer, and when responding to the user and providing answer, do the following:
         
                        1. Provide a concise and informative detailed analysis based on ${userData}.
                        2. Provide responses with credible sources.
             </Instruction>
            `;

        let assistantResponse = chatAssistantResponse;  // Assigned the value of chatAssistantResponse to assistantResponse

        console.log("ASSISTANT RESPONSE from TextData", assistantResponse);

        let attempts = 0;

        while (assistantResponse.trim() === "" && attempts < MAX_RETRIES) {
            try {
                const chatCompletion = await groq.chat.completions.create({
                    messages: [{ role: "user", content: donorProfileString }],
                    model: "llama-3.1-70b-versatile",
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
    } else {
        return;
    }
}

export async function POST(req) {
    try {
        const data = await req.json();

        if (!data.messages || !Array.isArray(data.messages) || data.messages.length === 0) {
            return NextResponse.json({ error: 'Invalid messages format', status: 'INVALID_MESSAGES' }, { status: 400 });
        }

        const firstMessage = data.messages[0] || null;
        const textMessage = data.messages[1] || null;

        if (!firstMessage?.content) {
            return NextResponse.json({ error: 'No valid content found in messages', status: 'NO_CONTENT' }, { status: 400 });
        }

        const result = await processContent({ firstMessage, textMessage });


        return NextResponse.json(
            {
                assistantResponse: result[0].assistantResponse,
                status: 'SUCCESS'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error', status: 'ERROR' }, { status: 500 });
    }
}