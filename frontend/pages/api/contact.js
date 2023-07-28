import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { firstName, lastName, company, email, message, agreed } = req.body;

  if (req.method === "POST") {
    try {
      const formContact = await prisma.Contact.create({
        firstName,
        lastName,
        company,
        email,
        phoneNumber,
        message,
        agreed,
      });
      res.status(200).json({ message: "Contact added to the Contact list." });
    } catch (error) {
      res.status(500).json({ message: `there is an error ${error}` });
    }
  }
}
