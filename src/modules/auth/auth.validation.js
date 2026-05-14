import joi from "joi";
export const signUpSchame = joi
  .object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    profilName : joi.string().required(),
    password: joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required().messages({
      "string.pattern.base" :"password must be contain a captial character at latest and 7 antother character and a number at latest",
    }),
    gender: joi.string().valid("male", "female"),
  })
  .required();

export const signInSchame = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().min(3).max(30).alphanum().required(),
  })
  .required();