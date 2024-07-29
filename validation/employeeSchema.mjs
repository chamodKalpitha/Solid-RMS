import Joi from "joi";

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  nicNo: Joi.string().required(),
  address: Joi.string().required(),
  contactNo: Joi.string().required(),
  emgConNo: Joi.string().required(),
  emgConName: Joi.string().required(),
  designation: Joi.string().valid("MANAGER", "ASSISTANT").required(),
  salary: Joi.number().required(),
  outletId: Joi.number().integer().required(),
  user: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid("ADMIN", "OWNER", "MANAGER", "ASSISTANT")
      .required(),
  }).required(),
});

export default employeeSchema;
