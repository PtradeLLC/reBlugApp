import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
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
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    },
                });

                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await compare(credentials?.password, existingUser?.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email
                };
            }

        }),
        // EmailProvider({
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.EMAIL_SERVER_PASSWORD
        //         }
        //     },
        //     from: process.env.EMAIL_FROM,
        //     sendVerificationRequest({
        //         identifier: email,
        //         url,
        //         provider: { server, from },
        //     }) {
        //         /* your function */
        //     },
        // }),
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
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/404',
    },
};

export default NextAuth(authOptions);
