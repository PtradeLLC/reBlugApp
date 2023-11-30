import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import TwitchProvider from "next-auth/providers/twitch";
import SlackProvider from "next-auth/providers/slack";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate';

// const globalForPrisma = global;
// const prisma = new PrismaClient().$extends(withAccelerate());
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
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing email or password");
                    }

                    const existingUser = await prisma?.user?.findUnique({
                        where: {
                            email: credentials?.email
                        },
                        cacheStrategy: { swr: 60, ttl: 60 },
                    });

                    if (existingUser) {
                        const passwordMatch = compare(credentials?.password, existingUser.password);
                        if (passwordMatch) {
                            delete existingUser.password;
                            // return user if password matches
                            return existingUser;
                        }
                    } else {
                        console.log("There is no user on db");
                    }
                } catch (error) {
                    // Log the error
                    console.error(`Authentication error:, ${error}`);
                }
                return null;
            }
        }),

    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/404',
    },
    debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
