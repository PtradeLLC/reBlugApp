import {
    MistralAI,
    Document,
    serviceContextFromDefaults,
    ObjectIndex,
    QueryEngineTool,
    SimpleNodeParser,
    SimpleToolNodeMapping,
    SummaryIndex,
    VectorStoreIndex,
    storageContextFromDefaults,
    MistralAIEmbedding,
    ReActAgent
} from "llamaindex";
import fs from "node:fs/promises";
import path from "path";

async function main() {
    try {
        const mistralEmbedModel = new MistralAIEmbedding({
            apiKey: process.env.MISTRAL_AI_API_KEY,
        });

        const filePath = "node_modules/llamaindex/examples/abramov.txt";
        const essay = await fs.readFile(filePath, "utf-8");

        // Create an instance of the LLM
        const mistralLLM = new MistralAI({ model: "mistral-small" });

        // Create a service context
        const serviceContext = serviceContextFromDefaults({ llm: mistralLLM });

        const document = new Document({ text: essay, id_: "essay" });

        // Load and index documents
        const index = await VectorStoreIndex.fromDocuments([document], {
            serviceContext,
        });

        // Get retriever
        const retriever = index.asRetriever();

        // Create a query engine
        const queryEngine = index.asQueryEngine({ retriever });

        const query = "What is the meaning of life?";

        // Query
        const response = await queryEngine.query({ query });

        // Log the response
        console.log(response.response);

        return { message: 'successful' };
    } catch (error) {
        console.error("An error occurred:", error);
        return { error: error.message };
    }
}

export default async function handler(req, res) {
    const result = await main();
    res.status(200).json(result);
}

