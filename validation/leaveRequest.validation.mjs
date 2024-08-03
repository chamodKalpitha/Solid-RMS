import Joi from "joi";

export default Joi.object({
  type: Joi.string()
    .valid("SICK", "CASUAL", "NOPAY", "SHORT", "HALFDAY")
    .required()
    .messages({
      "any.only":
        "Leave type must be one of SICK, CASUAL, NOPAY, SHORT, or HALFDAY",
      "any.required": "Leave type is a required field",
    }),
  from: Joi.date().required().messages({
    "date.base": "From date should be a valid date",
    "any.required": "From date is a required field",
  }),
  noOfDate: Joi.number().integer().min(1).required().messages({
    "number.base": "Number of days should be a number",
    "number.integer": "Number of days should be an integer",
    "number.min": "Number of days should be at least 1",
    "any.required": "Number of days is a required field",
  }),
  reason: Joi.string().required().messages({
    "string.empty": "Reason is required",
    "any.required": "Reason is a required field",
  }),
  employeeId: Joi.number().integer().required().messages({
    "number.base": "Employee ID should be a number",
    "number.integer": "Employee ID should be an integer",
    "any.required": "Employee ID is a required field",
  }),
  managerId: Joi.number().integer().positive().optional().messages({
    "number.base": "Manager ID must be a number.",
    "number.integer": "Manager ID must be an integer.",
    "number.positive": "Manager ID must be a positive number.",
  }),
}).options({
  abortEarly: false,
});
