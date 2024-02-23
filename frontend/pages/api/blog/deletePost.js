import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handle(req, res) {
    const result = await prisma.post.delete({
        where: {
            id: req.query.id,
        }
    });
    res.json(result);
}
