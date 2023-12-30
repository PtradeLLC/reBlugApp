import { Client } from 'superagi-client';

const client = new Client({
    apiKey: process.env.SUPER_AGI_KEY,
});

export default client;
