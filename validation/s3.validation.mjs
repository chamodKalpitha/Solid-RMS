import Joi from "joi";

export default Joi.object({
  fileName: Joi.string().required().messages({
    "string.base": "file name should be a type of text",
    "string.empty": "file name cannot be an empty field",
    "any.required": "file name is a required field",
  }),
});
