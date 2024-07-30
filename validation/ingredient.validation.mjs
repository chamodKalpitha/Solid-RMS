import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  unit: Joi.string().required().messages({
    "string.empty": "Unit is required.",
    "any.required": "Unit is required.",
  }),
}).options({
  abortEarly: false,
});
