import { createClient } from "redis";
import { env } from "../../config/env.service.js";


export const client = createClient({
    url : env.redisUrl
})

client.on("error" , (err)=>{
    throw err
})

export const redisConnect = async()=>{
    try {
      await client.connect()
      console.log("redis connected sucessfully");
      
    } catch (error) {
        console.log(error);
        
    }
}