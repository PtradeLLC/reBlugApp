import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
import HubspotProvider from "next-auth/providers/hubspot";
import LinkedInProvider from "next-auth/providers/linkedin";
import FreshbooksProvider from "next-auth/providers/freshbooks";
import ZohoProvider from "next-auth/providers/zoho";
import SalesforceProvider from "next-auth/providers/salesforce";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        ZohoProvider({
            clientId: process.env.ZOHO_CLIENT_ID,
            clientSecret: process.env.ZOHO_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        SalesforceProvider({
            clientId: process.env.SALESFORCE_CLIENT_ID,
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
        }),
        HubspotProvider({
            clientId: process.env.HUBSPOT_CLIENT_ID,
            clientSecret: process.env.HUBSPOT_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET
        }),
        // ...add more providers here if needed
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

export default NextAuth(authOptions)