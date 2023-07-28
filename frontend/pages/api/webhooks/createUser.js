import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserEntry = async (email, firstName, lastName) => {
  try {
    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
      },
    });
    console.log(
      `User with email '${email}' successfully created in the database.`
    );
  } catch (error) {
    console.error(`Error creating user entry: ${error.message}`);
  }
};
