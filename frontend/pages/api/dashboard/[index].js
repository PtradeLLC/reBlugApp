"use client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Dashboard(req, res) {
  res.status(200).json({ message: "ok" });
}
