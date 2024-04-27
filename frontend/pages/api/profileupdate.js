import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import prisma from "../../lib/db";

// const upload = multer().single('profileImage');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 10,
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




// export default async function handler(req, res) {
//     // Parse multipart/form-data using multer middleware
//     upload(req, res, async function (err) {
//         if (err) {
//             console.error('Error uploading file:', err);
//             return res.status(500).json({ error: 'Error uploading file' });
//         }

//         // Access file via req.file
//         const profileImage = req.file;

//         // Access other form fields via req.body
//         const { firstName, lastName, brandName, brandLogo } = req.body;

//         // Process the form data...
//     });
// }



// import multer from 'multer';



