// Import the SuperAGI Client instance
import client from '../../../utils/superagi';

// Import AgentConfig
const { AgentConfig } = require('superagi_client');

// Create an AgentConfig
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

// Create an agent using the SuperAGI Client
const agent = await client.createAgent(agentConfig);

// Use agent as needed
console.log('Agent created:', agent);
