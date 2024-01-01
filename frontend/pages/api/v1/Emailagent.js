import { Client } from 'superagi-client';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { TextLoader } from 'langchain/document_loaders/fs/text';
// import { DeepLake } from 'langchain/vectorstores'; 
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });  // Specify the destination folder for file uploads

export default upload.single('knowledgeBaseFile')(async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { originalname, path: filePath } = req.file;
            console.log('File uploaded:', originalname);

            // The rest of your code for processing the file goes here

            // For example, use the file path for text loading
            // const documents = TextLoader(filePath).load();

            // // Split text into chunks
            // const textSplitter = new CharacterTextSplitter({
            //     chunk_size: 1000,
            //     chunk_overlap: 0,
            // });
            // const docs = textSplitter.split_documents(documents);

            // // Create DeepLake instance with OpenAIEmbeddings
            // const db = DeepLake.from_documents({
            //     documents: docs,
            //     dataset_path: 'hub://publictrades/text_embedding',
            //     embedding: new OpenAIEmbeddings(),
            // });

            // ... rest of your code ...

            // Don't forget to handle cleanup (e.g., deleting the temporary file) if needed
            fs.unlinkSync(filePath);

            res.status(200).json({ message: 'File uploaded and processed successfully.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
});




// import { Client } from 'superagi-client';
// import { HuggingFaceEmbeddings } from 'langchain/embeddings/hf';
// import { OpenAI } from "langchain/llms/openai";
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { CharacterTextSplitter } from 'langchain/text_splitter';
// import { TextLoader } from 'langchain/document_loaders/fs/text';
// import { SerpAPI, ChainTool } from "langchain/tools";
// // import { DeepLake } from 'langchain/vectorstores';
// import { Calculator } from "langchain/tools/calculator";
// import { PrismaClient } from '@prisma/client';
// import * as fs from "fs";
// import multer from 'multer';

// const prisma = new PrismaClient();
// const upload = multer();




// export default upload.single('knowledgeBaseFile')(async function handler(req, res) {

//     if (req.method === "POST") {

//         const formDataObject = req.body;
//         console.log("FormData from EmailAGENT", formDataObject);

//         try {
//             // process.env.OPENAI_API_KEY = '<OPENAI_API_KEY>';
//             const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//             const ACTIVELOOP_TOKEN = process.env.ACTIVELOOP_TOKEN;

//             const sourceTextPath = '<path_to_text_for_embedding>';
//             // Example sourceTextPath below. Note that file loading may differ in a browser environment.
//             // const sourceTextPath = 'paul_graham_essay.txt';

//             const datasetPath = 'hub://publictrades/text_embedding';

//             // Load documents from text file
//             const documents = TextLoader(sourceTextPath).load();

//             // Split text into chunks
//             const textSplitter = new CharacterTextSplitter({
//                 chunk_size: 1000,
//                 chunk_overlap: 0,
//             });
//             const docs = textSplitter.split_documents(documents);

//             // Create DeepLake instance with OpenAIEmbeddings
//             const db = DeepLake.from_documents({
//                 documents: docs,
//                 dataset_path: datasetPath,
//                 embedding: new OpenAIEmbeddings(),
//             });


//             // initialize SuperAGI
//             const client = new Client({
//                 apiKey: process.env.SUPER_AGI_KEY,
//             });

//             // Import AgentConfig
//             const { AgentConfig } = require('superagi-client');

//             // Create an AgentConfig
//             const agentConfig = new AgentConfig({
//                 name: "Email Conversational Tool",
//                 description: "A detailed description outlining the purpose of the agent.",
//                 goal: ["List specific tasks for the agent"],
//                 instruction: ["List any guiding instructions for the agent"],
//                 agentWorkflow: "Goal Based Workflow",
//                 constraints: [],
//                 tools: [{ name: "Knowledge Search Toolkit" }, { name: "Image Generation Toolkit" }, { name: "Instagram Toolkit" }, { name: "Web Scraper Toolkit" }, { name: "File Toolkit" }, { name: "ApolloToolkit" }, { name: "CodingToolkit" }, { name: "Google SERP Toolkit" }, { name: "Searx Toolkit" }, { name: "Google Search Toolkit" }],
//                 iterationInterval: 500,
//                 maxIterations: 10,
//                 model: "gpt-3.5-turbo"
//             });

//             // Create an agent using the SuperAGI Client
//             const agent = await client.createAgent(agentConfig);

//             // Use agent as needed
//             console.log('Agent created:', agent);

//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }

//         res.status(200).json({ name: 'John Doe' })
//     } else {
//         res.status(405).json({ error: 'Method Not Allowed' });
//     }
// });




