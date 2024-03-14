import prisma from "../../../lib/db";

//Import conversational tool to respond to messages

export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
}
