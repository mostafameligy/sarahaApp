import joi from "joi";

export const messageSchame = joi.object({
    message : joi.string().min(5).max(50).required()
}).required()