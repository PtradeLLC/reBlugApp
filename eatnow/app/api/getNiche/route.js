// app/api/getNiche/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        console.log("GET request received");
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');
        const email = searchParams.get('email');

        console.log("Extracted userId:", userId);
        console.log("Extracted email:", email);

        if (!userId || typeof userId !== 'string') {
            console.log("Invalid user ID");
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        if (!email || typeof email !== 'string') {
            console.log("Invalid email");
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        // Upsert user
        const user = await prisma.user.upsert({
            where: { id: userId },
            update: { email },
            create: { id: userId, email },
        });

        const userShadow = await prisma.userShadow.findUnique({
            where: { userId },
            include: { niche: true },
        });

        console.log("Database ShadowQuery result:", userShadow);
        console.log("Database UserQuery result:", user);

        if (!userShadow) {
            console.log("UserShadow not found");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ userNiche: userShadow.niche?.name }, { status: 200 });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}






// // app/api/getNiche/route.js
// import { NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req) {
//     try {
//         const { niche, userId } = await req.json();

//         if (!userId || typeof userId !== 'string') {
//             return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
//         }

//         if (!niche || typeof niche !== 'string') {
//             return NextResponse.json({ error: 'Invalid niche' }, { status: 400 });
//         }


//         const nicheRecord = await prisma.niche.upsert({
//             where: { name: niche },
//             update: {},
//             create: { name: niche },
//         });


//         console.log("NICHE REC", nicheRecord);
//         console.log("ID FROM API", userId);


//         // Update or create user shadow with the new niche
//         const updatedUserShadow = await prisma.userShadow.upsert({
//             where: { userId },
//             update: { niche: { connect: { id: nicheRecord.id } } },
//             create: { userId, niche: { connect: { id: nicheRecord.id } } },
//         });


//         return NextResponse.json({ message: 'Niche updated successfully', updatedUserShadow }, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }


// export async function GET(req) {
//     try {
//         console.log("GET request received");
//         const { searchParams } = new URL(req.url);
//         const userId = searchParams.get('userId');

//         console.log("Extracted userId:", userId); //APPWRITE USER

//         if (!userId || typeof userId !== 'string') {
//             console.log("Invalid user ID");
//             return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
//         }

//         const userShadow = await prisma.userShadow.findUnique({
//             where: { userId },
//             include: { niche: true },
//         });

//         console.log("Database query result:", userShadow);

//         if (!userShadow) {
//             console.log("User not found");
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json({ userNiche: userShadow.niche?.name }, { status: 200 });
//     } catch (error) {
//         console.error("Internal Server Error:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }