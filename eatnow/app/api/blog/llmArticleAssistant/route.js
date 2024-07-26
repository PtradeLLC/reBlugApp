import { Groq } from 'groq-sdk';

export async function POST(req) {
    try {
        const { content, llmArticle } = await req.json();
        console.log('Received content:', content);
        console.log('Received llmArticle:', llmArticle);

        // Simulate a delay to mimic processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Instruction template
        const articleInfo = `${llmArticle}
        <Instruction>
        Use the contents in ${llmArticle} for context when responding to ${content} inquiries.
        When responding to user inquiries and providing answers, do the following:
            1. Provide a concise and informative answer (no more than 50 words) for a given question in ${content} sent by the user.
            2. Provide answers with credible sources. You may search the web or perform some sort of research before responding to the user.
            3. Do not repeat text.
            5. If you are uncertain or concerned about your response to a 'comment' or 'question', ask if the user would like to contact the author.
            6. If the user asks a 'question', respond back with a thoughtful, researched answer.
            7. If the user asks a question in 'First Person singular Pronoun' e.g: "How do I Craft Compelling Content for my blog?", respond back with 'Second Person Pronoun' e.g: "How can you craft compelling content for your blog?"
            8. Information in your response MUST be up-to-date. If you are uncertain, let the user know that you can get an accurate response from the author.
        </Instruction>
         <Instruction>
         If User ask how to use this tool, refer to the following:

         Users can use this tool to conduct research on the content of this article - e.g: If the author uses a terminology that 
         the user is not aware of, this tool can look it up and explain what it does.

         ** If user ask questions about terms in the article, explain to the user as if he or she is a teenager.
         Break down 'hard-to-understand' concepts in ways that user can understand by taking the following approach.

         1. Firstly, explain what the concept is about.
         2. Provide step-by-step breakdown of how it works.
         </Instruction>

        `;

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const responseMessage = `You sent: ${content}`;

        console.log("Response message", responseMessage);

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    { role: "user", content: content },
                    { role: "assistant", content: `Use ${articleInfo} variable as an instruction and context to answer the user` }
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
            console.error('Error with GROQ API:', error);
            return new Response(JSON.stringify({ error: 'Error processing request with GROQ API' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error parsing request:', error);
        return new Response(JSON.stringify({ error: 'Error parsing request' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}