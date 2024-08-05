import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Fetch series along with their associated posts
        const seriesWithPosts = await prisma.series.findMany({
            include: {
                posts: true, // This matches your Prisma schema
            },
        });

        console.log("Series with posts", seriesWithPosts);

        return new Response(JSON.stringify(seriesWithPosts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error fetching series and their posts:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { seriesIds } = body;

        if (Array.isArray(seriesIds) && seriesIds.length > 0) {
            const seriesWithPosts = await prisma.series.findMany({
                where: {
                    id: {
                        in: seriesIds,
                    },
                },
                include: {
                    posts: true, // This matches your Prisma schema
                },
            });

            // Return the fetched series with posts as JSON
            return new Response(JSON.stringify({ seriesWithPosts }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        } else {
            // Return a message if no seriesIds are provided
            return new Response(JSON.stringify({ message: "No series IDs provided" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }
    } catch (error) {
        // Handle any errors that occur during the fetching process
        console.error("Error fetching series and their posts:", error);
        return new Response(JSON.stringify({ message: "There is an error: " + error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}





// // app/api/postsAndSeries/route.js
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req) {
//     try {
//         const postsWithSeries = await prisma.post.findMany({
//             include: {
//                 series: true,
//             },
//         });

//         console.log("Post with series", postsWithSeries);

//         return new Response(JSON.stringify(postsWithSeries), {
//             status: 200,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     } catch (error) {
//         console.error("Error fetching posts and their series:", error);
//         return new Response(JSON.stringify({ error: error.message }), {
//             status: 500,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//     }
// }





// export async function POST(req) {
//     try {

//         const body = await req.json();
//         const { seriesIds } = body;

//         if (Array.isArray(seriesIds) && seriesIds.length > 0) {

//             const seriesPosts = await prisma.post.findMany({
//                 where: {
//                     seriesId: {
//                         in: seriesIds,
//                     },
//                 },
//             });

//             // Return the fetched posts as JSON
//             return new Response(JSON.stringify({ seriesPosts }), {
//                 headers: { 'Content-Type': 'application/json' },
//                 status: 200,
//             });
//         } else {
//             // Return a message if no seriesIds are provided
//             return new Response(JSON.stringify({ message: "No series IDs provided" }), {
//                 headers: { 'Content-Type': 'application/json' },
//                 status: 400,
//             });
//         }
//     } catch (error) {
//         // Handle any errors that occur during the fetching process
//         console.error("Error fetching posts in series:", error);
//         return new Response(JSON.stringify({ message: "There is an error: " + error.message }), {
//             headers: { 'Content-Type': 'application/json' },
//             status: 500,
//         });
//     }
// }