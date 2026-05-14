import nodemailer from "nodemailer";
import { env } from "../../../../config/env.service.js";



const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:env.appEmail,
        pass:env.appPassword
    }
})

export const sendEmail = async ({to , subject , html } = {})=>{
    let emailInfo = await transport.sendMail({
        to,
        from:`'mostafa meligy' <${env.appEmail}>`,
        subject,
        html
    })
    console.log("send sucessfully ", emailInfo);
    
}