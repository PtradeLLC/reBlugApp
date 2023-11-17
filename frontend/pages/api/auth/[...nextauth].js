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

const globalForPrisma = global;

export const prisma =
    (globalForPrisma.prisma ||
        new PrismaClient({
            log: ['query'],
        }).$extends(withAccelerate()));

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const authOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
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
                        cacheStrategy: { ttl: 60 },
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

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
        }),

    ],
    adapter: PrismaAdapter(prisma),

    callbacks: {

        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + account.expires_in * 1000,
                    refreshToken: account.refresh_token,
                    user,
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token) {
                session.user = token.user
                session.accessToken = token.accessToken
                session.error = token.error
                session.user.id = user.id;
            }

            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/404',
    },
    debug: true,
};

export default NextAuth(authOptions);
