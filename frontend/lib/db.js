import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

globalThis.prismaGlobal = globalThis.prismaGlobal || prismaClientSingleton();

const prisma = globalThis.prismaGlobal;

module.exports = prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
