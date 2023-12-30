import { PrismaClient } from '@prisma/client';


//Import conversational tool to respond to messages

export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
}
