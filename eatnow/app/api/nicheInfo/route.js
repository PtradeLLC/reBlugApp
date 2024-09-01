import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ensure this route is always treated as dynamic to avoid static rendering errors
export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        // Extract the search parameters from the request URL
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID not provided" });
        }

        // Fetch the user's niche based on the provided userId
        const userNiche = await prisma.niche.findUnique({
            where: { userId },
        });

        if (userNiche) {
            // Return the niche name if found
            return NextResponse.json({ niche: userNiche.name });
        } else {
            // Return null if no niche is found for the user
            return NextResponse.json({ niche: null });
        }

    } catch (error) {
        console.error("Error fetching niche:", error);
        return NextResponse.json({ message: "There is an error: " + error.message });
    } finally {
        // Disconnect the Prisma client to avoid potential connection leaks
        await prisma.$disconnect();
    }
}



// import { NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(req) {
//     try {
//         const { searchParams } = new URL(req.url);

//         const userId = searchParams.get("userId");

//         if (userId) {
//             const userNiche = await prisma.niche.findUnique({
//                 where: { userId },
//             });

//             if (userNiche) {

//                 return NextResponse.json({ niche: userNiche.name });
//             } else {
//                 return NextResponse.json({ niche: null });
//             }
//         }

//         return NextResponse.json({ message: "User ID not provided" });
//     } catch (error) {
//         console.error("Error fetching niche:", error);
//         return NextResponse.json({ message: "There is an error: " + error.message });
//     }
// }
