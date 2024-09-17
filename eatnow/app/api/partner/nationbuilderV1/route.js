// app/api/getNiche/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import attr from '../../../attributes.json';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.json();
        const content = Array.isArray(data.messages[0].content) ? data.messages[0].content : [data.messages[0].content];

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

        const definitions = {
            campaignName: "Name of Campaign",
            campaign_type: "Type of the campaign",
            about: "About the campaign",
            goals_objectives: "Goals of the campaign beyond raising money",
            causes: {
                problems: "What specific problem or need campaign addresses",
                campaign_Interest: "Type of people who has shown interest in similar causes in the past",
                campaign_supporters: "Notable supporters or influencers associated with cause",
                appeal: "Unique aspects of campaign might appeal to certain donor segments",
                donor_behaviors: "Patterns in donor behavior from previous similar campaigns?",
                upcoming_events: "Upcoming events or milestones related to cause that might influence donor interest",
                motivations: "Primary motivations you believe drive donors to support cause",
                seasonal_trends: "Seasonal or cyclical trends you have noticed in donor support for cause"
            },
            targetDonorDemographics: {
                geoLocation: "Location of the campaign",
                target_donor: "Who are target donors of the campaign",
                gender: "Target donor's gender",
                donors_intention: "How campaigns currently (or previously) identify your donor intentions",
                wealth: "Does individual wealth matter to campaign",
                donorSegmentation: {
                    characteristics: "",
                    givingPatterns: {
                        givingHistory: {
                            donationAmounts: "List of suggested number of times target ideal donor has",
                            donationFrequency: "Frequency of donations made",
                            preferredCauses: "List of suggested preferred causes target ideal donor supports",
                        }
                    },
                    trends: "",
                    commonalities: "",
                },
                donorPersonas: {
                    interests: "Suggested interest of target ideal donors",
                    values: "Suggested values of target ideal donors",
                    motivations: "Suggested motivations of target ideal donors",
                    communicationPreferences: {
                        email: "True if target ideal donor prefers email as form of communication",
                        phone: "True if target ideal donor prefers telephone as form of communication",
                        events: "True if target ideal donor prefers to donate to causes at events",
                        socialMedia: "True if target ideal donor prefers social media as form of communication"
                    },
                    professionalBackground: {
                        industry: "Suggested industry of target ideal donor",
                        job: "Suggested occupation of target ideal donor",
                        jobTitle: "Suggested job of target ideal donor",
                        companySize: "Suggested company size of target ideal donor",
                    },
                    philanthropicInterests: {
                        causes: "Suggested causes that interest ideal donor",
                        projects: "Suggested projects that interest ideal donor",
                    },
                    politicalAffiliation: {
                        party: "Suggested political party ideal donor is affiliated with"
                    },
                    wealthIndicators: {
                        propertyOwnership: "Predicts if ideal donor owns property",
                        businessAffiliations: "Predicts if ideal donor owns business",
                        stockHoldings: "Predicts if ideal donor has investment portfolios"
                    },
                },
            }
        };

        const processedResults = await Promise.all(content.map(async (item) => {
            if (typeof item !== 'object') {
                throw new Error('Invalid input data');
            }

            const groq = new Groq({ apiKey: GROQ_API_KEY });

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
            `;

            const chatCompletion = await groq.chat.completions.create({
                messages: [{ role: "user", content: donorProfileString }],
                model: "llama-3.1-70b-versatile",
                temperature: 0.5,
                max_tokens: 8000,
                top_p: 1,
                stream: true
            });

            let assistantResponse = "";
            for await (const chunk of chatCompletion) {
                assistantResponse += chunk.choices[0]?.delta?.content || '';
            }

            return { item, assistantResponse };
        }));

        console.log("PROCESSED RESULTS", processedResults);
        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}






// // app/api/getNiche/route.js
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import Groq from 'groq-sdk';
// import attr from '../../../attributes.json'

// const GROQ_API_KEY = process.env.GROQ_API_KEY;

// const prisma = new PrismaClient();

// export async function POST(req) {
//     try {
//         let data = await req.json();

//         let content = data.messages[0].content;

//         //  Ideal Donor Profile for "Environmental Campaign":

//         const dataFormula = `
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


//         1. Campaign Characteristics
//         * C1: Campaign Type and Objectives
//             * Match the campaign type (e.g., environmental, educational, health) and objectives with the donor’s interests.
//         * C2: Causes and Problems Addressed
//             * Align the specific problems or needs the campaign addresses with the donor’s preferred causes and philanthropic interests.
//         * C3: Unique Appeals and Motivations
//             * Identify and emphasize unique aspects of the campaign that appeal to the donor’s motivations and psychological triggers.
//         2. Donor Demographics
//         * D1: Geolocation and Target Donor
//             * Ensure the donor's location aligns with the campaign's geographic target.
//             * Match the target donor demographics with the campaign's audience.
//         * D2: Gender and Wealth Indicators
//             * Check if the donor's gender matches the target demographic.
//             * Evaluate wealth indicators such as property ownership, business affiliations, and stock holdings.
//         3. Donor Behavior
//         * B1: Giving Patterns (History, Frequency, Amounts)
//             * Analyze past donation history, frequency, and typical donation amounts to predict future giving.
//         * B2: Trends and Commonalities
//             * Identify trends and common patterns in donor behavior from similar campaigns.
//         4. Donor Personas
//         * P1: Interests and Values
//             * Match the donor's interests and values with the campaign’s objectives and cause.
//         * P2: Communication Preferences
//             * Use the donor's communication preferences (e.g., email, phone, social media) for effective engagement.
//         * P3: Professional Background
//             * Consider the donor’s industry, job, and professional background in relation to the campaign.
//         * P4: Philanthropic Interests
//             * Align the donor's philanthropic interests and causes they support with the campaign.
//         * P5: Political Affiliation
//             * If relevant, consider the donor’s political affiliation and how it might influence their support for the campaign.
//         * P6: Wealth Indicators
//             * Evaluate indicators of wealth to assess the donor's capacity to give.`

//         // The formula can be expressed as:
//         const Ideal_Donor_Profile = C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6

//         // If data is not an array, convert it to one
//         if (!Array.isArray(content)) {
//             content = [content];
//         }


//         const processedResults = [];

//         for (const item of content) {
//             const groq = new Groq({ apiKey: GROQ_API_KEY });


//             if (typeof item !== 'object') {
//                 return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
//             }

//             //Description of Formula data point attributes
//             const Description = attr.filter(att => typeof att.Description === 'string' && att.Description.trim() !== '');


//             const definitions = `
//                         {
//                             campaignName: "Name of Campaign",
//                             campaign_type: "Type of the campaign",
//                             about: "About the campaign",
//                             goals_objectives: "Goals of the campaign beyond raising money",
//                             causes: {
//                                 problems: "What specific problem or need campaign addresses",
//                                 campaign_Interest: "Type of people who has shown interest in similar causes in the past",
//                                 campaign_supporters: "Notable supporters or influencers associated with cause",
//                                 appeal: "Unique aspects of campaign might appeal to certain donor segments",
//                                 donor_behaviors: "Patterns in donor behavior from previous similar campaigns?",
//                                 upcoming_events: "Upcoming events or milestones related to cause that might influence donor interest",
//                                 motivations: "Primary motivations you believe drive donors to support cause",
//                                 seasonal_trends: "Seasonal or cyclical trends you have noticed in donor support for cause"
//                             },
//                             targetDonorDemographics: {
//                                 geoLocation: "Location of the campaign",
//                                 target_donor: "Who are target donors of the campaign",
//                                 gender: "Target donor's gender",
//                                 donors_intention: "How campaigns currently (or previously) identify your donor intentions",
//                                 wealth: "Does individual wealth matter to campaign",
//                                 donorSegmentation: {
//                                     characteristics: "",
//                                     givingPatterns: {
//                                         givingHistory: {
//                                             donationAmounts: "List of suggested number of times target ideal donor has",
//                                             donationFrequency: "Frequency of donations made",
//                                             preferredCauses: "List of suggested preferred causes target ideal donor supports",
//                                         }
//                                     },
//                                     trends: "",
//                                     commonalities: "",
//                                 },
//                                 donorPersonas: {
//                                     interests: "Suggested interest of target ideal donors",
//                                     values: "Suggested values of target ideal donors",
//                                     motivations: "Suggested motivations of target ideal donors",
//                                     communicationPreferences: {
//                                         email: "True if target ideal donor prefers email as form of communication",
//                                         phone: "True if target ideal donor prefers telephone as form of communication",
//                                         events: "True if target ideal donor prefers to donate to causes at events",
//                                         socialMedia: "True if target ideal donor prefers social media as form of communication"
//                                     },
//                                     professionalBackground: {
//                                         industry: "Suggested industry of target ideal donor",
//                                         job: "Suggested occupation of target ideal donor",
//                                         jobTitle: "Suggested job of target ideal donor",
//                                         companySize: "Suggested company size of target ideal donor",
//                                     },
//                                     philanthropicInterests: {
//                                         causes: "Suggested causes that interest ideal donor",
//                                         projects: "Suggested projects that interest ideal donor",
//                                     },
//                                     politicalAffiliation: {
//                                         party: "Suggested political party ideal donor is affiliated with"
//                                     },
//                                     wealthIndicators: {
//                                         propertyOwnership: "Predicts if ideal donor owns property",
//                                         businessAffiliations: "Predicts if ideal donor owns business",
//                                         stockHoldings: "Predicts if ideal donor has investment portfolios"
//                                     },
//                                 },
//                             }
//                         }
//                         `;

//             const donorProfileString = `
//                         Task: 
//                         Develop Ideal Donor Profile based on data input ${JSON.stringify(item)} submitted by the user.

//                         Objective:
//                         Your objective and goal is to derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause.

//                         Data:
//                         data: Use ${JSON.stringify(item)} as the initial data about the Cause and its target audience.

//                         Process:
//                         Data Understanding:

//                         Analyze data points in ${JSON.stringify(item)} to comprehend campaign goals, objectives, and available data points.
//                         Identify relevant data points within ${JSON.stringify(item)} to construct the 'Ideal Donor Profile'.

//                         Baseline Profile Creation:

//                         Structure a baseline profile using ${Ideal_Donor_Profile} as the formula to form a conceptual 
//                         framework and data analysis from ${JSON.stringify(item)} to produce your response. 

//                         By Implementing the steps below, you can derive an 'Ideal Donor Profile' for the campaign:
//                         1. Data Collection
//                             * By using data collected from the campaign in the ${JSON.stringify(item)} to build a comprehensive dataset.
//                             * Use statistical methods and machine learning algorithms to analyze the data, identify patterns, and rank potential donors based on the framework components.
//                         2. Profile Creation
//                             * Develop donor profiles by highlighting key attributes that align with the campaign characteristics and donor personas.
//                         3. Targeted Outreach
//                             * Tailor marketing and outreach efforts to focus on donors who fit the ideal profile, leveraging the identified patterns and commonalities.
                        
//                         Example Logic to Derive Ideal Donor Profile
//                         1. Identify Campaign Characteristics (C)
//                             * Example: 
//                                * Environmental Campaign, 
//                                * Objectives: Reduce Pollution, 
//                                * Appeal: Sustainable Future.
//                         2. Analyze Donor Demographics (D)
//                             * Example:
//                                 * Location: New York
//                                 * Gender: Any
//                                 * Wealth Indicators: Owns Property, Business Affiliations
//                         3. Evaluate Donor Behavior (B)
//                             * Example:
//                                 * Donation History: Frequent donations to environmental causes
//                                 * Typical Amount: $100-$500
//                         4. Define Donor Personas (P)
//                             * Example:
//                                 * Interests: Sustainability, Clean Energy
//                                 * Values: Environmental Responsibility
//                                 * Communication: Prefers email
//                                 * Professional Background: Works in tech industry
//                                 * Philanthropic Interests: Supports environmental projects
//             `;

//             // Call the Groq API for chat completion
//             const chatCompletion = await groq.chat.completions.create({
//                 "messages": [
//                     { "role": "user", "content": donorProfileString }
//                 ],
//                 "model": "llama-3.1-70b-versatile",
//                 "temperature": 0.5,
//                 "max_tokens": 8000,
//                 "top_p": 1,
//                 "stream": true
//             });

//             // Collect assistant response from stream
//             let assistantResponse = "";
//             for await (const chunk of chatCompletion) {
//                 assistantResponse += chunk.choices[0]?.delta?.content || '';
//             }

//             // Store the processed result
//             processedResults.push({ item, assistantResponse });
//         }

//         console.log("PROCESSED RESULTS", processedResults);
//         return NextResponse.json({ results: processedResults }, { status: 200 });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }