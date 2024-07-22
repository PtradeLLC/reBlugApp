import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(request) {
    try {
        const formData = await request.json();
        const { userId, title, cover, niche, articleBody, features, isDraft } = formData;

        let newArticle;

        if (isDraft) {
            // Saving a draft
            newArticle = await prisma.post.upsert({
                where: { userId: userId, isDraft: true },
                update: {
                    title: title || "",
                    featureImage: cover || "",
                    content: articleBody || "",
                    categorySlug: niche || "",
                    publishedChannels: features?.publishedChannels || false,
                    crossPromote: features?.crossPromotion || false,
                    podcastSingleCast: features?.podcastSingleCast || false,
                    podcastMultiCast: features?.podcastMultiCast || false,
                },
                create: {
                    title: title || "",
                    featureImage: cover || "",
                    content: articleBody || "",
                    categorySlug: niche || "",
                    publishedChannels: features?.publishedChannels || false,
                    crossPromote: features?.crossPromotion || false,
                    podcastSingleCast: features?.podcastSingleCast || false,
                    podcastMultiCast: features?.podcastMultiCast || false,
                    userId: userId,
                    isDraft: true,
                },
            });
        } else {
            // Finalizing an article
            newArticle = await prisma.post.create({
                data: {
                    title: title || "",
                    featureImage: cover || "",
                    content: articleBody || "",
                    categorySlug: niche || "",
                    publishedChannels: features?.publishedChannels || false,
                    crossPromote: features?.crossPromotion || false,
                    podcastSingleCast: features?.podcastSingleCast || false,
                    podcastMultiCast: features?.podcastMultiCast || false,
                    userId: userId,
                    isDraft: false,
                },
            });
        }

        let getNiche = null;

        if (userId) {
            const uniqueNiche = await prisma.userShadow.findUnique({
                where: { userId: userId },
                select: { niche: true },
            });

            if (uniqueNiche && uniqueNiche.niche) {
                getNiche = uniqueNiche.niche;
                console.log("Niche from server", getNiche);
            }
        }

        return NextResponse.json({
            message: 'Article created successfully',
            newArticle,
            getNiche,
        });
    } catch (error) {
        console.error('Error creating article:', error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}




// import { PrismaClient } from '@prisma/client';
// import { NextResponse } from 'next/server';

// const prisma = global.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// export async function POST(request) {
//     try {
//         const formData = await request.json();
//         const { userId, title, cover, niche, articleBody, features, isDraft } = formData;

//         let newArticle;

//         if (isDraft) {
//             // Saving a draft
//             newArticle = await prisma.post.upsert({
//                 where: { userId: userId, isDraft: true },
//                 update: {
//                     title: title || "",
//                     featureImage: cover || "",
//                     content: articleBody || "",
//                     categorySlug: niche || "",
//                     publishedChannels: features?.publishedChannels || false,
//                     crossPromote: features?.crossPromotion || false,
//                     podcastSingleCast: features?.podcastSingleCast || false,
//                     podcastMultiCast: features?.podcastMultiCast || false,
//                 },
//                 create: {
//                     title: title || "",
//                     featureImage: cover || "",
//                     content: articleBody || "",
//                     categorySlug: niche || "",
//                     publishedChannels: features?.publishedChannels || false,
//                     crossPromote: features?.crossPromotion || false,
//                     podcastSingleCast: features?.podcastSingleCast || false,
//                     podcastMultiCast: features?.podcastMultiCast || false,
//                     userId: userId,
//                     isDraft: true,
//                 },
//             });
//         } else {
//             // Finalizing an article
//             newArticle = await prisma.post.create({
//                 data: {
//                     title: title || "",
//                     featureImage: cover || "",
//                     content: articleBody || "",
//                     categorySlug: niche || "",
//                     publishedChannels: features?.publishedChannels || false,
//                     crossPromote: features?.crossPromotion || false,
//                     podcastSingleCast: features?.podcastSingleCast || false,
//                     podcastMultiCast: features?.podcastMultiCast || false,
//                     userId: userId,
//                     isDraft: false,
//                 },
//             });
//         }

//         let getNiche = null;

//         if (userId) {
//             const uniqueNiche = await prisma.userShadow.findUnique({
//                 where: { userId: userId },
//                 select: { niche: true },
//             });

//             if (uniqueNiche && uniqueNiche.niche) {
//                 getNiche = uniqueNiche.niche;
//                 console.log("Niche from server", getNiche);
//             }
//         }

//         return NextResponse.json({
//             message: 'Article created successfully',
//             newArticle,
//             getNiche,
//         });
//     } catch (error) {
//         console.error('Error creating article:', error);
//         return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
//     }
// }
