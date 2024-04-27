import { put } from '@vercel/blob';
import { getServerSession } from "next-auth/next";


const prisma = new PrismaClient();

export default async function uploadFile(request, response) {
    // try {
    //     const filename = request.query.filename;
    //     const session = await getServerSession(request, response, authOptions);

    //     if (!session) {
    //         return response.status(401).json({ error: 'Unauthorized' });
    //     }

    //     const email = session.user.email;

    //     if (!request.body || request.body.length === 0) {
    //         throw new Error('No file included in the request body.');
    //     }

    //     const file = request.body[0];
    //     const blob = await put(filename, file, { access: 'public' });

    //     const user = await prisma.user.findUnique({
    //         where: {
    //             email: email,
    //         },
    //         select: {
    //             id: true,
    //             profileImage: true,
    //             brandLogo: true,
    //         }
    //     });

    //     if (!user) {
    //         return response.status(404).json({ error: 'User not found' });
    //     }

    //     const updateData = {};
    //     if (filename && blob.url) {
    //         if (request.query.field === 'profileImage') {
    //             updateData.profileImage = blob.url;
    //         } else if (request.query.field === 'brandLogo') {
    //             updateData.brandLogo = blob.url;
    //         } else {
    //             updateData.profileImage = blob.url;
    //             updateData.brandLogo = blob.url;
    //         }
    //     }

    //     await prisma.user.update({
    //         where: {
    //             id: user.id,
    //         },
    //         data: updateData,
    //     });

    //     response.status(200).json({ message: 'File uploaded successfully' });
    // } catch (error) {
    //     console.error('Error uploading file:', error);
    //     response.status(500).json({ error: 'Failed to upload the file.' });
    // }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
        runtime: 'edge',
    },
};