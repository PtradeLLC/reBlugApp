import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
import EmailProvider from "next-auth/providers/email";
import FreshbooksProvider from "next-auth/providers/freshbooks";
import ZohoProvider from "next-auth/providers/zoho";
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
        maxAge: 30 * 24 * 60 * 60,
        // updateAge: 10 * 60 * 60 * 24, // Use to update database with Age extension
    },
    database: process.env.DATABASE_URL,
    callbacks: {
        async signIn({ user, account, profile, email }) {

            const userExists = await prisma.user.findUnique({
                where: {
                    id: `${user.id}`
                }
            });
            if (userExists) {
                return true;
            } else {
                return "/login";
            }
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken;
            }
            return session;
        },
        // async redirect({ url, baseUrl }) {
        //     //return something like 'baseUrl' if user is signed in
        // },

    },
}

export default NextAuth(authOptions)