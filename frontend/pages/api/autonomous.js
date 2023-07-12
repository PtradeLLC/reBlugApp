import React, { useEffect } from "react";
import { AutoGPT } from "langchain/experimental/autogpt";
import { ChatOpenAI } from "langchain/chat_models/openai";

const autogpt = AutoGPT.fromLLM(new ChatOpenAI({ temperature: 0 }));

function TaskProcessor() {
  useEffect(() => {
    // Define the task processing function
    const processTask = async (task) => {
      // Use the ChatGPT model to generate a response based on the task
      const response = await autogpt.run(task);

      // Perform any necessary actions with the response
      // For example, update the UI, store the response, etc.

      console.log("Response:", response);
    };

    // Simulated incoming task
    const incomingTask = "write a weather report for SF today";

    // Process the incoming task
    processTask([incomingTask]);
  }, []);
}

export default TaskProcessor;

//JAVASCRIPT BELOW

// Define the task processing function
// async function processTask(task) {
//     // Use the ChatGPT model to generate a response based on the task
//     const response = await chatGPT.generateResponse(task);

//     // Perform any necessary actions with the response
//     // For example, send it back to the requester or store it in a database

//     // Return the response
//     return response;
//   }

//   // Loop or event-driven system to listen for incoming tasks
//   while (true) {
//     // Wait for incoming task
//     const task = await waitForIncomingTask();

//     // Process the task using the task processing function
//     const response = await processTask(task);

//     // Perform any necessary actions with the response
//     // For example, send it back to the requester or store it in a database

//     // Continue listening for the next task
//   }
