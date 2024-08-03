import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price should be a number",
    "any.required": "Price is required.",
  }),
  estimatedCount: Joi.number().integer().required().messages({
    "number.base": "Estimated Count should be a number",
    "number.integer": "Estimated Count should be an integer",
    "any.required": "Estimated Count is a required field",
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
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().required().messages({
          "number.base": "Ingredient ID should be a number",
          "number.integer": "Ingredient ID should be an integer",
          "any.required": "Ingredient ID is a required field",
        }),
        quantity: Joi.number().integer().required().messages({
          "number.base": "Quantity should be a number",
          "number.integer": "Quantity should be an integer",
          "any.required": "Quantity is a required field",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Ingredients should be an array",
      "any.required": "Ingredients are required.",
    }),
}).options({
  abortEarly: false,
});
