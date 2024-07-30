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
