import { PrismaClient } from '@prisma/client';
import { extname, join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';
import * as dateFn from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

function sanitizeFilename(filename) {
    return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, '_');
}

const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb', // Adjust the size limit as needed
        },
    },
};

export { config };

export async function POST(request) {
    try {
        const formData = await request.formData();
        const brandName = formData.get('brandName');
        const productName = formData.get('productName');
        const website = formData.get('website');
        const productMessage = formData.get('productMessage');
        const notes = formData.get('notes');
        const file = formData.get('productImage');

        if (!file || typeof file === 'string') {
            return NextResponse.json(
                { error: 'File blob is required.' },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const pathDist = join(process.cwd(), '/public/images');
        const relativeUploadDir = dateFn.format(Date.now(), 'dd-MM-yyyy');
        const uploadDir = join(pathDist, relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e) {
            if (e.code === 'ENOENT') {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error('Error while trying to create directory:', e);
                return NextResponse.json(
                    { error: 'Error creating directory.' },
                    { status: 500 }
                );
            }
        }

        const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
        const fileExtension = extname(file.name);
        const originalFilename = file.name.replace(/\.[^/.]+$/, '');
        const sanitizedFilename = sanitizeFilename(originalFilename);
        const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
        await writeFile(join(uploadDir, filename), buffer);

        const finalFilePath = `/images/${relativeUploadDir}/${filename}`;
        const productImage = `${finalFilePath}`;

        const newArticle = await prisma.message.create({
            data: {
                brandName,
                productName,
                website,
                productMessage,
                notes,
                productImage,
            },
        });

        return NextResponse.json(
            { message: 'File uploaded successfully', productImage },
            { status: 200 }
        );
    } catch (e) {
        console.error('Error while processing file upload:', e);
        return NextResponse.json(
            { error: 'Something went wrong.' },
            { status: 500 }
        );
    }
}




// import { PrismaClient } from '@prisma/client';
// import { extname, join } from 'path';
// import { stat, mkdir, writeFile } from 'fs/promises';
// import * as dateFn from 'date-fns';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// function sanitizeFilename(filename) {
//     return filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF.]/g, '_');
// }

// export async function POST(request) {
//     try {
//         const formData = await request.formData();
//         const brandName = formData.get('brandName');
//         const productName = formData.get('productName');
//         const website = formData.get('website');
//         const productMessage = formData.get('productMessage');
//         const notes = formData.get('notes');
//         const file = formData.get('productImage');

//         if (!file || typeof file === 'string') {
//             return NextResponse.json(
//                 { error: 'File blob is required.' },
//                 { status: 400 }
//             );
//         }

//         const buffer = Buffer.from(await file.arrayBuffer());
//         const pathDist = join(process.cwd(), '/public/images');
//         const relativeUploadDir = dateFn.format(Date.now(), 'dd-MM-yyyy');
//         const uploadDir = join(pathDist, relativeUploadDir);

//         try {
//             await stat(uploadDir);
//         } catch (e) {
//             if (e.code === 'ENOENT') {
//                 await mkdir(uploadDir, { recursive: true });
//             } else {
//                 console.error('Error while trying to create directory:', e);
//                 return NextResponse.json(
//                     { error: 'Error creating directory.' },
//                     { status: 500 }
//                 );
//             }
//         }

//         const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
//         const fileExtension = extname(file.name);
//         const originalFilename = file.name.replace(/\.[^/.]+$/, '');
//         const sanitizedFilename = sanitizeFilename(originalFilename);
//         const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
//         await writeFile(join(uploadDir, filename), buffer);

//         const finalFilePath = `/images/${relativeUploadDir}/${filename}`;
//         const productImage = `${finalFilePath}`;

//         const newArticle = await prisma.message.create({
//             data: {
//                 brandName,
//                 productName,
//                 website,
//                 productMessage,
//                 notes,
//                 productImage,
//             },
//         });

//         return NextResponse.json(
//             { message: 'File uploaded successfully', productImage },
//             { status: 200 }
//         );
//     } catch (e) {
//         console.error('Error while processing file upload:', e);
//         return NextResponse.json(
//             { error: 'Something went wrong.' },
//             { status: 500 }
//         );
//     }
// }