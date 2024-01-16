import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();



const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Parse the request body as form data
    const formData = await req.body;

    // Get the text inputs from the form data
    const firstNameData = formData.get('firstName');
    const lastNameData = formData.get('lastName');
    const titleData = formData.get('title');
    const emailData = formData.get('email');
    const goalData = formData.get('goal');
    const subjectData = formData.get('subject');
    const messageData = formData.get('message');

    const session = await getServerSession(req, res, authOptions);


    if (session) {
        try {
            // Get the uploaded files from the form data
            const files = [];
            for (const [key, file] of formData.entries()) {
                if (key.startsWith('files')) {
                    files.push(file);
                }
            };

            //get email from session
            const { email } = session?.user;

            const user = await prisma.user.findUnique({
                where: {
                    email: emailData || email,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    Campaign: true,
                    Document: true,
                    ContactList: true,
                    KnowledgeBase: true,
                },
            });


            // Check if the campaign already exists for the user
            const campaign = await prisma.campaign.findFirst({
                where: {
                    email: emailData || email,
                    title: titleData,
                    user: {
                        email: emailData || email,
                    },
                },
            });

            if (campaign) {
                // Update the existing campaign
                await prisma.campaign.update({
                    where: {
                        email: emailData,
                    },
                    data: {
                        goal: formData.get('goal'),
                        subjectLine: formData.get('subject'),
                        emailBody: formData.get('message'),
                        category: formData.get('clientType'),
                    },
                });
            } else {
                // Create a new campaign
                await prisma.campaign.create({
                    data: {
                        title: titleData,
                        goal: formData.get('goal'),
                        subjectLine: formData.get('subject'),
                        emailBody: formData.get('message'),
                        category: formData.get('clientType'),
                        user: {
                            connect: {
                                email: emailData || email,
                            },
                        },
                        files: {
                            connect: [
                                { id: fileId1 },
                                { id: fileId2 },
                            ],
                        },
                    },
                });
            }

            // Handle the file upload and save the file to the database
            const file = req.file;
            if (file) {
                const newFile = await prisma.file.create({
                    data: {
                        name: file.originalname,
                        type: file.mimetype,
                        data: file.buffer,
                        campaign: {
                            connect: {
                                title: titleData,
                            },
                        },
                    },
                });
            }

            // Send a  response back to the client
            res.status(200).json({ success: true });
            // Send a response back to the client
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ "message": "There is an error " + error })
        }





    }


}

