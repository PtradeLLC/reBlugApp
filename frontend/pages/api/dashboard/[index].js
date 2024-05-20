import { PrismaClient } from "@prisma/client";
import { authOptions } from "next-auth";
import { getServerSession } from "next-auth";


export default async function Dashboard(req, res) {
  const session = await getServerSession(authOptions)
  res.status(200).json({ message: "ok" });
}
