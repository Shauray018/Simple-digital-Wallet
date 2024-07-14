import { PrismaClient } from '@prisma/client';

// Function to create and return a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global variable to hold the singleton PrismaClient instance
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Initialize PrismaClient instance, using the global singleton if available
const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export the PrismaClient instance as default
export default prisma;

// Assign the global singleton instance during development
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
