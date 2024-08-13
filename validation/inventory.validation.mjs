import Joi from "joi";

export const addItemSchema = Joi.object({
  inventoryId: Joi.number().integer().required().messages({
    "number.base": "Inventory ID should be a number",
    "number.integer": "Inventory ID should be an integer",
    "any.required": "Inventory ID is a required field",
  }),
  items: Joi.array()
    .items(
      Joi.object({
        ingredientId: Joi.number().integer().required().messages({
          "number.base": "Ingredient ID should be a number",
          "number.integer": "Ingredient ID should be an integer",
          "any.required": "Ingredient ID is a required field",
        }),
        quantity: Joi.number().required().messages({
          "number.base": "Quantity should be a number",
          "any.required": "Quantity is a required field",
        }),
      })
    )
    .required(),
}).options({
  abortEarly: false,
});

export const outletIdSchema = Joi.object({
  outletId: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.positive": "ID must be a positive number",
    "any.required": "ID is required",
  }),
});

export const updateInventoryBodySchema = Joi.object({
  ingredientId: Joi.number().integer().required().messages({
    "number.base": "Ingredient ID should be a number",
    "number.integer": "Ingredient ID should be an integer",
    "any.required": "Ingredient ID is a required field",
  }),
  quantity: Joi.number().positive().required().messages({
    "number.base": "Quantity should be a number",
    "number.positive": "Quantity should be a positive number",
    "any.required": "Quantity is a required field",
  }),
}).options({
  abortEarly: false,
});

export const inventoryIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.positive": "ID must be a positive number",
    "any.required": "ID is required",
  }),
});

export const removeItemSchema = Joi.object({
  ingredientId: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.positive": "ID must be a positive number",
    "any.required": "ID is required",
  }),
});
