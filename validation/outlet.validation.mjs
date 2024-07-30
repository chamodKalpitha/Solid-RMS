import Joi from "joi";

export default Joi.object({
  location: Joi.string().required().messages({
    "string.base": "Location should be a type of text",
    "string.empty": "Location cannot be an empty field",
    "any.required": "Location is a required field",
  }),
});
