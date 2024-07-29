import Joi from "joi";

const ownerSchema = Joi.object({
  brNo: Joi.string().required(),
  companyName: Joi.string().required(),
  address: Joi.string().optional(),
  contactNo: Joi.string().required(),
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid("ADMIN", "OWNER", "MANAGER", "ASSISTANT")
      .required(),
  }).required(),
});

export default ownerSchema;
