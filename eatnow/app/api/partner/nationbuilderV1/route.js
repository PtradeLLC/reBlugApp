// app/api/getNiche/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.json();

        // Validate input
        if (!data || typeof data !== 'object') {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        // Instruction template
        const idealDonorProfile = `(Geographic Fit×Target Donor Type×Gender Alignment×Intention)+(Wealth Indicator×Funding Goals)+(Donor Motivations×Behavior×Skills and Expertise)+(Seasonal Trends×Upcoming Events)+(Problem Alignment×Supporters and Influencers×Unique Aspects)`
        const donorProfile = `${data}
          <Instruction>
          ${donorProfile} is data collected from an organization looking to raise money for a Cause. 
          The data is an object with data points that will help identify and derive 'Idea Donor Profile' 
          for the Cause or campaign. 'Ideal Donors' are individuals that are most likely to donate money to
          the Cause.
          To identify and derive 'Ideal Donors' you'll need to go through multiple steps involving step-by-step thinking.

          I want you to act as an experienced Data Scientist, and it will be your job to 
          provide actionable recommendations and strategies for identifying and deriving 'Ideal Donor Profile' based on provided ${donorProfile} data.

          1. Analyze the ${donorProfile} data to understand the goals and objectives of the campaign.
         
          2. Use the data points to from the ${donorProfile} to create a baseline profile such as
          'Campaign details (name, about, goals and objectives)', 'Target donor demographics (gender, age, wealth)',
          and 'Location' in the following format:

          {
          Campaign: {
          name: "",
          about:"",
          goals_objectives: "",
          },
          target_demographics: {
          gender: "",
          age: "",
          wealth: {
          low_netWorth: "",
          low_to_medium: "",
          mid_netWorth: "",
          medium_to_high: "",
          high_netWorth: "",
          }
          },
          location: {
          country: "",
          state: "",
          city:""
          }
          }
          </Instruction>

          Based on the 'goals and objectives' of each Cause, use the ${idealDonorProfile} as a formula to form a 
          logic for deriving profile for an 'Ideal Donor' where each key/value pair can be assigned a 'weight' based on 
          its importance for the campaign. These 'weights' can be adjusted based on data 
          and insights, allowing for dynamic donor profiling. Prioritize donors with the highest overall score 
          from the above formula.

          <Instruction>
          Segment donors based on specific criteria:

          1. Wealth
          2. Geographic location to the campaign.
          3. Gender
          4. Age
          5. Interests and motivations
          </Instruction>

          <Instruction>
          Employ predictive modeling to forecast future donor behavior and campaign outcomes.
          Based on predictive insights, develop actionable strategies to improve future campaigns. 
          This involves recommending specific actions to enhance donor engagement and retention.
          </Instruction>

          Once the Ideal Donor Profile has been accurately defined, return the results in two formats.

          <Instruction>
          networthOption: {
          1: "High",
          2: "Medium to High",
          3: "Low to Medium,
          4: "Low"
          }

          gender: {
          gender_01: male,
          gender_02: female
          }

          Return the results in these formats
          1. Comprehensive.
          2. Non-comprehensive.

          Non-comprehensive format:
          "Ideal Donors for this campaign are ${networthOption} net worth individual(s), ${gender_01} living in ${location},
          also ${networthOption} net worth individual(s), ${gender_02} living in ${location} are ideal to donate to the campaign".

          Comprehensive format:
          Write a comprehensive, professional report involved in the process and findings. Include data points that plays key
          factors in accurately predicting an Ideal Donor in your report.

          Based on the data, analysis, and findings, propose a campaign strategy.
          </Instruction>
          `;

        const groq = new Groq({ apiKey: GROQ_API_KEY });

        // Step 1: Data Collection and Organization
        // Consolidate Data: Gather all survey responses and external data sources into a centralized database. Ensure data is clean, well-organized, and up-to-date.
        // Segment Data: Categorize data into relevant sections such as demographics, donor behavior, and campaign strategies. This will facilitate targeted analysis and strategy development.

        // Step 2: Data Analysis
        // Descriptive Analytics: Use descriptive analytics to understand past campaign performance and donor behavior. This involves visualizing trends and patterns from the data to get a clear picture of what has worked previously.
        // Diagnostic Analytics: Analyze why certain campaigns succeeded or failed. This helps in identifying factors that influenced donor engagement or disengagement.
        // Predictive Analytics: Employ predictive modeling to forecast future donor behavior and campaign outcomes. This can help in identifying potential donors and optimizing campaign strategies for better results.
        // Prescriptive Analytics: Based on predictive insights, develop actionable strategies to improve future campaigns. This involves recommending specific actions to enhance donor engagement and retention.

        // Step 3: Strategy Development
        // Target Audience Segmentation: Use data to segment the target audience based on demographics, behavior, and preferences. Tailor campaigns to each segment to increase relevance and engagement.
        // Personalized Communication: Develop personalized communication strategies using insights from donor demographics and preferences. This includes customizing email and social media strategies to align with donor interests and communication preferences.
        // Donor Retention Strategies: Analyze donor retention rates and identify reasons for donor attrition. Develop strategies to improve retention, such as personalized follow-ups and appreciation messages.

        // Step 4: Campaign Execution
        // Implement Strategies: Launch campaigns based on the developed strategies. Ensure that all communication and engagement efforts are aligned with the insights gained from data analysis.
        // Monitor and Adjust: Continuously monitor campaign performance using real-time data analytics. Be prepared to adjust strategies based on ongoing analysis and feedback.

        // Step 5: Post-Campaign Evaluation
        // Evaluate Outcomes: After the campaign, conduct a thorough evaluation of its performance. Compare actual outcomes with predicted results to assess the effectiveness of strategies.
        // Learn and Iterate: Use insights from the evaluation to refine future campaigns. This iterative process helps in continuously improving fundraising efforts.


        const baselineProfile = {
            campaignName: "",
            about: "",
            goals: "",
            objectives: "",
            targetDonorDemographics: {
                geoLocation: "",
                gender: "",
                age: "",
                wealth: "",
                donorSegmentation: {
                    characteristics: "",
                    givingPatterns: {
                        givingHistory: {
                            donationAmounts: [],
                            donationFrequency: "",
                            preferredCauses: [],
                        }
                    },
                    trends: "",
                    commonalities: "",
                },
                donorPersonas: {
                    interests: "",
                    values: "",
                    motivations: "",
                    communicationPreferences: {
                        email: "",
                        phone: "",
                        events: "",
                        socialMedia: ""
                    },
                    professionalBackground: {
                        industry: "",
                        job: "",
                        jobTitle: "",
                        companySize: "",
                    },
                    philanthropicInterests: {
                        causes: "",
                        projects: "",
                    },
                    politicalAffiliation: {
                        party: ""
                    },
                    wealthIndicators: {
                        propertyOwnership: "",
                        businessAffiliations: "",
                        stockHoldings: ""
                    },
                },
                predictiveModelForeCast: {
                    key: {
                        mostLikely: "",
                        leastLikely: ""
                    },
                    key: {
                        mostLikely: "",
                        leastLikely: ""
                    },
                    key: {
                        mostLikely: "",
                        leastLikely: ""
                    }
                }
            }
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "user", data: data },
                { role: "assistant", data: `Use ${data} variable as an instruction and context to answer the user` }
            ],
            model: "llama3-70b-8192",
            temperature: 0.5,
            max_tokens: 8192,
            top_p: 1,
            stream: true,
            stop: null
        });

        let assistantResponse = "";
        for await (const chunk of chatCompletion) {
            assistantResponse += chunk.choices[0]?.delta?.content || '';
        }

        return new Response(JSON.stringify({ message: responseMessage, assistantResponse }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        // Ensure Prisma disconnects to prevent connection leaks
        await prisma.$disconnect();
    }
}
