import { BadRequestException } from "./utiles/response/error.response.js";

export const validation = (schame) => {

    return (req , res , next)=>{
        let { value, error } = schame.validate(req.body, { abortEarly: false });
        if (error) {
          return BadRequestException({ message: "failed", extra: error });
        }
        next()
    }
};

