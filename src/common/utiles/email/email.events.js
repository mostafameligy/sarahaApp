import EventEmitter from "events";
import { eventsKeys } from "./email.eventsKeys.js";
import { createHtmlEmail } from "./email.createMessage.js";
import { set } from "../../../DB/redis.service.js";
import { sendEmail } from "./sendEmail.js";
import { createOtpRedisKey } from "../../../modules/auth/auth.service.js";
import { generateHash } from "../../hash/hash.service.js";
export const events = new EventEmitter();

const createOtp = ()=>{
    let code = Math.floor(Math.random()*1000000);
    code = code.toString().padStart(6,"0");
    return code
}

const sendOtp = async(email , userId, subject)=>{
    let code = createOtp();
    await set({
        key: createOtpRedisKey(userId),
        value:await generateHash(code),
        ttl :60*5
    })
    await sendEmail({
        to : email,
        subject,
        html :createHtmlEmail(code)
    })
}

events.on(eventsKeys.verify , async (data)=>{
try {
    const {userId , email} =  data
    await sendOtp( email ,userId , "verify your email please");

} catch (error) {
    console.log(error);
}
})

events.on(eventsKeys.changePassword , async(data)=>{
    try {
    const {userId , email} =  data

    await sendOtp( email,userId  , "sucess")
    } catch (error) {
        console.log(error);
    }
})
