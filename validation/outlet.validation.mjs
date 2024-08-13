import Joi from "joi";

export const createOutletSchema = Joi.object({
  location: Joi.string().required().messages({
    "string.base": "Location should be a type of text",
    "string.empty": "Location cannot be an empty field",
    "any.required": "Location is a required field",
  }),
});

export const getAllOutletSchema = Joi.object({
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

export const pacthOutletSchema = Joi.object({
  location: Joi.string().optional().messages({
    "string.base": "Location should be a type of text",
    "string.empty": "Location cannot be an empty field",
    "any.required": "Location is a required field",
  }),
  menuId: Joi.number().integer().optional().messages({
    "array.base": "Menu IDs should be an array",
    "number.base": "Menu ID should be a number",
    "number.integer": "Menu ID should be an integer",
    "any.required": "Menu IDs are required",
  }),
});

export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.positive": "ID must be a positive number",
    "any.required": "ID is required",
  }),
});
