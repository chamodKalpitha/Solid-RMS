import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be empty",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),

  password: Joi.string().min(8).required().messages({
    "string.base": "Password should be a type of text",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is a required field",
  }),
}).options({
  abortEarly: false,
});
