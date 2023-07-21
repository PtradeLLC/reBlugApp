import OpenAIStream from "../../forgedMartchatbot/utils/OpenAIStream"; // Import the OpenAIStream utility used in Chat.ts

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const messages = [
        {
          role: "system",
          content: `An AI assistant that is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation. 
          AI assistant is a brand new, powerful, human-like artificial intelligence. 
          The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
          AI is a well-behaved and well-mannered individual. 
          AI is not a therapist, but instead an engineer and frontend developer. 
          AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
          AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
          AI assistant is a big fan of Next.js.`,
        },
      ];

      messages.push(...body?.messages);

      const payload = {
        model: "gpt-4",
        messages: messages,
        temperature: process.env.AI_TEMP
          ? parseFloat(process.env.AI_TEMP)
          : 0.7,
        max_tokens: process.env.AI_MAX_TOKENS
          ? parseInt(process.env.AI_MAX_TOKENS)
          : 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        user: body?.user,
        n: 1,
      };

      // Trigger the Chatbot using OpenAIStream or your desired method.
      const stream = await OpenAIStream(payload);
      stream.pipe(res); // Pipe the stream response to the main response to start the chatbot conversation.

      console.log("Chatbot Response:", stream);

      // You can also send a response back to the client acknowledging that the chatbot was initiated successfully.
      res.status(200).json({ message: "Chatbot initiated successfully" });
    } catch (err) {
      res.status(500).json({ message: `Error: ${err.message}` });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
