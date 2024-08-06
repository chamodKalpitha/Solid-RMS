import prisma from "./prisma/prismaClient.mjs";

async function main() {
  // Create Owners
  for (let i = 0; i < 5; i++) {
    const owner = await prisma.owner.create({
      data: {
        brNo: faker.datatype.uuid(),
        companyName: faker.company.name(),
        user: {
          create: {
            name: faker.name.findName(),
            role: "OWNER",
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        },
        address: faker.address.streetAddress(),
        url: faker.internet.url(),
        contactNo: faker.phone.number(),
      },
    });

    // Create Outlets for each Owner
    for (let j = 0; j < 3; j++) {
      await prisma.outlet.create({
        data: {
          location: faker.address.city(),
          ownerId: owner.id,
        },
      });
    }

    // Create Ingredients for each Owner
    for (let k = 0; k < 10; k++) {
      await prisma.ingredient.create({
        data: {
          name: faker.commerce.productName(),
          unit: faker.helpers.arrayElement(["kg", "liters", "units"]),
          price: parseFloat(faker.commerce.price()),
          url: faker.image.imageUrl(),
          ownerId: owner.id,
        },
      });
    }

    // Create Dishes for each Owner
    for (let l = 0; l < 5; l++) {
      await prisma.dish.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
          url: faker.image.food(),
          estimatedCount: faker.datatype.number({ min: 10, max: 100 }),
          ownerId: owner.id,
        },
      });
    }

    // Create Employees for each Owner
    for (let m = 0; m < 20; m++) {
      await prisma.employee.create({
        data: {
          name: faker.name.findName(),
          nicNo: faker.datatype.uuid(),
          address: faker.address.streetAddress(),
          contactNo: faker.phone.number(),
          emgConNo: faker.phone.number(),
          emgConName: faker.name.findName(),
          designation: faker.name.jobTitle(),
          isCritical: faker.datatype.boolean(),
          salary: parseFloat(faker.commerce.price()),
          url: faker.image.avatar(),
          ownerId: owner.id,
          outletId: faker.datatype.number({ min: 1, max: 3 }), // Adjust based on the outlet creation
        },
      });
    }

    // Create Suppliers for each Owner
    for (let n = 0; n < 5; n++) {
      await prisma.supplier.create({
        data: {
          name: faker.company.name(),
          email: faker.internet.email(),
          address: faker.address.streetAddress(),
          contactNo: faker.phone.number(),
          ownerId: owner.id,
        },
      });
    }
  }
}

main()
  .then(() => {
    console.log("Seed data created successfully!");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
