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

            console.log("ITEM:", item);

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


 Lastly, in addition to a comprehensive report from the above instructions, breakdown the various characteristics of the Ideal Donor into key/value pair, specifying the data points (age_range, target demographic, gender, geoLocation, recommendations, and other important key/value pair as you see fit) shown in the example below:

 EXAMPLE:
 
 Based on the provided data, the 'Ideal Donor Profile' for the "Star Basketball Team" campaign can be structured as follows:\n +
      '\n' +
      'Campaign Details:\n' +
      '- Name: "Star Basketball Team"\n' +
      '- About: "The campaign is to raise money for a basket ball team for gym repairs, equipment purchase, and other items to boost team morale"\n' +
      '- Goals and Objectives: "Develop team morale and self-esteem among players"\n' +
      '\n' +
      'Target Donor Demographics:\n' +
      '- Gender: Male\n' +
      '- Age: Gen Z\n' +
      '- Wealth: Not indicated\n' +
      '- Location: Alexandria, IN, US\n' +
      '\n' +
      'Ideal Donor Profile:\n' +
      '- Interests: Basketball, youth development, sports equipment\n' +
      '- Values: Teamwork, community support, youth development\n' +
      '- Motivations: Free tickets to games, supporting local sports teams\n' +
      '- Communication Preferences: Email, social media\n' +
      '- Professional Background: Sports industry, coaching, sports management\n' +
      '- Philanthropic Interests: Youth sports development, community support, sports equipment\n' +
      '- Political Affiliation: Not indicated\n' +
      '- Wealth Indicators: Property ownership, business affiliations, stock holdings\n' +
      '\n' +
      'Recommendations and Strategies:\n' +
      '1. Utilize email and social media to target potential donors, focusing on Gen Z males interested in basketball and youth development.\n' +
      '2. Highlight the unique aspect of free tickets to games as a key motivation for donors.\n' +
      '3. Engage local sports influencers and coaches as supporters to increase visibility and credibility of the campaign.\n' +
      '4. Identify potential donors with interests in youth sports development, community support, and sports equipment.\n' +
      '5. Leverage upcoming championship games to create urgency and encourage donations.\n' +
      '6. Consider implementing recurring giving strategies to increase donor retention and overall funding goals.'

            
      '{\n' +
      '  "ideal_donor_profile": {\n' +
      '    "demographics": {\n' +
      '      "age_range": [18, 25],\n' +
      '      "income_level": "middle",\n' +
      '      "education": "high_school"\n' +
      '    },\n' +
      '    "interests": ["sports", "community"],\n' +
      '    "behavior": {\n' +
      '      "donation_history": "new_donor",\n' +
      '      "engagement": "medium"\n' +
      '    },\n' +
      '    "location": {\n' +
      '      "urban_density": "medium"\n' +
      '    }\n' +
      '  },\n' +
      '  "recommendations": [\n' +
      '    "Target Gen Z males with personalized campaigns.",\n' +
           "Implement social media campaigns to leverage the 'free tickets to games' unique aspect.",\n +
      '    "Prioritize email outreach channels based on donor preferences."\n' +
      '  ]\n' +
      '}'
            `;

            // Call the Groq API for chat completion
            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    { "role": "user", "content": donorProfileString }
                ],
                "model": "llama3-groq-70b-8192-tool-use-preview",
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

        console.log(processedResults);

        return NextResponse.json({ results: processedResults }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
