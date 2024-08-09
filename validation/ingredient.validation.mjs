import Joi from "joi";

export const createnew = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  unit: Joi.string().required().messages({
    "string.empty": "Unit is required.",
    "any.required": "Unit is required.",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "The price must be a number.",
    "number.positive": "The price must be a positive number.",
    "number.precision": "The price can have at most 2 decimal places.",
    "any.required": "The price is a required field.",
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
}).options({
  abortEarly: false,
});

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  }),
}).options({
  abortEarly: false,
});

export const ingredientUpdateSchema = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Name cannot be empty.",
  }),
  unit: Joi.string().optional().messages({
    "string.empty": "Unit cannot be empty.",
  }),
  price: Joi.number().positive().precision(2).optional().messages({
    "number.base": "The price must be a number.",
    "number.positive": "The price must be a positive number.",
    "number.precision": "The price can have at most 2 decimal places.",
    "any.required": "The price is a required field.",
  }),
  url: Joi.string()
    .uri({
      scheme: ["http", "https"],
    })
    .optional()
    .messages({
      "string.uri": "The URL must be a valid HTTP or HTTPS URL.",
      "any.required": "The URL is a required field.",
    }),
}).options({
  abortEarly: false,
});
