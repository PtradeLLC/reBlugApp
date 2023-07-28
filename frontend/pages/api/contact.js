import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, company, email, message } = req.body;

    try {
      // Create the contact in the database
      const formContact = await prisma.contact.create({
        data: {
          firstName,
          lastName,
          company,
          email,
          message,
        },
      });

      // Respond with a success message and the created contact
      res.status(201).json({
        message: "Contact added to the Contact list.",
        contact: formContact,
      });
    } catch (error) {
      // Check if the error is a Prisma Client validation error
      if (error instanceof Prisma.PrismaClientValidationError) {
        res.status(422).json({ message: "Validation error.", error });
      } else {
        // Handle other server errors
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error." });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
