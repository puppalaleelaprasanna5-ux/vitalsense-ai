import { prisma } from "../config/prisma";
import { hashPassword } from "../utils/hash";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await hashPassword(password);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}
