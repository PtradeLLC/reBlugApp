import { Configuration, OpenAIApi, StreamingTextResponse } from "openai-edge";
import { OpenAIStream } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  // Check if the request's Content-Type header is application/json
  if (
    !req.headers ||
    !req.headers["content-type"].startsWith("application/json")
  ) {
    res.status(400).end("Request body must be JSON");
    return;
  }

  try {
    // Parse the request body as JSON
    const { messages } = await req.body;

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });
    // Convert the response into a friendly text-stream
    const stream = StreamingTextResponse.OpenAIStream(response);
    // Respond with the stream
    res.setHeader("Content-Type", "text/plain");
    stream.pipe(res);
  } catch (error) {
    res.status(500).end(error.message || error.toString());
  }
}
