import Joi from "joi";

export default Joi.object({
  brNo: Joi.string().required().messages({
    "string.empty": "Business registration number is required.",
    "any.required": "Business registration number is required.",
  }),
  companyName: Joi.string().required().messages({
    "string.empty": "Company name is required.",
    "any.required": "Company name is required.",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string.",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required.",
    "any.required": "Contact number is required.",
  }),
  user: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "User name is required.",
      "any.required": "User name is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required.",
    }),
    role: Joi.string().valid("OWNER").required().messages({
      "string.empty": "Role is required.",
      "any.only": "Role must be OWNER",
      "any.required": "Role is required.",
    }),
  }).required(),
}).options({
  abortEarly: false,
});
