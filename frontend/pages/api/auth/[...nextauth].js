import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
import EmailProvider from "next-auth/providers/email";
import FreshbooksProvider from "next-auth/providers/freshbooks";
import ZohoProvider from "next-auth/providers/zoho";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import sendVerificationEmail from "./emailVerification";

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
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM,
            maxAge: 10 * 60,
        }),
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET
        }),
        // SalesforceProvider({
        //     clientId: process.env.SALESFORCE_CLIENT_ID,
        //     clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
        // }),
        // HubspotProvider({
        //     clientId: process.env.HUBSPOT_CLIENT_ID,
        //     clientSecret: process.env.HUBSPOT_CLIENT_SECRET
        // }),
        // LinkedInProvider({
        //     clientId: process.env.LINKEDIN_CLIENT_ID,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        //     scope: "openid, profile, email",
        // }),
        // ...add more providers here if needed
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
    },
    session: {
        jwt: false,
    },
    database: process.env.DATABASE_URL,
    callbacks: {
        async signIn({ user, account, email }) {

            const userExists = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            if (userExists) {
                return true;
            } else {
                return "/login";
            }
        },
    },
}

export default NextAuth(authOptions)