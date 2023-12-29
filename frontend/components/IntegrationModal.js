import React from "react";


// initialize the SuperAGI-NodeJS Client:

const { Client } = require('superagi_client');

const client = new Client({
  apiKey: "YOUR_API_KEY",
  url: "YOUR_OPTIONAL_URL"
});



// create an agent:
const { AgentConfig } = require('superagi_client');

const agentConfig = new AgentConfig({
  name: "Example Agent",
  description: "A detailed description outlining the purpose of the agent.",
  goal: ["List specific tasks for the agent"],
  instruction: ["List any guiding instructions for the agent"],
  agentWorkflow: "Goal Based Workflow",
  constraints: [],
  tools: [{ name: "Toolkit Name" }],
  iterationInterval: 500,
  maxIterations: 10,
  model: "gpt-4"
});

const agent = await client.createAgent(agentConfig);

// Start an Agent Run:

const agentId = agent.agentId;
const runAgent = client.createAgentRun(agentId);


// Checking the Status of Agent Runs:

const runAgentStatus = client.getAgentRunStatus(agentId);

// extract the status of specific runs or statuses, use the AgentRunFilter class:

const { AgentRunFilter } = require('superagi_client');

const filterConfig = new AgentRunFilter({ runIds: [runId1, runId2] });
const runStatus = await client.getAgentRunStatus(agentId, filterConfig);

// Pausing and Resuming Agent Runs:
await client.pauseAgent(agentId, [runId]);
await client.resumeAgent(agentId, [runId]);

// Updating an Agent's Configuration:

const { AgentUpdateConfig } = require('superagi_client');

const updatedConfig = new AgentUpdateConfig({
  name: "New Agent Name",
  goal: ["List the new goals for the agent"]
});

await client.updateAgent(agentId, updatedConfig);


const SomeAgent = () => {
  return (
    <div>
      Hello world
    </div>
  );
};

export default SomeAgent;
