import { Client, Account, Databases, Query } from 'appwrite';

const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID) // Your project ID

export const account = new Account(client);
const databases = new Databases(client);
const databaseId = process.env.APPWRITE_DATABASE_ID; // Your Appwrite database ID
const collectionId = process.env.APPWRITE_COLLECTION_ID; // Your Appwrite collection ID

export async function synchronizeWithAppwrite(user, account, profile) {
    try {
        // Use Appwrite to create a new user session
        const sessionResponse = await account.createOAuth2Session(
            'google',
            'http://localhost:3000/api/auth/callback', // Your OAuth callback URL
            'http://localhost:3000/login' // Your login URL
        );

        // Check if user already exists in the database
        const userEmail = user.email;
        let userDocument;

        try {
            const listResponse = await databases.listDocuments(databaseId, collectionId, [
                Query.equal('email', userEmail)
            ]);

            if (listResponse.documents.length > 0) {
                userDocument = listResponse.documents[0];
            }
        } catch (error) {
            console.error('Error checking existing user in Appwrite database:', error);
        }

        if (userDocument) {
            // Update existing user document
            await databases.updateDocument(databaseId, collectionId, userDocument.$id, {
                name: user.name,
                email: user.email,
                image: user.image,
                lastLogin: new Date().toISOString()
            });
        } else {
            // Create new user document
            await databases.createDocument(databaseId, collectionId, 'unique()', {
                name: user.name,
                email: user.email,
                image: user.image,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            });
        }

        return sessionResponse;
    } catch (error) {
        console.error('Error synchronizing with Appwrite:', error);
    }
}
