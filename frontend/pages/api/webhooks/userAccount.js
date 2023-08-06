import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { data } = req.body;

// Ensure the necessary properties exist in the request body
//   if (!data || !data.id || !data.external_id || !data.username || !data.first_name || !data.last_name || !data.image_url || !data.email_addresses) {
//     return res.status(400).json({ message: "Invalid request body" });
//   }

  const { email_addresses } = data;
  let emailObj = email_addresses.map((email) => {
    const { id, email_address } = email;
    return { id, email_address };
  });

  try {
    const prisma = new PrismaClient(); // Instantiate Prisma client within the handler
    const user = await prisma.user.create({
      data: {
        userId: data.id,
        externalId: data.external_id,
        Username: data.username,
        firstName: data.first_name,
        lastName: data.last_name,
        profileImage: data.image_url,
        email: emailObj[0].email_address,
      },
    });
    await prisma.$disconnect(); // Disconnect Prisma client after the operation
    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    res.status(500).json({ message: `Oops! there is an error: ${error.message}` });
  }
}
