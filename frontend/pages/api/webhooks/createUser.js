import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // const session = await getSession({ req });
    // const { userId, email, firstName, lastName } = req.body;

    // if (!session || session.userId !== userId) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // const userInfo = await prisma.user.create({
    //   data: {
    //     userId,
    //     email,
    //     firstName,
    //   },
    // });

    return res.status(200).json({ message: "This file should not exist haha" });
  } catch (error) {
    console.error("Error creating user entry:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
