// src/prisma/client.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log("Prisma Client odłączony.");
});

export default prisma;