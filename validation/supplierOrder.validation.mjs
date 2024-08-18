import Joi from "joi";

export default Joi.object({
  supplierId: Joi.number().required().messages({
    "number.base": "Supplier ID must be a number",
    "any.required": "Supplier ID is required",
  }),
  ingredients: Joi.array()
    .items(
      Joi.object({
        ingredientId: Joi.number().required().messages({
          "number.base": "Ingredient ID must be a number",
          "any.required": "Ingredient ID is required",
        }),
        quantity: Joi.number().required().messages({
          "number.base": "Quantity must be a number",
          "any.required": "Quantity is required",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Ingredients must be an array",
      "any.required": "Ingredients are required",
    }),
});

export const getAllSupplierOrderSchema = Joi.object({
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

export const suplierOrderIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  }),
}).options({
  abortEarly: false,
});