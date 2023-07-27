import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const data = req.body;
  if (req.method === "POST") {
    try {
      const email = await prisma.emailList.create({ data });
      res.status(200).json({ message: "Email added to the waiting list." });
    } catch (error) {
      res.status(500).json({ message: `there is an error ${error}` });
    }
  }
}
