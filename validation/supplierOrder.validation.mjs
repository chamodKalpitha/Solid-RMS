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
