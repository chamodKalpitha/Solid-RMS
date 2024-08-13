import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Phone number is required.",
    "any.required": "Phone number is required.",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
    "any.required": "Address is required.",
  }),
  ingredients: Joi.array()
    .items(Joi.number().integer().required())
    .required()
    .messages({
      "array.base": "Ingredient IDs should be an array",
      "number.base": "Ingredient ID should be a number",
      "number.integer": "Ingredient ID should be an integer",
      "any.required": "Ingredient IDs are required",
    }),
}).options({
  abortEarly: false,
});

export const suplierIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  }),
}).options({
  abortEarly: false,
});

export const updatSupllierSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Name is required.",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Please provide a valid email address.",
  }),
  contactNo: Joi.string().optional().messages({
    "string.empty": "Phone number is required.",
  }),
  address: Joi.string().optional().messages({
    "string.empty": "Address is required.",
  }),
  ingredients: Joi.array()
    .items(Joi.number().integer().required())
    .optional()
    .messages({
      "array.base": "Ingredient IDs should be an array",
      "number.base": "Ingredient ID should be a number",
      "number.integer": "Ingredient ID should be an integer",
    }),
}).options({
  abortEarly: false,
});

export const getAllSupplierSchema = Joi.object({
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
