import { PrismaClient } from "@prisma/client";

const prismaClientPropertyName = "__prevent_name_collision_prisma";

type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else {
    const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
    if (!newGlobalThis[prismaClientPropertyName]) {
      newGlobalThis[prismaClientPropertyName] = new PrismaClient();
    }
    return newGlobalThis[prismaClientPropertyName];
  }
};

const prisma = getPrismaClient();

export default prisma;
