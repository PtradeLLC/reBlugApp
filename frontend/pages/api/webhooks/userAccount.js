import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { data } = req.body;

  const { email_addresses } = data;
  let emailObj = email_addresses.map((email) => {
    const { id, email_address } = email;
    return { id, email_address };
  });

  if (req.method === "POST") {
    if (data) {
      try {
        const prisma = new PrismaClient(); // Instantiate Prisma client within the handler
        const user = await prisma.user.create({
          data: {
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
    } else {
      console.log("no data")
    }
  }
}
