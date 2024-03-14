import prisma from "../../../lib/db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../auth/[...nextauth]";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        const date = new Date(Date.now());
        cb(null, date.toISOString() + '-' + file.originalname);
    }
});
const fileFilter = function (req, file, cb) {
    // Check the file extension
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain' || file.mimetype === 'application/msword') {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error('Invalid file type'), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export default async function handler(req, res) {
    // Handle file upload

    try {
        await upload.single('files')(req, res, async (err) => {
            if (err) {
                res.status(500).json({ error: 'Error uploading file' });
                return;
            }

            // Handle the rest of the request
            console.log('Request type:', req.method); // Log the request type
            if (req.method !== 'POST') {
                res.status(405).json({ error: 'Method not allowed' });
                return;
            }


            const formDataObject = { ...req.body, file: req.file };
            console.log('formData fom backend', formDataObject); // Log the form data

            // Define the authOptions variable
            // const session = await getServerSession(req, res, authOptions);
            // if (session) {
            //     try {
            //         const files = [];
            //         for (const [key, file] of formData.entries()) {
            //             if (key.startsWith('files')) {
            //                 files.push(file);
            //             }
            //         }
            //         const userEmail = session?.user?.email;
            //         const campaignTitle = formData.get('campaignTitle');

            //         const campaign = await prisma.campaign.findFirst({
            //             where: {
            //                 email: userEmail,
            //                 title: campaignTitle,
            //                 user: {
            //                     email: userEmail,
            //                 },
            //             },
            //         });

            //         if (campaign) {
            //             await prisma.campaign.update({
            //                 where: {
            //                     title: campaignTitle,
            //                 },
            //                 data: {
            //                     goal: formData.get('goal'),
            //                     subjectLine: formData.get('subject'),
            //                     emailBody: formData.get('message'),
            //                     category: formData.get('clientType'),
            //                 },
            //             });
            //         } else {
            //             await prisma.campaign.create({
            //                 data: {
            //                     title: campaignTitle,
            //                     goal: formData.get('goal'),
            //                     subjectLine: formData.get('subject'),
            //                     emailBody: formData.get('message'),
            //                     category: formData.get('clientType'),
            //                     user: {
            //                         connect: {
            //                             email: userEmail,
            //                         },
            //                     },
            //                 },
            //             });
            //         }

            //         const file = req.file;
            //         if (file) {
            //             await prisma.file.create({
            //                 data: {
            //                     name: file.originalname,
            //                     type: file.mimetype,
            //                     data: file.buffer,
            //                     campaign: {
            //                         connect: {
            //                             title: campaignTitle,
            //                         },
            //                     },
            //                 },
            //             });
            //         }
            //         res.status(200).json({ success: true });
            //     } catch (error) {
            //         console.log('Error submitting form:', error.message); // Log the error
            //         res.status(500).json({ message: `Error submitting form: ${error.message}` });
            //     }
            // }
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: `${error}` })

    }
}



export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
