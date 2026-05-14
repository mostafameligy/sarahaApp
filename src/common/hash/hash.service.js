import { compare, hash } from "bcrypt"
import { env } from "../../../config/index.js"

export const generateHash = async(plantext)=>{
   return await hash(plantext , +env.salt);
}

export const compareHash = async (text , hashedText)=>{
    return await compare(text , hashedText)
}
