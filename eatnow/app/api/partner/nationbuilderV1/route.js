// app/api/getNiche/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';
import attr from '../../../attributes.json'

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        let data = await req.json();

        // const idealDonorProfile = `(Geographic Fit×Target Donor Type×Gender Alignment×Intention)+(Wealth Indicator×Funding Goals)+(Donor Motivations×Behavior×Skills and Expertise)+(Seasonal Trends×Upcoming Events)+(Problem Alignment×Supporters and Influencers×Unique Aspects)`;
        const idealDonorProfile = `(Age Score * 10) + (Income Score * 20) + (Wealth Score * 15) +(Disposable Income Score * 15) + (Liquid Assets Score * 10) +(Home Ownership Score * 5) + (Mail Purchases Score * 5) +(Potential Investor Score * 10) + (Registered Voter Score * 5) +(Email Deliverability Score * 5)`;

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

            //Description of Formula data point attributes
            const Description = attr.filter(att => typeof att.Description === 'string' && att.Description.trim() !== '');

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

            Your task and goal is to derive 'Ideal Donor Profile' dynamically based on provided data to optimize fundraising for a given Cause.

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
            Utilize ${definitions} for input data clarification from the user.
            
            Consider using the provided ${idealDonorProfile} formula if applicable.
            Provide actionable recommendations and strategies based on the derived profile.

            By using a weighted scoring system based on the most relevant attributes from the provided ${attr} data,
            follow the following steps to derive an Ideal Donor for any given campaign:

1. Attributes:
    * Age (age)
    * Estimated Income (family.estimated_income)
    * Estimated Wealth (family.estimated_wealth)
    * Estimated Disposable Income (family.estimated_disposable_income)
    * Estimated Liquid Assets (family.estimated_liquid_assets)
    * Home Ownership (family.home_owner or family.estimated_home_owner)
    * Mail Purchases (family.mail_purchases)
    * Potential Investor (family.potential_investor)
    * Registered Voter (registered_voter)
    * Email Deliverability (emails.deliverable)

2. Assign weights to each attribute (total should equal 100):
    * Age: 10
    * Estimated Income: 20
    * Estimated Wealth: 15
    * Estimated Disposable Income: 15
    * Estimated Liquid Assets: 10
    * Home Ownership: 5
    * Mail Purchases: 5
    * Potential Investor: 10
    * Registered Voter: 5
    * Email Deliverability: 5

    3. Create scoring criteria for each attribute:
    * Age: 5 points if 50-70, 3 points if 40-49 or 71-80, 1 point otherwise
    * Estimated Income: 5 points for top 20%, 3 points for next 30%, 1 point otherwise
    * Estimated Wealth: 5 points for top 20%, 3 points for next 30%, 1 point otherwise
    * Estimated Disposable Income: 5 points for top 20%, 3 points for next 30%, 1 point otherwise
    * Estimated Liquid Assets: 5 points for top 20%, 3 points for next 30%, 1 point otherwise
    * Home Ownership: 5 points if true, 0 if false
    * Mail Purchases: 5 points if true, 0 if false
    * Potential Investor: 5 points if true, 0 if false
    * Registered Voter: 5 points if true, 0 if false
    * Email Deliverability: 5 points if true, 0 if false


4. Formula: Ideal Donor Score = (Age Score * 10) + (Income Score * 20) + (Wealth Score * 15) +(Disposable Income Score * 15) + (Liquid Assets Score * 10) +(Home Ownership Score * 5) + (Mail Purchases Score * 5) +(Potential Investor Score * 10) + (Registered Voter Score * 5) +(Email Deliverability Score * 5)

5. Interpretation:
    * Maximum possible score: 500
    * Ideal Donor Threshold: Set a cutoff score (e.g., 400) to identify ideal donors

To implement this formula:
1. Calculate the score for each attribute based on the scoring criteria.
2. Multiply each attribute score by its weight.
3. Sum all weighted scores to get the Ideal Donor Score.
4. Compare the score to your set threshold to identify ideal donors.

If the Ideal Donor Score is above the threshold of 400, it indicates that the individual is considered an ideal donor prospect for your nonprofit organization. 

This high score suggests that the person possesses a combination of attributes that make them more likely to be a valuable supporter. Here's what this means and how you should proceed:
Priority targeting: These individuals should be given priority in your fundraising and outreach efforts. They represent your best prospects for donations and long-term support.

Personalized approach: Develop a tailored communication strategy for these high-scoring donors. Use the information from their profile to create personalized messages that resonate with their interests and giving capacity.

Major gift potential: Donors with scores above 400 may be candidates for major gifts. Consider assigning them to your major gifts team for more focused cultivation.

Stewardship focus: Invest more resources in stewarding these donors. This could include personalized thank-you notes, exclusive event invitations, or one-on-one meetings with organizational leadership.

Engagement opportunities: Offer these donors more ways to engage with your organization beyond just giving money. This could include volunteer opportunities, advisory roles, or involvement in special projects.

Recurring giving programs: Encourage these high-scoring donors to consider recurring giving options, as they are more likely to have the financial capacity for sustained support.

Peer-to-peer potential: These donors may be good candidates for peer-to-peer fundraising initiatives, as they likely have networks of similarly positioned individuals.

Data refinement: Use the information from these high-scoring donors to refine ideal donor profile further. Look for common characteristics among best prospects to improve future targeting.

ROI tracking: Monitor the return on investment from your outreach to these high-scoring donors. This will help you validate and improve scoring model over time.

Cross-channel engagement: Utilize multiple communication channels (email, direct mail, phone, social media) to reach these valuable prospects, as they are worth the extra effort to connect.

Remember, while a high score indicates strong potential, it's still important to approach each donor as an individual. Use the score as a guide for prioritization, but always tailor the approach based on the specific interests, motivations, and preferences of each donor.

The above ${idealDonorProfile} formula provides a quantitative method to identify ideal donors based on the most relevant attributes. You can adjust the weights and scoring criteria based on your organization's specific needs and historical data on successful donors.
Remember to regularly update and refine this formula based on the performance of your fundraising campaigns and new insights gained from donor interactions.
            
            Output:

            A detailed 'Ideal Donor Profile' outlining characteristics of potential high-value donors.
            Data-driven recommendations for targeting and engaging identified donor segments.
            
            Additional Considerations:

            Prioritize data quality and consistency.
            Explore advanced data analysis techniques as needed.
            Continuously refine the 'Ideal Donor Profile' based on campaign performance.
            
            Note: Specific data points and desired output format may vary depending on the project. Please provide additional details if necessary.

            The following is an example of a campaign that is fundraising for 'Children of Grace'.

            Example:

            Based on the provided data, We will derive an 'Ideal Donor Profile' for the campaign.

**Data Understanding:**

The campaign aims to lift vulnerable children out of poverty by providing education, medical aid, and mentorship. The campaign targets Gen X and Baby Boomers, with a focus on both males and females. The campaign has a strong online presence, with social media outreach and email marketing.

**Baseline Profile Creation:**

Based on the provided data, I will create a baseline profile for the campaign:

* **Campaign Details:**
+ Name: Children of Grace
+ About: The campaign aims to lift vulnerable children out of poverty by providing education, medical aid, and mentorship.
+ Goals: To empower children to overcome and discover their potential.
+ Objectives: To provide education, medical aid, and mentorship to vulnerable children.
* **Target Demographics:**
+ Gender: Male and Female
+ Age: Gen X and Baby Boomers
+ Wealth: Middle to upper-middle class
* **Location:**
+ City: Buchanan
+ State: GB
+ Country: LR

**Ideal Donor Profile Development:**

Using the provided data and the weighted scoring system, I will derive an 'Ideal Donor Profile' for the campaign:

* **Attributes:**
+ Age: 50-70 (5 points)
+ Estimated Income: Top 20% (5 points)
+ Estimated Wealth: Top 20% (5 points)
+ Estimated Disposable Income: Top 20% (5 points)
+ Estimated Liquid Assets: Top 20% (5 points)
+ Home Ownership: True (5 points)
+ Mail Purchases: True (5 points)
+ Potential Investor: True (5 points)
+ Registered Voter: True (5 points)
+ Email Deliverability: True (5 points)
* **Ideal Donor Score:** 450

**Interpretation:**

Based on the 'Ideal Donor Profile', the campaign should target individuals who are:

* Between 50-70 years old
* Have a high estimated income and wealth
* Have a high estimated disposable income and liquid assets
* Are homeowners
* Have made mail purchases
* Are potential investors
* Are registered voters
* Have a deliverable email address

These individuals are likely to be middle to upper-middle class, with a strong financial capacity to support the campaign. They are also likely to be interested in education and children's welfare, making them a good fit for the campaign.

**Actionable Recommendations:**

1. **Priority Targeting:** Target individuals who match the 'Ideal Donor Profile' with personalized communication and outreach efforts.
2. **Major Gift Potential:** Consider assigning these individuals to the major gifts team for more focused cultivation.
3. **Stewardship Focus:** Invest more resources in stewarding these donors, including personalized thank-you notes and exclusive event invitations.
4. **Engagement Opportunities:** Offer these donors more ways to engage with the organization, including volunteer opportunities and advisory roles.
5. **Recurring Giving Programs:** Encourage these donors to consider recurring giving options, as they are more likely to have the financial capacity for sustained support.

**Additional Considerations:**

1. **Data Quality and Consistency:** Prioritize data quality and consistency to ensure accurate targeting and engagement.
2. **Advanced Data Analysis Techniques:** Explore advanced data analysis techniques, such as machine learning and predictive modeling, to further refine the 'Ideal Donor Profile'.
3. **Continuous Refinement:** Continuously refine the 'Ideal Donor Profile' based on campaign performance and new insights gained from donor interactions.

**Donor Personas:**

Based on the 'Ideal Donor Profile', we can create the following donor personas:

* **Persona 1:** "The Philanthropic Investor"
+ Age: 55-65
+ Estimated Income: $150,000+
+ Estimated Wealth: $1 million+
+ Estimated Disposable Income: $50,000+
+ Estimated Liquid Assets: $200,000+
+ Home Ownership: True
+ Mail Purchases: True
+ Potential Investor: True
+ Registered Voter: True
+ Email Deliverability: True
* **Persona 2:** "The Educated Advocate"
+ Age: 50-60
+ Estimated Income: $100,000+
+ Estimated Wealth: $500,000+
+ Estimated Disposable Income: $30,000+
+ Estimated Liquid Assets: $100,000+
+ Home Ownership: True
+ Mail Purchases: True
+ Potential Investor: True
+ Registered Voter: True
+ Email Deliverability: True

These donor personas can be used to guide communication and outreach efforts, as well as to inform the development of targeted marketing campaigns.

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