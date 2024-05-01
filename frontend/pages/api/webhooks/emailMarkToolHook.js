import prisma from "../../../lib/db";

//Import Email ChatBot to respond to messages

export default function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
}
