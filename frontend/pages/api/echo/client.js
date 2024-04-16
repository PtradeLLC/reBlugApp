import { Echo } from '@novu/echo';

export const echo = new Echo({
    /**
    * Enable this flag only during local development
    * For production this should be false
    */
    devModeBypassAuthentication: true
});

echo.workflow('hello-world', async ({ step }) => {
    await step.email('send-email', async (inputs) => {
        return {
            subject: "This is an email subject",
            body: "E-mail body of hello " + inputs.world
        }
    }, {
        inputSchema: {
            type: 'object', properties: { world: { type: 'string', default: 'World' } }
        }
    });
}, { payloadSchema: { type: 'object', properties: {} } });