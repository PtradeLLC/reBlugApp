import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import HubspotProvider from "next-auth/providers/hubspot";
import TwitchProvider from "next-auth/providers/twitch";
import InstagramProvider from "next-auth/providers/instagram";
import { PrismaAdapter } from "@auth/prisma-adapter";
import SalesforceProvider from "next-auth/providers/salesforce";
import LinkedInProvider from "next-auth/providers/linkedin";
import { compare } from "bcrypt";
import { PrismaClient } from '@prisma/client';
import { generateParagonToken } from "./paragonToken";

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        HubspotProvider({
            clientId: process.env.HUBSPOT_CLIENT_ID,
            clientSecret: process.env.HUBSPOT_CLIENT_SECRET
        }),
        SalesforceProvider({
            clientId: process.env.SALESFORCE_CLIENT_ID,
            clientSecret: process.env.SALESFORCE_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        // InstagramProvider({
        //     clientId: process.env.INSTAGRAM_CLIENT_ID,
        //     clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
        //   }),
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                console.log('Received credentials:', credentials);
                try {
                    const { email } = credentials;

                    if (!email) {
                        throw new Error("Missing email");
                    }

                    const existingUser = await prisma?.user?.findUnique({
                        where: {
                            email
                        },
                        include: {
                            Accounts: true, // Include the related accounts
                        },
                    });

                    if (existingUser) {
                        // Log the user object to check its structure

                        // Attach user information to the session
                        req.session.user = {
                            name: existingUser.name,
                            email: existingUser.email,
                            image: existingUser.image,
                        };

                        const isActive = existingUser.Accounts.every(account => account.isActive);


                        if (!isActive) {
                            // Update the user's isActive status to true
                            await prisma.user.update({
                                where: {
                                    id: existingUser.id,
                                },
                                data: {
                                    isActive: true,
                                },
                            });


                            // Delete sensitive data before returning user
                            delete existingUser.password;

                            // return user if all accounts are active
                            return existingUser;

                        } else {
                            console.log("User account is already active");
                        }
                    } else {
                        console.log("There is no user on db");
                    }
                } catch (error) {
                    // Log the error
                    console.error(`Authentication error: ${error}`);
                }
                return null;
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/404',
    },
};

export default NextAuth(authOptions);