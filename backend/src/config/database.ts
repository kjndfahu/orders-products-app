import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const testConnection = async (): Promise<boolean> => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database connection failed:', message);
    return false;
  }
};

const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
};

export { prisma, testConnection, disconnectDatabase };
