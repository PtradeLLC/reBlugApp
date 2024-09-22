import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

const MAX_RETRIES = 3;

async function processContent(content, retryCount = 0) {
    try {
        const processedResults = await Promise.all(content.map(async (item) => {
            if (typeof item !== 'object' || !item) {
                throw new Error('Invalid input data');
            }

            const groq = new Groq({ apiKey: GROQ_API_KEY });

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
                Develop Ideal Donor Profile based on data input ${JSON.stringify(item)} submitted by the user.

                Objective:
                Your objective and goal is to derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause.

                Data:
                data: Use ${JSON.stringify(item)} as the initial data about the Cause and its target audience.

                Process:
                Data Understanding:
                Analyze data points in ${JSON.stringify(item)} to comprehend campaign goals, objectives, and available data points.
                Identify relevant data points within ${JSON.stringify(item)} to construct the 'Ideal Donor Profile'.

                Baseline Profile Creation:
                Structure a baseline profile using ${idealDonorProfile} as the formula to form a conceptual 
                framework and data analysis from ${JSON.stringify(item)} to produce your response. 

                By Implementing the steps below, you can derive an 'Ideal Donor Profile' for the campaign:
                1. Data Collection
                    * By using data collected from the campaign in the ${JSON.stringify(item)} to build a comprehensive dataset.
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
             {Provide Data}
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
            const maxAttempts = 3;

            while (assistantResponse.trim() === "" && attempts < maxAttempts) {
                try {
                    const chatCompletion = await groq.chat.completions.create({
                        messages: [{ role: "user", content: donorProfileString }],
                        model: "llama-3.1-70b-versatile",
                        temperature: 0.5,
                        max_tokens: 8000,
                        top_p: 1,
                        stream: true
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
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                }
            }

            if (assistantResponse.trim() === "") {
                throw new Error("Failed to get a non-empty response from Groq API after multiple attempts");
            }

            return { item, assistantResponse };
        }));

        if (processedResults.length === 0 && retryCount < MAX_RETRIES) {
            console.log(`Attempt ${retryCount + 1} produced no results. Retrying...`);
            return processContent(content, retryCount + 1);
        }

        return processedResults;
    } catch (error) {
        console.error('Error in processContent:', error);
        if (retryCount < MAX_RETRIES) {
            console.log(`Error occurred in attempt ${retryCount + 1}. Retrying...`);
            return processContent(content, retryCount + 1);
        }
        throw error;
    }
}

export async function POST(req) {
    try {
        const data = await req.json();

        // Check if messages are defined and is an array
        if (!data.messages || !Array.isArray(data.messages)) {
            return NextResponse.json({ error: 'Messages not found or invalid format', status: 'INVALID_MESSAGES' }, { status: 400 });
        }

        // Check if there is at least one message
        if (data.messages.length === 0) {
            return NextResponse.json({ error: 'No messages found', status: 'EMPTY_MESSAGES' }, { status: 400 });
        }

        // Safely access content
        const firstMessage = data.messages[0];
        const textMessage = data.messages[1];

        // Determine which message to return
        let messageToReturn = firstMessage?.content ? [firstMessage] : [textMessage];

        // If both are empty, return an error
        if (!messageToReturn[0]?.content) {
            return NextResponse.json({ error: 'No valid content found in messages', status: 'NO_CONTENT' }, { status: 400 });
        }

        // Process the chosen message content
        const result = await processContent(messageToReturn);

        // Return the processed result to the client
        return NextResponse.json({ message: result[0].item, assistantResponse: result[0].assistantResponse, status: 'SUCCESS' }, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error', status: 'ERROR', stack: error.stack }, { status: 500 });
    }
}



// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import Groq from 'groq-sdk';


// const GROQ_API_KEY = process.env.GROQ_API_KEY;
// const prisma = new PrismaClient();

// const MAX_RETRIES = 3;

// async function processContent(message, textData, retryCount = 0) {
//     try {
//         const processedResults = await Promise.all(message.map(async (item) => {
//             if (typeof item !== 'object' || !item) {
//                 throw new Error('Invalid input data');
//             }

//             const groq = new Groq({ apiKey: GROQ_API_KEY });

//             const dataFormula = `
//         - C1: Environmental Campaign, Objective: Reduce Pollution
//         - C2: Causes: Environmental Sustainability, Problem: Pollution
//         - C3: Unique Appeal: Sustainable Future, Motivation: Protecting the Planet
//         - D1: Geolocation: New York, Target Donor: Tech Professionals
//         - D2: Gender: Any, Wealth Indicators: Owns Property, Business Affiliations
//         - B1: Donation History: Frequent, Amount: $100-$500
//         - B2: Common Patterns: Supports Green Initiatives
//         - P1: Interests: Sustainability, Clean Energy
//         - P2: Communication: Prefers Email
//         - P3: Professional Background: Tech Industry
//         - P4: Philanthropic Interests: Environmental Projects
//         - P5: Political Affiliation: Moderate or Progressive (if relevant)
//         - P6: Wealth Indicators: Property Ownership, Business Affiliations, Stock Holdings
//         `;

//             const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

//             const donorProfileString = `
//                 Task: 
//                 Develop Ideal Donor Profile based on data input ${JSON.stringify(item)} submitted by the user.

//                 Objective:
//                 Your objective and goal is to derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause.

//                 Data:
//                 data: Use ${JSON.stringify(item)} as the initial data about the Cause and its target audience.

//                 Process:
//                 Data Understanding:
//                 Analyze data points in ${JSON.stringify(item)} to comprehend campaign goals, objectives, and available data points.
//                 Identify relevant data points within ${JSON.stringify(item)} to construct the 'Ideal Donor Profile'.

//                 Baseline Profile Creation:
//                 Structure a baseline profile using ${idealDonorProfile} as the formula to form a conceptual 
//                 framework and data analysis from ${JSON.stringify(item)} to produce your response. 

//                 By Implementing the steps below, you can derive an 'Ideal Donor Profile' for the campaign:
//                 1. Data Collection
//                     * By using data collected from the campaign in the ${JSON.stringify(item)} to build a comprehensive dataset.
//                     * Use statistical methods and machine learning algorithms to analyze the data, identify patterns, and rank potential donors based on the framework components.
//                 2. Profile Creation
//                     * Develop donor profiles by highlighting key attributes that align with the campaign characteristics and donor personas.
//                 3. Targeted Outreach
//                     * Tailor marketing and outreach efforts to focus on donors who fit the ideal profile, leveraging the identified patterns and commonalities.
                
//                 Example Logic to Derive Ideal Donor Profile
//                 1. Identify Campaign Characteristics (C)
//                     * Example: 
//                        * Environmental Campaign, 
//                        * Objectives: Reduce Pollution, 
//                        * Appeal: Sustainable Future.
//                 2. Analyze Donor Demographics (D)
//                     * Example:
//                         * Location: New York
//                         * Gender: Any
//                         * Wealth Indicators: Owns Property, Business Affiliations
//                 3. Evaluate Donor Behavior (B)
//                     * Example:
//                         * Donation History: Frequent donations to environmental causes
//                         * Typical Amount: $100-$500
//                 4. Define Donor Personas (P)
//                     * Example:
//                         * Interests: Sustainability, Clean Energy
//                         * Values: Environmental Responsibility
//                         * Communication: Prefers email
//                         * Professional Background: Works in tech industry
//                         * Philanthropic Interests: Supports environmental projects
                        
//              <Instruction>
//              Use this instructions for context when responding to the all user inquiries and providing answer, and when responding to the user and providing answer, do the following:
         
//                         1. Provide a concise and informative detailed analysis.
//                         2. Provide responses with credible sources.
//                         3. Use the following format for your response:

//              Ideal Donor Profile for {Campaign Name}
             
//              Objective and Goal:
//              {Provide Objective and Goal}

//              Data:
//              {Provide Data}
//                      Data Understanding:

//                      {Provide short summary of the campaign}

//                      **Baseline Profile Creation:**
//                      * **Campaign Details:**
//                      + Name: {Provide Name}
//                      + About: {Provide About}
//                      + Goals: {Provide Goals}
//                      + Objectives: {Provide Objectives}

//                      * **Target Demographics:**
//                      + Gender: {Provide Gender}
//                      + Age: {Provide Age}
//                      + Wealth: {Provide Wealth}

//                      * **Location:**
//                      + City: {Provide City}
//                      + State: {Provide State}
//                      + Country: {Provide Country}

//                      **Ideal Donor Profile Development:**

//                      Using the provided data and a conceptual formula, we will derive an 'Ideal Donor Profile' for {Campaign Name}:

//                      **Campaign Characteristics (C)**

//                      1. **C1**: {Provide C1}
//                      2. **C2**: {Provide C2}
//                      3. **C3**: {Provide C3}

//                      **Donor Demographics (D)**

//                      1. **D1**: {Provide Demographic 1}
//                      2. **D2**: {Provide Demographic 2}

//                      **Donor Behavior (B)**

//                      1. **B1**: {Provide Behavior 1}
//                      2. **B2**: {Provide Behavior 2}
//                      3. **B3**: {Provide Behavior 3}
//                      4. **B4**: {Provide Behavior 4}
//                      5. **B5**: {Provide Behavior 5}
//                      6. **B6**: {Provide Behavior 6}

//                      **Donor Personas (P)**

//                      1. **P1**: {Provide Persona 1}
//                      2. **P2**: {Provide Persona 2}
//                      3. **P3**: {Provide Persona 3}
//                      4. **P4**:{Provide Persona 4}
//                      5. **P5**: {Provide Persona 5}
//                      6. **P6**: {Provide Persona 6}
//                      7. **P7**: {Provide Persona 7}
//                      8. **P8**: {Provide Persona 8}
//                      9. **P9**: {Provide Persona 9}
//                      10. **P10**: {Provide Persona 10}

//                      **Ideal Donor Profile**

//                      Based on the analysis, the ideal donor profile for the campaign is:

//                      * **Name:** {Provide Name}
//                      * **Gender:** {Provide Gender}
//                      * **Age:** {Provide Age}
//                      * **Wealth:** {Provide Wealth}
//                      * **Location:** {Provide Location}
//                      * **Interests:** {Provide Interests}
//                      * **Values:** {Provide Values}
//                      * **Wealth indicators:**  {Provide Wealth Indicators}
//                      * **Donation behavior:** {Provide Donation Behavior}
//                      * **Communication preferences:** {Provide Communication Preferences}
//                      * **Professional background:** {Provide Professional Background}
//                      * **Philanthropic interests:** {Provide Philanthropic Interests}
//                      * **Political affiliation:** {Provide Political Affiliation}

//                      **Targeted Outreach Strategy**
//                      {Provide Targeted Outreach Strategy}

//                      **Actionable Recommendations:**
//                      {Provide actionable recommendations}
//              </Instruction>
//             `;


//             let assistantResponse = "";
//             let attempts = 0;
//             const maxAttempts = 3;

//             while (assistantResponse.trim() === "" && attempts < maxAttempts) {
//                 try {
//                     const chatCompletion = await groq.chat.completions.create({
//                         messages: [{ role: "user", content: donorProfileString }],
//                         model: "llama-3.1-70b-versatile",
//                         temperature: 0.5,
//                         max_tokens: 8000,
//                         top_p: 1,
//                         stream: true
//                     });

//                     for await (const chunk of chatCompletion) {
//                         assistantResponse += chunk.choices[0]?.delta?.content || '';
//                     }

//                     if (assistantResponse.trim() === "") {
//                         console.log(`Attempt ${attempts + 1} produced an empty response. Retrying...`);
//                         attempts++;
//                     }
//                 } catch (error) {
//                     console.error(`Error in Groq API call (attempt ${attempts + 1}):`, error);
//                     attempts++;
//                     if (attempts >= maxAttempts) {
//                         throw error;
//                     }
//                 }
//             }

//             if (assistantResponse.trim() === "") {
//                 throw new Error("Failed to get a non-empty response from Groq API after multiple attempts");
//             }

//             return { item, assistantResponse };
//         }));

//         if (processedResults.length === 0 && retryCount < MAX_RETRIES) {
//             console.log(`Attempt ${retryCount + 1} produced no results. Retrying...`);
//             return processContent(content, retryCount + 1);
//         }

//         return processedResults;
//     } catch (error) {
//         console.error('Error in processContent:', error);
//         if (retryCount < MAX_RETRIES) {
//             console.log(`Error occurred in attempt ${retryCount + 1}. Retrying...`);
//             return processContent(content, retryCount + 1);
//         }
//         throw error;
//     }
// }



// export async function POST(req) {
//     try {
//         const data = await req.json();

//         // Check if messages are defined and is an array
//         if (!data.messages || !Array.isArray(data.messages)) {
//             return NextResponse.json({ error: 'Messages not found or invalid format', status: 'INVALID_MESSAGES' }, { status: 400 });
//         }

//         // Check if there is at least one message
//         if (data.messages.length === 0) {
//             return NextResponse.json({ error: 'No messages found', status: 'EMPTY_MESSAGES' }, { status: 400 });
//         }

//         // Safely access content
//         const firstMessage = data.messages[0];
//         const textMessage = data.messages[1];

//         // Determine which message to return
//         let messageToReturn = firstMessage?.content ? firstMessage : textMessage;

//         // If both are empty, return an error
//         if (!messageToReturn?.content) {
//             return NextResponse.json({ error: 'No valid content found in messages', status: 'NO_CONTENT' }, { status: 400 });
//         }

//         console.log("Message to return", messageToReturn);
//         console.log("firstMessage", firstMessage);
//         console.log("TextMessage", textMessage);

//         // Process the chosen message content
//         const result = await processContent(messageToReturn);

//         // Return the processed result to the client
//         return NextResponse.json({ message: result.message, assistantResponse: result.assistantResponse, status: 'SUCCESS' }, { status: 200 });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({ error: error.message || 'Internal Server Error', status: 'ERROR', stack: error.stack }, { status: 500 });
//     }
// }



// export async function POST(req) {
//     try {
//         const data = await req.json();

//         // Check if messages is defined and is an array
//         if (!data.messages || !Array.isArray(data.messages)) {
//             return NextResponse.json({ error: 'Messages not found or invalid format', status: 'INVALID_MESSAGES' }, { status: 400 });
//         }

//         // Check if there is at least one message
//         if (data.messages.length === 0) {
//             return NextResponse.json({ error: 'No messages found', status: 'EMPTY_MESSAGES' }, { status: 400 });
//         }

//         // Safely access content
//         const firstMessage = data.messages[0];
//         const textMessage = data.messages[1];

//         const messageContent = firstMessage || textMessage;

//         console.log("Message Content", messageContent);

//         return NextResponse.json({ results: "Success", status: 'SUCCESS' }, { status: 200 });

//         // if (!firstMessage.content) {
//         //     return NextResponse.json({ error: 'Content not found in the first message', status: 'NO_CONTENT' }, { status: 400 });
//         // }

//         // const content = Array.isArray(firstMessage.content) ? firstMessage.content : [firstMessage.content];

//         // const processedResults = await processContent(content);

//         // if (processedResults.length === 0) {
//         //     return NextResponse.json({ error: 'No results found after processing', status: 'NO_RESULTS' }, { status: 204 });
//         // }

//         // console.log("PROCESSED RESULTS", JSON.stringify(processedResults, null, 2));

//         // return NextResponse.json({ results: processedResults, status: 'SUCCESS' }, { status: 200 });

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({ error: error.message || 'Internal Server Error', status: 'ERROR', stack: error.stack }, { status: 500 });
//     }
// }


