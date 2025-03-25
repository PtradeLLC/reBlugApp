import { Client, Account, ID, Databases, Storage, Avatars } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

// Removed problematic code that was causing the error

// Export statement moved to the top level
export { client, account, ID, databases, storage, avatars };
