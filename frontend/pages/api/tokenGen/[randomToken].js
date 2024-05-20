import prisma from "../../../lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions).catch((error) => {
        console.error('Error during session retrieval:', error);
        return null;
    });

    // Check if session is available
    if (!session) {
        return res.status(401).json({ error: "User session not found." });
    }


    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Generate a random token (you can use a more secure method if needed)
        const randomToken = req.query.randomToken;

        // Get the email from the session
        const userEmail = session.user.email;

        console.log(req.session);


        if (!userEmail) {
            return res.status(401).json({ error: "User email not found in session." });
        }

        // Create a new VerificationToken in the database
        const verificationToken = await prisma.verificationToken.create({
            data: {
                token: randomToken,
                email: userEmail,
                // Add additional properties as needed
            },
        });

        console.log('Generated Verification Token:', verificationToken.token);


        return res.status(200).json({ token: randomToken });
    } catch (error) {
        console.error('Error during token generation:', error);
        return res.status(500).json({
            error: `An error occurred during token generation: ${error.message || error}`,
        });
    } finally {
        await prisma.$disconnect();
    }
}
