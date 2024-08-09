import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  nicNo: Joi.string().required().messages({
    "string.empty": "NIC number is required.",
    "any.required": "NIC number is required.",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Address is required.",
    "any.required": "Address is required.",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required.",
    "any.required": "Contact number is required.",
  }),
  emgConNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required.",
    "any.required": "Emergency contact number is required.",
  }),
  emgConName: Joi.string().required().messages({
    "string.empty": "Emergency contact name is required.",
    "any.required": "Emergency contact name is required.",
  }),
  designation: Joi.string().required().messages({
    "string.empty": "Designation is required.",
    "any.required": "Designation is required.",
  }),
  isCritical: Joi.boolean().required().messages({
    "boolean.base": "Is Critical must be a boolean.",
    "any.required": "Is Critical is required.",
  }),
  salary: Joi.number().required().messages({
    "number.base": "Salary must be a number.",
    "any.required": "Salary is required.",
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
  outletId: Joi.number().integer().positive().required().messages({
    "number.base": "Outlet ID must be a number.",
    "number.integer": "Outlet ID must be an integer.",
    "number.positive": "Outlet ID must be a positive number.",
    "any.required": "Outlet ID is required.",
  }),
}).options({
  abortEarly: false,
});