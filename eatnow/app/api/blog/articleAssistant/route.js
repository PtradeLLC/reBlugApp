import { NextResponse } from 'next/server';
const Groq = require("groq-sdk");

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(request, response) {
    try {
        const formData = await request.json();
        const content = formData.content;

        const noviceInfo = `This program uses AI powered tool to help kids learn to write by building compelling blog articles. Kids are taught how to express their thoughts through the power of writing and storytelling.
        Become an Expert: The act of writing forces you to delve deeper into your chosen field, solidifying your knowledge and establishing you as a thought leader.
        Connect with a Community: Blogging fosters a sense of connection. Engage with your readers, build a loyal following, and share your voice with the world.
        Storytelling Simplified: Learn to craft compelling narratives within your chosen niche. ReBlug provides frameworks and templates to structure your blog posts for maximum impact.
        Open Doors to Opportunity: A well-maintained blog can open doors to exciting new possibilities – from freelance writing gigs to brand collaborations.
        No experience? No problem! Go from blank page to brilliant blog with AI-Powered guided step.
        
        Find Your Niche: Feeling overwhelmed by topic choices? We help you discover your niche – that sweet spot where your interests meet an engaged audience.
        Idea Ignition: Spark inspiration with our topic suggestion engine. Never get stuck with writer's block again!
        Storytelling Simplified: Learn to craft compelling narratives within your chosen niche. ReBlug provides frameworks and templates to structure your blog posts for maximum impact.
        Research Like a Pro: Unearth credible sources and learn to weave them seamlessly into your writing, building trust and authority with your readers.
        ReBlug empowers you to:
        
        Write with Confidence: Develop the skills and knowledge to express yourself clearly and effectively.
        Idea Ignition: Spark inspiration with our topic suggestion engine. Never get stuck with writer's block again!
        Storytelling Simplified: Learn to craft compelling narratives within your chosen niche. ReBlug provides frameworks and templates to structure your blog posts for maximum impact.
        Research Like a Pro: Unearth credible sources and learn to weave them seamlessly into your writing, building trust and authority with your readers.
        Find Your Voice: Discover your unique writing style and share your passions with the world.
        Embrace the Journey: Transform from a hesitant beginner to a passionate blogger, one captivating post at a time.

         When responding to the user and providing answer, do the following:
                        1. Provide a concise and informative answer (no more than 50 words) for a given comment.
                        2. Provide answers with credible sources.
                        3. Do not repeat text. 
                        5. If you are uncertain or concerned about your response to a 'comment' or 'question', ask if the user would like to contact human support team.
                        Refer them to the contact page
                        6. If user asks a 'question', respond back with a thoughtful, researched answer, and if user posts a 'comment', respond back with gratitude.
                        7. If user posts a question or comment in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with
                        'Second Person Pronoun" e.g: "How can you craft compelling content for your blog?"
                        8. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can get an accurate response from the support team.

                        Benefits of using ReBlug:
                        Articulate your thoughts
                        Improve article Engagement
                        Monetize your blog through brand collaboration & sponsorships.
                        AI tools for interaction reader engagement.
                        Increase your readership.
                        Minimize technical challenges.

                        ReBlug App:
                        The ReBlug app can be downloaded for user at all the app stores including Apple store, Google Play, Microsoft app store.

                        Pricing:
                        It is free to sign up to use the ReBlug platform. However, premium services require monthly subscription fee as shown on the pricing page.



        `;

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const responseMessage = `You sent: ${content}`;

        try {
            const chatCompletion = await groq.chat.completions.create({
                "messages": [
                    {
                        "role": "user",
                        "content": content
                    },
                    {
                        "role": "assistant",
                        "content": `Use ${noviceInfo} variable as an instruction and context to answer the user`
                    },
                    {
                        "role": "assistant",
                        "content": ""
                    }
                ],
                "model": "llama3-8b-8192",
                "temperature": 1,
                "max_tokens": 1024,
                "top_p": 1,
                "stream": true,
                "stop": null
            });

            let assistantResponse = "";
            for await (const chunk of chatCompletion) {
                assistantResponse += chunk.choices[0]?.delta?.content || '';
            }

            // Ensure that both message and assistantResponse are sent back
            return NextResponse.json({ message: responseMessage, assistantResponse });
        } catch (error) {
            console.error('Error during Groq chat completion:', error);
            throw new Error('Failed to complete chat with assistant');
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.error();
    }
}