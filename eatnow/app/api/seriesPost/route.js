import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const userId = req.headers.get('user-id');

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Fetch series with associated posts for the current user
        const seriesWithPosts = await prisma.series.findMany({
            where: { userId: userId },
            include: { posts: true },
        });

        return new Response(JSON.stringify(seriesWithPosts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { seriesIds, userId } = body;

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID is required" }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (Array.isArray(seriesIds) && seriesIds.length > 0) {
            const seriesWithPosts = await prisma.series.findMany({
                where: { id: { in: seriesIds }, userId: userId },
                include: { posts: true },
            });

            return new Response(JSON.stringify({ seriesWithPosts }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200,
            });
        } else {
            return new Response(JSON.stringify({ message: "No series IDs provided" }), {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error: " + error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}


///////////////////


// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { seriesIds } = body;

//         if (Array.isArray(seriesIds) && seriesIds.length > 0) {
//             const seriesWithPosts = await prisma.series.findMany({
//                 where: {
//                     id: {
//                         in: seriesIds,
//                     },
//                 },
//                 include: {
//                     posts: true, // This matches your Prisma schema
//                 },
//             });

//             // Return the fetched series with posts as JSON
//             return new Response(JSON.stringify({ seriesWithPosts }), {
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
//         console.error("Error fetching series and their posts:", error);
//         return new Response(JSON.stringify({ message: "There is an error: " + error.message }), {
//             headers: { 'Content-Type': 'application/json' },
//             status: 500,
//         });
//     }
// }
