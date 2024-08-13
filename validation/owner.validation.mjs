import Joi from "joi";

export const createOwnerSchema = Joi.object({
  brNo: Joi.string().required().messages({
    "string.empty": "Business registration number is required.",
    "any.required": "Business registration number is required.",
  }),
  companyName: Joi.string().required().messages({
    "string.empty": "Company name is required.",
    "any.required": "Company name is required.",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string.",
  }),
  url: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .required()
    .messages({
      "string.uri": "The URL must be a valid HTTP or HTTPS URL.",
      "any.required": "The URL is a required field.",
    }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required.",
    "any.required": "Contact number is required.",
  }),
  user: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "User name is required.",
      "any.required": "User name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
    role: Joi.string().valid("OWNER", "MANAGER").required().messages({
      "string.empty": "Role is required.",
      "any.only": "Role must be OWNER",
      "any.required": "Role is required.",
    }),
  }).required(),
}).options({
  abortEarly: false,
});

export const getAllClientSchema = Joi.object({
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

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.positive": "ID must be a positive number",
    "any.required": "ID is required",
  }),
});

export const updateOwnerSchema = Joi.object({
  brNo: Joi.string().optional().messages({
    "string.empty": "Business registration number is required.",
  }),
  companyName: Joi.string().optional().messages({
    "string.empty": "Company name is required.",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string.",
  }),
  url: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .optional()
    .messages({
      "string.uri": "The URL must be a valid HTTP or HTTPS URL.",
    }),
  contactNo: Joi.string().optional().messages({
    "string.empty": "Contact number is required.",
  }),
  user: Joi.object({
    name: Joi.string().optional().messages({
      "string.empty": "User name is required.",
    }),
    email: Joi.string().email().optional().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  }).optional(),
}).options({
  abortEarly: false,
});
