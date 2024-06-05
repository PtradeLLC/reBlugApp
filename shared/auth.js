import { Client, Account } from 'appwrite';

const client = new Client();
client
    .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`)
    .setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`);

const account = new Account(client);

export const login = async (email, password) => {
    try {
        await account.createEmailSession(email, password);
        console.log('Logged in successfully!');
    } catch (error) {
        console.error('Login failed:', error);
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
        console.log('Logged out successfully!');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error('Failed to get current user:', error);
        return null;
    }
};
