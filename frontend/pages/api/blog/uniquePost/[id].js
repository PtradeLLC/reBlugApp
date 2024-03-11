import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const singlePost = await prisma.post.findUnique({
            where: {
                id: String(id),
            },
            include: {
                comments: {
                    include: {
                        AiResponse: true,
                        user: true
                    },
                },
                user: true,
                category: true // Include the category information
            },
        });

        if (!singlePost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Extract category information from the post
        const { category, ...postData } = singlePost;

        // Create a new object with the necessary category information
        const responseData = {
            ...postData,
            category: {
                id: category.id,
                title: category.title,
                slug: category.slug,
                userId: category.userId
                // Add other fields if needed
            }
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error creating or fetching post:', error);
        res.status(500).json({ message: 'Error creating or fetching post.' });
    }
}



// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     const { id } = req.query;

//     try {
//         const singlePost = await prisma.post.findUnique({
//             where: {
//                 id: String(id),
//             },
//             include: {
//                 comments: {
//                     include: {
//                         AiResponse: true,
//                         user: true
//                     },
//                 },
//                 user: true,
//                 // category: true
//             },
//         });

//         // if (singlePost) {
//         //     const postCategory = await prisma.category.findUnique({
//         //         where: {
//         //             id: singlePost.id
//         //         },
//         //         select: {
//         //             title: true
//         //         }
//         //     })

//         //     return postCategory;
//         // }

//         if (!singlePost) {
//             return res.status(404).json({ message: 'Post not found' });
//         }
//         res.status(200).json(singlePost);
//     } catch (error) {
//         console.error('Error creating or fetching categories:', error);
//         res.status(500).json({ message: 'Error creating or fetching categories.' });
//     }
// }