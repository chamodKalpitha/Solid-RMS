import prisma from "../prisma/prismaClient.mjs";
import ownerSchema from "../validation/ownerSchema.mjs";

export async function registerOwner(req, res) {
  const { error, value } = ownerSchema.validate(req.body);
  const { brNo, companyName, address, contactNo, user } = value;
  let errors = [];

  try {
    // Validate with Joi
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Combine checks for unique brNo and contactNo in owner table
    const existingOwner = await prisma.owner.findFirst({
      where: {
        OR: [{ brNo }, { contactNo }],
      },
    });

    if (existingOwner) {
      if (existingOwner.brNo === brNo)
        errors.push("Business registration number already exists");
      if (existingOwner.contactNo === contactNo)
        errors.push("Contact No already exists");
    }

    // Check for unique email in iser table
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) errors.push("Email already exists");

    // If there are any errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ status: "fail", message: errors });
    }

    // Create new user & owner
    const newOwner = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        owner: {
          create: {
            brNo,
            companyName,
            address,
            contactNo,
          },
        },
      },
      include: {
        owner: true,
      },
    });

    // Return the newly created user with owner details
    res.status(201).json({
      status: "success",
      data: newOwner,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
}
