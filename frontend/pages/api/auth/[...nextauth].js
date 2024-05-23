import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import HubspotProvider from "next-auth/providers/hubspot";
import PatreonProvider from "next-auth/providers/patreon";
import { PrismaAdapter } from "@auth/prisma-adapter";
import SalesforceProvider from "next-auth/providers/salesforce"
import LinkedInProvider from "next-auth/providers/linkedin";
import prisma from "../../../lib/db";
import { compare } from "bcrypt";

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
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            authorization: {
                params: { scope: 'openid profile email' },
            },
            issuer: 'https://www.linkedin.com',
            jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
            profile(profile, tokens) {
                const defaultImage =
                    'https://cdn-icons-png.flaticon.com/512/174/174857.png';
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture ?? defaultImage,
                };
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        PatreonProvider({
            clientId: process.env.PATREON_CLIENT_ID,
            clientSecret: process.env.PATREON_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
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
                        // Attach user information to the session
                        req.session.user = {
                            name: existingUser.name || existingUser.firstName || null,
                            email: existingUser.email,
                            image: existingUser.image || null,
                        };

                        const isActive = existingUser.Accounts.every(account => account.isActive);

                        if (!isActive) {
                            // Update the user's isActive status to true
                            await prisma.user.update({
                                where: {
                                    email: existingUser.email,
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
    callbacks: {
        async signIn(user, account, profile) {
            // Synchronize with Appwrite here
            await synchronizeWithAppwrite(user, account, profile);
            return true;
        },
        async session(session, user) {
            session.user.id = user.id;
            return session;
        },
    },


    // callbacks: {
    //     session: async ({ session, token }) => {
    //         if (session?.user) {
    //             if (token.sub) {
    //                 session.user.id = token.sub;

    //                 const firebaseToken = await adminAuth.createCustomToken(token.sub);
    //                 session.firebaseToken = firebaseToken;
    //             }
    //         }
    //         return session;
    //     },
    //     jwt: async ({ user, token }) => {
    //         if (user) {
    //             token.sub = user.id;
    //         }
    //         return token;
    //     }
    // },
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
