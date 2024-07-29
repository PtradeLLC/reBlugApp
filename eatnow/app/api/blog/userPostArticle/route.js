import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { uploadContentImages } from '../../../../utils/imageUtils';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

export async function POST(request) {
    const {
        userId,
        title,
        featureImage,
        content,
        categorySlug,
        publishedChannels,
        crossPromote,
        author,
        podcastSingleCast,
        podcastMultiCast,
        isDraft,
        slug,
    } = await request.json();

    if (!title || !featureImage || !content) {
        return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
    }

    try {
        // Upload featureImage to Cloudinary if it's a base64 string
        let uploadedFeatureImage = featureImage;
        if (featureImage && featureImage.startsWith('data:')) {
            const uploadResult = await cloudinary.v2.uploader.upload(featureImage, {
                folder: 'post/coverImage',
            });
            uploadedFeatureImage = uploadResult.secure_url;
            console.log(`Feature image uploaded: ${featureImage} -> ${uploadedFeatureImage}`);
        }

        console.log('Original Content:', content);
        const updatedContent = await uploadContentImages(content);
        console.log('Updated Content:', updatedContent);

        const post = await prisma.post.upsert({
            where: {
                slug: slug,
            },
            update: {
                title: title,
                featureImage: uploadedFeatureImage,
                content: updatedContent,
                categorySlug: categorySlug,
                author: author.name,
                postSlug: slug,
                publishedChannels: publishedChannels,
                crossPromote: crossPromote,
                podcastSingleCast: podcastSingleCast,
                podcastMultiCast: podcastMultiCast,
                isDraft: isDraft,
            },
            create: {
                userId: userId,
                title: title,
                featureImage: uploadedFeatureImage,
                content: updatedContent,
                categorySlug: categorySlug,
                postSlug: slug,
                author: author.name,
                publishedChannels: publishedChannels,
                crossPromote: crossPromote,
                podcastSingleCast: podcastSingleCast,
                podcastMultiCast: podcastMultiCast,
                isDraft: isDraft,
                slug: slug,
            },
        });

        if (isDraft) {
            const existingDraft = await prisma.draft.findUnique({
                where: {
                    postId: post.id,
                },
            });

            if (existingDraft) {
                await prisma.draft.update({
                    where: {
                        id: existingDraft.id,
                    },
                    data: {
                        title: post.title,
                    },
                });
            } else {
                await prisma.draft.create({
                    data: {
                        title: post.title,
                        postId: post.id,
                    },
                });
            }
        }

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}





// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';
// import { uploadContentImages } from '../../../../utils/imageUtils';
// import cloudinary from 'cloudinary';

// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const prisma = new PrismaClient();

// export async function POST(request) {
//     const {
//         userId,
//         title,
//         featureImage,
//         content,
//         categorySlug,
//         publishedChannels,
//         crossPromote,
//         author,
//         podcastSingleCast,
//         podcastMultiCast,
//         isDraft,
//         slug,
//     } = await request.json();

//     if (!title || !featureImage || !content) {
//         return NextResponse.json({ success: false, message: "Please fill out all required fields." }, { status: 400 });
//     }

//     try {
//         // Upload featureImage to Cloudinary if it's a base64 string
//         let uploadedFeatureImage = featureImage;
//         if (featureImage && featureImage.startsWith('data:')) {
//             const uploadResult = await cloudinary.v2.uploader.upload(featureImage, {
//                 folder: 'post/coverImage',
//             });
//             uploadedFeatureImage = uploadResult.secure_url;
//         }

//         // Use the imported function to upload images in the content
//         const updatedContent = await uploadContentImages(content);

//         const post = await prisma.post.upsert({
//             where: {
//                 slug: slug,
//             },
//             update: {
//                 title: title,
//                 featureImage: uploadedFeatureImage,
//                 content: updatedContent,
//                 categorySlug: categorySlug,
//                 author: author.name,
//                 postSlug: slug,
//                 publishedChannels: publishedChannels,
//                 crossPromote: crossPromote,
//                 podcastSingleCast: podcastSingleCast,
//                 podcastMultiCast: podcastMultiCast,
//                 isDraft: isDraft,
//             },
//             create: {
//                 userId: userId,
//                 title: title,
//                 featureImage: uploadedFeatureImage,
//                 content: updatedContent,
//                 categorySlug: categorySlug,
//                 postSlug: slug,
//                 author: author.name,
//                 publishedChannels: publishedChannels,
//                 crossPromote: crossPromote,
//                 podcastSingleCast: podcastSingleCast,
//                 podcastMultiCast: podcastMultiCast,
//                 isDraft: isDraft,
//                 slug: slug,
//             },
//         });

//         if (isDraft) {
//             const existingDraft = await prisma.draft.findUnique({
//                 where: {
//                     postId: post.id,
//                 },
//             });

//             if (existingDraft) {
//                 await prisma.draft.update({
//                     where: {
//                         id: existingDraft.id,
//                     },
//                     data: {
//                         title: post.title,
//                     },
//                 });
//             } else {
//                 await prisma.draft.create({
//                     data: {
//                         title: post.title,
//                         postId: post.id,
//                     },
//                 });
//             }
//         }

//         return NextResponse.json({ success: true, post });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }