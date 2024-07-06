import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    console.log(userId, "UserId from the backend");

    if (!userId) {
        return NextResponse.json({ message: "User ID is missing" }, { status: 400 });
    }

    try {
        const userNiche = await prisma.niche.findUnique({
            where: { userId: parseInt(userId, 10) }
        });

        if (userNiche) {
            return NextResponse.json({ userNiche });
        } else {
            return NextResponse.json({ message: "Niche not found for this user" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching niche:", error);
        return NextResponse.json({ message: "There is an error: " + error.message });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();
        const { niche, userId } = data;

        if (!niche || !userId) {
            return NextResponse.json({ message: "Niche or user ID not provided" }, { status: 400 });
        }

        let existingUser = await prisma.userShadow.findUnique({
            where: { userId: parseInt(userId, 10) }
        });

        if (!existingUser) {
            existingUser = await prisma.userShadow.create({
                data: { userId: parseInt(userId, 10) }
            });
        }

        const userNiche = await prisma.niche.upsert({
            where: { userId: existingUser.id },
            update: { name: niche },
            create: { userId: existingUser.id, name: niche }
        });

        return NextResponse.json({ userId: userId, userNiche });
    } catch (error) {
        console.error("Error submitting niche:", error);
        return NextResponse.json({ message: "There is an error: " + error.message });
    }
}



// export async function GET(req) {
//     try {
//         const url = new URL(req.url);
//         const userId = url.searchParams.get('userId');

//         console.log("UserId", userId);

//         if (!userId) {
//             return NextResponse.json({ message: 'User ID not provided' }, { status: 400 });
//         }

//         const userNiche = await prisma.niche.findUnique({
//             where: { userId: userId },
//         });

//         if (userNiche) {
//             return NextResponse.json({ userNiche });
//         } else {
//             return NextResponse.json({ message: 'Niche not found for this user' }, { status: 404 });
//         }
//     } catch (error) {
//         console.error('Error fetching niche:', error);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }

// export async function POST(req) {
//     try {
//         const data = await req.json();
//         const { niche, userId } = data;

//         if (!niche || !userId) {
//             return NextResponse.json({ message: 'Niche or user ID not provided' }, { status: 400 });
//         }

//         // Check if user already exists
//         let existingUser = await prisma.userShadow.findUnique({
//             where: { userId: userId },
//         });

//         // If user doesn't exist, create a new user
//         if (!existingUser) {
//             existingUser = await prisma.userShadow.create({
//                 data: { userId: userId },
//             });
//         }

//         // Upsert the niche, linking it to the user
//         const userNiche = await prisma.niche.upsert({
//             where: { userId: existingUser.userId },
//             update: { name: niche },
//             create: { userId: existingUser.userId, name: niche },
//         });

//         return NextResponse.json({ userId: userId, userNiche });
//     } catch (error) {
//         console.error('Error:', error);
//         return NextResponse.json({ message: 'There is an error: ' + error.message }, { status: 500 });
//     }
// }
