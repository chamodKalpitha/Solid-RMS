import Joi from "joi";

export default Joi.object({
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
