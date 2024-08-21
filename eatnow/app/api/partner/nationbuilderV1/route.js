// app/api/getNiche/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        let data = await req.json();

        const idealDonorProfile = `(Geographic Fit×Target Donor Type×Gender Alignment×Intention)+(Wealth Indicator×Funding Goals)+(Donor Motivations×Behavior×Skills and Expertise)+(Seasonal Trends×Upcoming Events)+(Problem Alignment×Supporters and Influencers×Unique Aspects)`;

        // If data is not an array, convert it to one
        if (!Array.isArray(data)) {
            data = [data];
        }

        const processedResults = [];

        for (const item of data) {
            const groq = new Groq({ apiKey: GROQ_API_KEY });

            if (typeof item !== 'object') {
                return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
            }

            const definitions = `
            {
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
            }
            `;

            const donorProfileString = `
            Task: Develop Ideal Donor Profile.

            Objective:

            Identify and derive an 'Ideal Donor Profile' based on provided data to optimize fundraising for a given Cause.

            Data:

            data: Initial data about the Cause and its target audience.
            Process:

            Data Understanding:

            Analyze ${JSON.stringify(item)} to comprehend campaign goals, objectives, and available data points.
            Identify relevant data points within ${JSON.stringify(item)} to construct the 'Ideal Donor Profile'.
            Baseline Profile Creation:

            Structure a baseline profile using data from ${JSON.stringify(item)} in the following format:
            campaign_details: {name, about, goals, objectives}
            target_demographics: {gender, age, wealth}
            location: {city, state, country}
            
            Ideal Donor Profile Development:

            Employ data science techniques to analyze ${JSON.stringify(item)} and create an 'Ideal Donor Profile'.
            Utilize ${definitions} for data clarification.
            Consider using the provided ${idealDonorProfile} formula if applicable.
            Provide actionable recommendations and strategies based on the derived profile.
            
            Output:

            A detailed 'Ideal Donor Profile' outlining characteristics of potential high-value donors.
            Data-driven recommendations for targeting and engaging identified donor segments.
            
            Additional Considerations:

            Prioritize data quality and consistency.
            Explore advanced data analysis techniques as needed.
            Continuously refine the 'Ideal Donor Profile' based on campaign performance.
            
            Note: Specific data points and desired output format may vary depending on the project. Please provide additional details if necessary.
            `;

            // Call the Groq API for chat completion
            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    { "role": "user", "content": donorProfileString }
                ],
                "model": "llama-3.1-70b-versatile",
                "temperature": 0.5,
                "max_tokens": 8000,
                "top_p": 1,
                "stream": true
            });

            // Collect assistant response from stream
            let assistantResponse = "";
            for await (const chunk of chatCompletion) {
                assistantResponse += chunk.choices[0]?.delta?.content || '';
            }

            // Store the processed result
            processedResults.push({ item, assistantResponse });
        }

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}