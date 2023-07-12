import { AutoGPT } from "langchain/experimental/autogpt";
import { ReadFileTool, WriteFileTool, SerpAPI } from "langchain/tools";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { InMemoryFileStore } from "langchain/stores/file/in_memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
// import { PrismaClient } from "@prisma/client";
import { HuggingFaceInference } from "langchain/llms/hf";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
import { VectorStoreQATool } from "langchain";
import { NodeFileStore } from "langchain/stores/file/node";
import pgvector from "pgvector/utils";

// Configure hugging face embedding
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY_WRITE,
});
// Hugging face model
const model = new HuggingFaceInference({
  model: "gpt2",
  apiKey: process.env.HUGGINGFACEHUB_API_KEY_WRITE,
});
const res = await model.call("1 + 1 ="); // For testing

// Global variables
const store = new NodeFileStore();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY;
const SERPER_API_KEY = process.env.SERPER_API_KEY;

// initializing prismaClient
// const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // local variables;
    const { product } = req.body;
    let trendsResult = {};

    // Initialize the VectorStoreQATool
    const baseProjectUrl = await fetch(
      "https://console.neon.tech/api/v2/projects?limit=17",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Bearer o1p1xwqrfu0uvwrg7lxfdx40sa5994ff2k0bis8xqlgvdxdws50j2cifrv5qe033",
        },
      }
    );

    const projectResponse = await baseProjectUrl.json();
    const projectUrl = projectResponse[0].url; // get the url of the first project

    const vectorStoreQATool = new VectorStoreQATool({
      vectorStoreUrl: projectUrl,
      apiKey: process.env.NEON_API_KEY,
    });

    // Retrieve relevant documents from the vector store
    const retrievedDocuments = await vectorStoreQATool.retrieveDocuments(
      "query"
    );

    // Answer a question based on the retrieved documents
    const question = "What is the answer to my question?";
    const answer = await vectorStoreQATool.answerQuestion(
      question,
      retrievedDocuments
    );

    // handling GET request
    if (req.method === "GET") {
      try {
        // Get files from database
        // let files = await prisma.forgedAI.findUnique({
        //   where: {
        //     id: "805e3bad-6be7-4083-bad7-2eb8044635f5",
        //   },
        //   select: {
        //     title: true,
        //     content: true,
        //   },
        // });

        // sanitizing files by removing or escaping special characters
        if (typeof files === "string") {
          try {
            files = JSON.parse(files);
          } catch (error) {
            console.error("Error while parsing string to JSON:", error);
          }
        }

        if (typeof files === "object") {
          const stringifiedFiles = {};
          for (let key in files) {
            stringifiedFiles[key] = files[key].toString();
          }
          trendsResult = stringifiedFiles;
        } else {
          console.log("The value of files is not an object.");
        }

        res.status(200).json({ message: trendsResult });
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
