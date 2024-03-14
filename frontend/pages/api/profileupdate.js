import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import prisma from "../../../lib/db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';



const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 10, // Adjust file size limit as needed
    },
});

export default async function handler(req, res) {
    try {
        // Use multer middleware to parse the FormData
        upload.any()(req, res, async (err) => {
            if (err) {
                console.error('Error parsing FormData:', err);
                return res.status(500).json({ message: 'Error processing request' });
            }

            // Access the FormData from req.body
            const formData = req.body;

            // Log the entire formData object

            // Your existing code...
            for (const pair of formData.entries()) {
                console.log(pair);
            }

            try {
                // Respond with success
                return res.status(200).json({ message: 'Profile updated successfully' });
            } catch (error) {

                console.error('Error processing request:', error);

                // Respond with an error status
                return res.status(500).json({ message: 'Error processing request' });
            } finally {
                // Disconnect Prisma after handling the request
                await prisma.$disconnect();
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'There is an error' });
    }
}