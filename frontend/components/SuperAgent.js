// SuperAGIComponent.js

import { useEffect } from 'react';
import { Client, AgentConfig, AgentRunFilter, AgentUpdateConfig } from 'superagi-client';

const SuperAGIComponent = () => {
    // Initialize SuperAGI Client
    const client = new Client({
        apiKey: process.env.SUPER_AGI_KEY,
        // url: "http://localhost:3000/api/v1/agent"
    });

    useEffect(() => {
        const fetchData = async () => {
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
                model: "gpt-3.5-turbo"
            });

            // Create an agent using the SuperAGI Client
            const agent = await client.createAgent(agentConfig);

            // Starting an Agent Run
            const agentId = agent.agentId;
            const runAgent = client.createAgentRun(agentId);

            // Get the status of an agent run
            const runStatus = client.getAgentRunStatus(agentId);

            // Use AgentRunFilter to get the status of specific runs
            const filterConfig = new AgentRunFilter({ runIds: [runId1, runId2] });
            const specificRunStatus = await client.getAgentRunStatus(agentId, filterConfig);

            // Pause and Resume Agent Runs
            await client.pauseAgent(agentId, [runId]);
            await client.resumeAgent(agentId, [runId]);

            // Import AgentUpdateConfig
            const updatedConfig = new AgentUpdateConfig({
                name: "New Agent Name",
                goal: ["List the new goals for the agent"]
            });

            // Update the agent configuration
            await client.updateAgent(agentId, updatedConfig);

            // Use agent, runStatus, etc. as needed
            console.log('Agent created:', agent);
        };

        fetchData();
    }, []);

    return (
        // JSX content if needed
        <div>
            <p>SuperAGI Integration</p>
        </div>
    );
};

export default SuperAGIComponent;
