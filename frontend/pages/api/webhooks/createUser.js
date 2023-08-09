import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    const { email, firstName } = req.body;


    const userInfo = await prisma.user.create({
      data: {
        email,
        firstName,
      },
    });

    return res.status(200).json({ message: "This file should not exist haha" });
  } catch (error) {
    console.error("Error creating user entry:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
