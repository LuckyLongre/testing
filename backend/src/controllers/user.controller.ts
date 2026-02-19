import { PrismaClient } from "@prisma/client"; // { Prisma, PrismaClient }
const prisma = new PrismaClient();


export const createUser = async (req: any, res: any) => {
  try {
    const { fullName, email, password ,desc ,role } = req.body;
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
        desc,
        role
      } as any,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};