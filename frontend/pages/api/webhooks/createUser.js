import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { UserButton, useAuth } from "@clerk/nextjs";

export const createUserEntry = async () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
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
