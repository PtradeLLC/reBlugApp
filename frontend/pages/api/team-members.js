import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function handler(req, res) {
    const { data } = req.body;
    try {
        if (req.method === "POST") {
            console.log("from backend", data);
        } else {
            console.log("There is an issue");
        }
        res.status(200).json({ name: 'John Doe' });
    } catch (error) {
        res.status(500).json({ message: `There is an error ${error}` })
    }
}
