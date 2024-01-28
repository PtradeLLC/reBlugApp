import { Apideck } from "@apideck/node";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import fetch from "isomorphic-fetch";
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        // Fetch user data from the database using the email
        const session = await getServerSession(req, res, authOptions);

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }

        const userEmail = session.user.email;
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (user) {
            // Check if a verification token already exists for the email
            const existingToken = await prisma.verificationToken.findFirst({
                where: { email: userEmail },
            });

            if (existingToken) {
                // If a token exists, update its details (e.g., update expiration time)
                const expires = new Date();
                expires.setHours(expires.getHours() + 1);

                const updatedToken = await prisma.verificationToken.update({
                    where: { id: existingToken.id },
                    data: { expires },
                });

                // Use the updated token for further processing if needed
                const token = updatedToken;

                // Set consumer_metadata values
                const consumerMetadata = {
                    account_name: `${user.brandName || user.name}`,
                    user_name: user.name,
                    email: user.email,
                    image: user.profileImage,
                    id: user.id,
                };

                // Additional task: Fetch BrandName from the User model and set it in consumer_metadata
                if (user.brandName) {
                    consumerMetadata.account_name = user.brandName;
                }

                const apideck = new Apideck({
                    apiKey: process.env.AP_DECK_API_KEY,
                    appId: process.env.AP_DECK_APP_ID,
                    consumerId: user.id,
                });

                const params = {
                    session: {
                        // Merge existing session configuration with Apideck example
                        consumer_metadata: consumerMetadata,
                        redirect_uri: "https://forgedmart.com/dashboard",
                        settings: {
                            unified_apis: ["file-storage"],
                            hide_resource_settings: false,
                            sandbox_mode: false,
                            isolation_mode: false,
                            session_length: "30m",
                            show_logs: true,
                            show_suggestions: false,
                            show_sidebar: true,
                            auto_redirect: false,
                            hide_guides: false,
                            allow_actions: ["delete"],
                        },
                        theme: {
                            favicon:
                                "https://0ayhovuii0guag6u.public.blob.vercel-storage.com/favicon-vK1aIZQG7CFwAfaFKKbfTjhcfQnCbT.ico",
                            logo: "https://0ayhovuii0guag6u.public.blob.vercel-storage.com/Mart-cvlTioLBE99Xw1okkOXbPoQlAtQcjw.png",
                            primary_color: "#286efa",
                            sidepanel_background_color: "#286efa",
                            sidepanel_text_color: "#FFFFFF",
                            vault_name: "Intercom",
                            privacy_url: "https://forgedmart.com/privacy-policy",
                            terms_url: "https://forgedmart.com/privacy-policy",
                        },
                        custom_consumer_settings: {
                            feature_flag_1: true,
                            tax_rates: [
                                {
                                    id: user.id,
                                },
                            ],
                        },
                    },
                };

                // Create session using Apideck API with the generated token
                const { data, error } = await apideck.vault.sessionsCreate(params, { headers: { Authorization: `Bearer ${token}` } });
                if (error) {
                    console.error("API error:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                } else {
                    console.log("API called successfully", data);
                    const sessionToken = data?.session_token;
                    res.status(200).json({ data, sessionToken });
                }
            } else {
                // If no token exists, create a new one
                const expires = new Date();
                expires.setHours(expires.getHours() + 1);

                const token = await prisma.verificationToken.create({
                    data: {
                        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
                        email: userEmail,
                        userId: user.id,
                        expires: expires,
                    },
                });

                // Set consumer_metadata values
                const consumerMetadata = {
                    account_name: `${user.brandName || user.name}`,
                    user_name: user.name,
                    email: user.email,
                    image: user.profileImage,
                    id: user.id,
                };

                // Additional task: Fetch BrandName from the User model and set it in consumer_metadata
                if (user.brandName) {
                    consumerMetadata.account_name = user.brandName;
                }

                const apideck = new Apideck({
                    apiKey: process.env.AP_DECK_API_KEY,
                    appId: process.env.AP_DECK_APP_ID,
                    consumerId: user.id,
                });

                const params = {
                    session: {
                        // Merge existing session configuration with Apideck example
                        consumer_metadata: consumerMetadata,
                        redirect_uri: "https://forgedmart.com/dashboard",
                        settings: {
                            unified_apis: ["file-storage"],
                            hide_resource_settings: false,
                            sandbox_mode: false,
                            isolation_mode: false,
                            session_length: "30m",
                            show_logs: true,
                            show_suggestions: false,
                            show_sidebar: true,
                            auto_redirect: false,
                            hide_guides: false,
                            allow_actions: ["delete"],
                        },
                        theme: {
                            favicon:
                                "https://0ayhovuii0guag6u.public.blob.vercel-storage.com/favicon-vK1aIZQG7CFwAfaFKKbfTjhcfQnCbT.ico",
                            logo: "https://0ayhovuii0guag6u.public.blob.vercel-storage.com/Mart-cvlTioLBE99Xw1okkOXbPoQlAtQcjw.png",
                            primary_color: "#286efa",
                            sidepanel_background_color: "#286efa",
                            sidepanel_text_color: "#FFFFFF",
                            vault_name: "Intercom",
                            privacy_url: "https://forgedmart.com/privacy-policy",
                            terms_url: "https://forgedmart.com/privacy-policy",
                        },
                        custom_consumer_settings: {
                            feature_flag_1: true,
                            tax_rates: [
                                {
                                    id: user.id,
                                },
                            ],
                        },
                    },
                };

                // Create session using Apideck API with the generated token
                const { data, error } = await apideck.vault.sessionsCreate(params, { headers: { Authorization: `Bearer ${token}` } });
                if (error) {
                    console.error("API error:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                } else {
                    console.log("API called successfully", data);
                    const sessionToken = data?.session_token;
                    res.status(200).json({ data, sessionToken });
                }
            }
        } else {
            console.error("User not found");
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
