import Joi from "joi";

export default Joi.object({
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE").messages({
    "any.only": "Status must be either ACTIVE or INACTIVE",
  }),
  outletId: Joi.number().integer().required().messages({
    "number.base": "Outlet ID should be a number",
    "number.integer": "Outlet ID should be an integer",
    "any.required": "Outlet ID is a required field",
  }),
  employeeId: Joi.number().integer().required().messages({
    "number.base": "Employee ID should be a number",
    "number.integer": "Employee ID should be an integer",
    "any.required": "Employee ID is a required field",
  }),
  user: Joi.object({
    name: Joi.string().required(),
    role: Joi.string().valid("MANAGER").required().messages({
      "string.empty": "Role is required.",
      "any.only": "Role must be MANAGER",
      "any.required": "Role is required.",
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
    .required()
    .messages({
      "any.empty": "User is required.",
      "any.required": "User is required.",
    }),
}).options({
  abortEarly: false,
});
