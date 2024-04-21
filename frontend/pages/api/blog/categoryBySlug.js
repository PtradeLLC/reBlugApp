// import prismaadapt from "../../../lib/db";
import { corsMiddleware } from '../cors';
// import { list } from '@vercel/blob';
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'


const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })


// export const config = {
//     runtime: 'edge',
// };


export default async function handler(req, res) {

    try {
        // Apply CORS middleware
        corsMiddleware(req, res, () => { });

        const page = parseInt(req.query.page) || 1;
        const postsPerPage = 12;

        // Fetch all posts
        const posts = await prisma.post.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        // Calculate total number of pages
        const totalPages = Math.ceil(posts.length / postsPerPage);
        if (posts.length > 0) {
            for (const post of posts) {
                if (post) {

                    // const { blobs } = await list();
                    // const blobDetails = blobs.map((blob) => {
                    //     return {
                    //         name: blob.name,
                    //         size: blob.size
                    //     }
                    // })

                    // console.log("blobDetails", blobDetails);

                    // fetch('https://api.together.xyz/v1/completions')
                    //     .then(response => {
                    //         if (!response.ok) {
                    //             throw new Error('Failed to fetch response from the API');
                    //         }
                    //         return response.json();
                    //     })
                    //     .then(async response => {
                    //         if (response.choices && response.choices.length > 0) {
                    //             const imageData = response.choices[0].image_base64;
                    //             if (imageData) {
                    //                 const fileName = `post_${post.id}.jpg`;
                    //                 const filePath = `./public/images/postImages/${fileName}`;

                    //                 if (!fs.existsSync(filePath)) { // Check if file already exists
                    //                     // fs.writeFileSync(filePath, Buffer.from(imageData, 'base64'));
                    //                     console.log('Image saved:', filePath);
                    //                 } else {
                    //                     const options = {
                    //                         method: 'GET',
                    //                         headers: {
                    //                             'Content-Type': 'application/json',
                    //                             Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`
                    //                         }
                    //                     };

                    //                     fetch('https://api.cloudflare.com/client/v4/accounts/' + process.env.CLOUDFLARE_ACCOUNT_ID + '/images/v2', options)
                    //                         .then(response => response.json())
                    //                         .then(async response => {
                    //                             console.log("RESPONSE IMAGE ", response);
                    //                             if (response.result && response.result.length > 0) {
                    //                                 console.log("ResultImag", response.result);
                    //                                 // Add image to post
                    //                                 // await prisma.post.update({
                    //                                 //     where: { id: post.id },
                    //                                 //     data: { featureImage: "" },
                    //                                 // });
                    //                             }
                    //                         }
                    //                         )
                    //                         .catch(err => console.error(err));
                    //                     console.log('Image already exists:', filePath);
                    //                 }
                    //             } else {
                    //                 console.error('Image data not found in the response');
                    //             }
                    //         } else {
                    //             console.error('No choices found in the response');
                    //         }
                    //     })
                    //     .catch(err => console.error('Error fetching or processing response:', err));
                }
            }
        }
        // Return all posts and total number of pages
        return res.status(200).json({ message: posts, totalPages });
    } catch (error) {
        console.error('Error generating content:', error);
        return res.status(500).json({ error: error.message });
    }
}

