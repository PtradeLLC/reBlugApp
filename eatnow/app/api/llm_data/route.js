import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Groq from 'groq-sdk';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const prisma = new PrismaClient();

export async function POST(req) {
    const groq = new Groq({ apiKey: GROQ_API_KEY });
    try {
        const data = await req.json();

        console.log("USER TextData:", data.textData);
        console.log("USER Question:", data.userQuestion);

        // Conceptual formula for generating the 'Ideal Donor Profile'
        const idealDonorProfile = 'C1 + C2 + C3 + D1 + D2 + B1 + B2 + P1 + P2 + P3 + P4 + P5 + P6';

        // Prepare the context for the LLM based on extracted data
        const contextString = `
        Task:           
        Analyze and respond to user questions about the campaign based on the provided data. If needed, use
        ${idealDonorProfile} as the formula to derive and answer questions on the 'Ideal Donor' for the campaign.

        Campaign Data:
         ${JSON.stringify(data.textData)}

        User's Question:
         ${data.userQuestion}

        <Instruction>
        
1. Thoroughly analyze the campaign data provided, including but not limited to:
   - Demographic information (age, gender, location, income level)
   - Past donation history (frequency, amounts, causes supported)
   - Engagement metrics (event attendance, volunteer history, email open rates)
   - Personal interests and affiliations

2. Identify key patterns and trends in the data that correlate with higher donation likelihood or amounts.

3. Utilize statistical methods to rank potential donors based on their likelihood to contribute to the specific cause or campaign.

4. Consider external factors that might influence donation behavior, such as:
   - Current economic conditions
   - Seasonal giving patterns
   - Recent events related to the cause

5. Segment the donor pool into distinct categories based on their characteristics and potential value to the campaign.

6. Provide a detailed profile of the ideal donor(s) most likely to contribute, including:
   - Key demographic traits
   - Behavioral indicators
   - Motivational factors
   - Preferred communication channels

7. Suggest personalized engagement strategies for each donor segment or high-value individuals.

8. Identify any gaps in the provided data that, if filled, could improve the accuracy of the analysis.

9. Answer the user's specific questions based on the information in the campaign data and your analysis.

10. If a question cannot be answered with the given information, clearly state this and explain what additional data would be needed to provide an accurate response.

11. Offer actionable recommendations for targeting and approaching the identified ideal donors.

12. Provide a concise summary of key findings and a more detailed breakdown for those seeking in-depth information.

13. Present the information in a clear, well-structured format using appropriate headings, bullet points, and data visualizations where applicable.

14. Include confidence levels or margins of error for any predictive statements or recommendations made.

15. Suggest methods for testing and refining the donor targeting strategy based on the analysis.

16. Highlight any ethical considerations or best practices for donor engagement and data usage.

17. Offer insights on potential return on investment (ROI) for different donor engagement strategies.

18. Provide context on how the analyzed data and recommendations compare to industry benchmarks or similar campaigns, if such information is available.

         </Instruction>
        `;

        // Use the Groq API to generate a response
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: contextString
                },
                {
                    role: "user",
                    content: data.userQuestion
                }
            ],
            model: "llama-3.2-90b-text-preview",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        const assistantResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        return NextResponse.json(
            {
                assistantResponse: assistantResponse,
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
