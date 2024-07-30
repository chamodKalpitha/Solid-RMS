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
