import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Helper to process file uploads
const uploadDir = path.join(process.cwd(), 'public/uploads'); // Define your upload directory

const processForm = (req) => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            uploadDir,
            keepExtensions: true,
            maxFileSize: 10 * 1024 * 1024, // 10 MB
            multiples: false,
        });

        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ fields, files });
        });
    });
};

export async function POST(req, res) {
    try {
        const { fields, files } = await processForm(req);

        // Save file and return its path
        const file = files.productImage;
        const filePath = path.join('/uploads', path.basename(file.filepath));

        // Save the record to the database
        const sponsor = await prisma.sponsorship.create({
            data: {
                brandName: fields.brandName,
                productName: fields.productName,
                productImage: filePath,
                website: fields.website,
                productMessage: fields.productMessage,
                additionalInfo: fields.additionalInfo || '',
            },
        });

        return NextResponse.json({ message: 'Message was created successfully', sponsor });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const routeSegmentConfig = {
    api: {
        bodyParser: false,
    },
};



// async function fetchAllPosts() {
//     try {
//         const allCategories = await prisma.message.findMany({
//             select: {
//                 id: true,
//                 title: true,
//                 slug: true
//             }
//         });

//         if (!allCategories.length) {
//             throw new Error('No categories found');
//         }

//         return allCategories;
//     } catch (error) {
//         console.error("An error occurred while fetching all posts:", error);
//         throw error;
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// // GET handler for the API route
// export async function GET(req, res) {
//     try {
//         const categories = await fetchAllPosts();

//         const prompt = `Here are some tasks and instructions`;

//         // This is where you can call the AI content generation function if needed

//         return NextResponse.json({ message: 'Categories fetched successfully', categories });
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
