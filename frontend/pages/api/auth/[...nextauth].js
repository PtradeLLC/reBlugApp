import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitchProvider from "next-auth/providers/twitch";
import SlackProvider from "next-auth/providers/slack";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '../../../utils/db';
import { compare } from "bcrypt";

export const authOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@company.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                let existingUser = null;

                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing credentials");
                    }

                    existingUser = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email
                        },
                    });

                    if (!existingUser) {
                        throw new Error("User not found");
                    }

                    const passwordMatch = await compare(credentials?.password, existingUser.password);

                    if (!passwordMatch) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: `${existingUser.id}`,
                        email: existingUser.email
                    };
                } catch (error) {
                    // Log the error or handle it appropriately
                    console.error("Authentication error:", error.message);
                    return null;
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
        }),

        SlackProvider({
            clientId: process.env.SLACK_CLIENT_ID,
            clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/404',
        dashboard: '/dashboard',
    },
    debug: true,
};

export default NextAuth(authOptions);
