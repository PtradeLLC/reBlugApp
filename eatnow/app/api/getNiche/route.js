// app/api/getNiche/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Handle GET request
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        console.log("id from server", userId);


        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        console.log("searchParams", searchParams);

        // const niches = await prisma.niche.findMany({
        //     where: {
        //         userShadows: {
        //             some: {
        //                 userId: userId,
        //             },
        //         },
        //     },
        // });

        // return NextResponse.json(niches, { status: 200 });
        return NextResponse.json({ message: "successfully done" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


// Handle POST request
// export async function POST(req) {
//     try {
//         const { niche, userId, email, name } = await req.json();

//         if (!userId || typeof userId !== 'string') {
//             return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
//         }

//         if (!email || typeof email !== 'string') {
//             return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
//         }

//         if (!name || typeof name !== 'string') {
//             return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
//         }

//         if (!niche || typeof niche !== 'string') {
//             return NextResponse.json({ error: 'Invalid niche' }, { status: 400 });
//         }

//         let user = await prisma.user.findUnique({
//             where: { id: userId },
//         });

//         if (user) {
//             user = await prisma.user.update({
//                 where: { id: userId },
//                 data: { email, name },
//             });
//         } else {
//             user = await prisma.user.create({
//                 data: { id: userId, email, name },
//             });
//         }

//         const nicheRecord = await prisma.niche.upsert({
//             where: { name: niche },
//             update: {},
//             create: { name: niche },
//         });

//         const updatedUserShadow = await prisma.userShadow.upsert({
//             where: { userId },
//             update: { niche: { connect: { id: nicheRecord.id } } },
//             create: { userId, niche: { connect: { id: nicheRecord.id } } },
//         });

//         return NextResponse.json({ message: 'Niche updated successfully', updatedUserShadow }, { status: 200 });
//     } catch (error) {
//         console.error("Server error:", error);
//         if (error.code === 'P2002' && error.meta.target.includes('email')) {
//             return NextResponse.json({ error: "A user with this email already exists." }, { status: 400 });
//         }
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }
