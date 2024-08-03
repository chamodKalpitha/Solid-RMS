import Joi from "joi";

export const createnew = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  unit: Joi.string().required().messages({
    "string.empty": "Unit is required.",
    "any.required": "Unit is required.",
  }),
}).options({
  abortEarly: false,
});

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  }),
}).options({
  abortEarly: false,
});

export const ingredientUpdateSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Name cannot be empty.",
  }),
  unit: Joi.string().optional().messages({
    "string.empty": "Unit cannot be empty.",
  }),
}).options({
  abortEarly: false,
});
