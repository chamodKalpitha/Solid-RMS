import Joi from "joi";

const menuSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  dishIds: Joi.array()
    .items(Joi.number().integer().required())
    .required()
    .messages({
      "array.base": "Dish IDs should be an array",
      "number.base": "Dish ID should be a number",
      "number.integer": "Dish ID should be an integer",
      "any.required": "Dish IDs are required",
    }),
}).options({
  abortEarly: false,
});

export default menuSchema;


export const menuIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  }),
}).options({
  abortEarly: false,
});

export const updateMenuSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  dishIds: Joi.array()
    .items(Joi.number().integer().required())
    .optional()
    .messages({
      "array.base": "Dish IDs should be an array",
      "number.base": "Dish ID should be a number",
      "number.integer": "Dish ID should be an integer",
      "any.required": "Dish IDs are required",
    }),
}).options({
  abortEarly: false,
})