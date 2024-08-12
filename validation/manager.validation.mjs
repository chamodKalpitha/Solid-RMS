import Joi from "joi";

export const createManagerSchema = Joi.object({
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

export const getAllManagerSchema = Joi.object({
  cursor: Joi.string().optional().messages({
    "string.base": "Cursor must be a string",
  }),
  take: Joi.number().integer().positive().optional().default(10).messages({
    "number.base": "Take must be a number",
    "number.integer": "Take must be an integer",
    "number.positive": "Take must be a positive number",
  }),
}).options({
  abortEarly: false,
});

export const updateManagerSchema = Joi.object({
  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE").messages({
    "any.only": "Status must be either ACTIVE or INACTIVE",
  }),
  outletId: Joi.number().integer().optional().messages({
    "number.base": "Outlet ID should be a number",
    "number.integer": "Outlet ID should be an integer",
    "any.required": "Outlet ID is a required field",
  }),
  employeeId: Joi.number().integer().optional().messages({
    "number.base": "Employee ID should be a number",
    "number.integer": "Employee ID should be an integer",
    "any.required": "Employee ID is a required field",
  }),
  user: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
  })
    .optional()
    .messages({
      "any.empty": "User is required.",
      "any.required": "User is required.",
    }),
}).options({
  abortEarly: false,
});

export const managerIdSchema = Joi.object({
  managerId: Joi.number().integer().required().messages({
    "number.base": "ID should be a number",
    "number.integer": "ID should be an integer",
    "any.required": "ID is required",
  }),
});
