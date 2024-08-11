import Joi from "joi";

export const createInventoryRequestSchema = Joi.object({
  managerId: Joi.number().integer().positive().optional().messages({
    "number.base": "Manager ID must be a number.",
    "number.integer": "Manager ID must be an integer.",
    "number.positive": "Manager ID must be a positive number.",
  }),
  ingredients: Joi.array()
    .items(
      Joi.object({
        ingredientId: Joi.number().integer().required(),
        quantity: Joi.number().required().min(0.01),
      })
    )
    .min(1)
    .required(),
}).options({
  abortEarly: false,
});

export const getAllInventoryRequestSchema = Joi.object({
  cursor: Joi.string().optional().messages({
    "string.base": "Cursor must be a string",
  }),
  take: Joi.number().integer().positive().optional().default(10).messages({
    "number.base": "Take must be a number",
    "number.integer": "Take must be an integer",
    "number.positive": "Take must be a positive number",
  }),
}).options({
  abortEarly: false,
});

export const updateInventoryRequestSchema = Joi.object({
  status: Joi.string().valid("APPROVED", "REJECTED").required().messages({
    "string.empty": "Status is required.",
    "any.only": "Status must be either PENDING, APPROVED, or REJECTED.",
    "any.required": "Status is a required field.",
  }),
}).options({
  abortEarly: false,
});

export const requestIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Request ID should be a number",
    "number.integer": "Request ID should be an integer",
    "any.required": "Request ID is a required field",
  }),
}).options({
  abortEarly: false,
});
