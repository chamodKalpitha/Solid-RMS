import prisma from "../prisma/prismaClient.mjs";

export async function registerOwner(req, res) {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      role: "OWNER",
      email: "john.doe@example.com",
      password: "securepassword",
      address: "123 Main St",
      contactNo: "1234567890",
      owner: {
        create: {
          brNo: "BR123456",
          companyName: "Doe Enterprises",
        },
      },
    },
    include: {
      owner: true,
    },
  });

  res.status(200).send(user);
}
