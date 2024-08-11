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
        quantity: Joi.number().required().messages({
          "number.base": "Quantity should be a number",
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

export const dishIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number.",
    "number.integer": "ID must be an integer.",
    "number.positive": "ID must be a positive number.",
    "any.required": "ID is required.",
  }),
}).options({
  abortEarly: false,
});


export const dishUpdateSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.empty': 'Name cannot be empty.',
  }),
  price: Joi.number().positive().precision(2).optional().messages({
    'number.base': 'Price must be a number.',
    'number.positive': 'Price must be positive.',
    'number.precision': 'Price must have at most two decimal places.',
  }),
  estimatedCount: Joi.number().integer().optional().messages({
    'number.base': 'Estimated Count must be a number.',
    'number.integer': 'Estimated Count must be an integer.',
  }),
  url: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .optional()
    .messages({
      'string.uri': 'URL must be a valid HTTP or HTTPS URL.',
    }),
}).options({ abortEarly: false });

export const dishIngredientsSchema = Joi.object({
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().positive().optional().messages({
          'number.base': 'Ingredient ID must be a number.',
          'number.integer': 'Ingredient ID must be an integer.',
          'number.positive': 'Ingredient ID must be positive.',
        }),
        quantity: Joi.number().positive().optional().messages({
          'number.base': 'Quantity must be a number.',
          'number.positive': 'Quantity must be positive.',
        }),
      })
    )
    .optional()
    .messages({
      'array.base': 'Ingredients must be an array.',
    }),
}).options({ abortEarly: false });