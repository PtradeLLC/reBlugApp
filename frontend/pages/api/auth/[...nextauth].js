import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import middleware from "../../../middleware";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const adapter = PrismaAdapter(prisma);

const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],

    adapter,
    pages: {
        signIn: '/login',
        signOut: '/login',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },

    // Use the middleware to protect the dashboard routes
    middleware: middleware,
};

export default (req, res) => NextAuth(req, res, authOptions);
