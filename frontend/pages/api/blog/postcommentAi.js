import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export default async function handler(req, res) {
    // const { email } = req.body;
    const email = "info@publictrades.com"

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true
        }
    })

    const posts = await prisma.post.findMany({
        where: {
            userId: user.id
        },
        include: {
            comments: true
        }
    })
    console.log(posts);

    res.status(200).json(posts);
}
