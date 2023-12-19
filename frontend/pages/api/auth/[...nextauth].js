import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitchProvider from "next-auth/providers/twitch";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

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
            async authorize(credentials) {
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
                        const isActive = existingUser.Accounts.every(account => account.isActive);

                        if (isActive) {
                            // Delete sensitive data before returning user
                            delete existingUser.password;

                            // return user if all accounts are active
                            return existingUser;
                        } else {
                            console.log("User account is not active");
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