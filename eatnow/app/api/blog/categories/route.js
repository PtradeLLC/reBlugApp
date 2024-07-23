import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const allCategories = await prisma.category.findMany();

        return new Response(JSON.stringify(allCategories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prisma.$disconnect();
    }
}