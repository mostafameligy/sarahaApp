import mongoose from "mongoose";
import { env } from "../../config/index.js";

export const dbConnection = async () => {
    await mongoose.connect(env.uri).then(()=>{
        console.log("data base connection sucessfully");
    }).catch((error)=>{
        console.log(error);
    })
};
