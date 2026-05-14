import joi from "joi";

export const getDataByUrl = joi.object({
    url :joi.string().pattern(/^[A-Za-z0-9:\/]+$/).required()
}).required()

export const updateProfileValidation =  joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().email(),
    profilName : joi.string(),
    gender: joi.string().valid("male", "female").custom((value)=>{
        value == "male" ? 0:1;
    }),
})