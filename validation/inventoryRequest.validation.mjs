import Joi from "joi";

export default Joi.object({
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
