import { Router } from "express";
import { auth, SucessResponse, validation } from "../../common/index.js";
import { messageSchame } from "./message.validation.js";
import { getAllMessages, getMessageById, removeMessage, sendMessage } from "./message.service.js";
import { useMulter } from "../../common/middleware/multer.middelware.js";
const router = Router()

router.get("/test" , (req ,res)=>{
    return SucessResponse({res , message:"message connecting sucessfully"})
})

router.post("/sendMessage/:userId" , auth , useMulter().single("image") , validation(messageSchame) ,async (req , res , next)=>{
    const {userId} = req.params;
    const reslut = await sendMessage(req ,userId );
    return SucessResponse({res , status:201 , message :"message added sucessfully " , data:reslut});
})
router.get("/getAllMessages" , auth , async (req , res)=>{
   const reslut = await getAllMessages(req);   
  return SucessResponse({res , status:201,  data:reslut})
})

router.get("/getMessageById/:id" , auth ,async (req ,res)=>{
    const reslut = await getMessageById(req)
    return SucessResponse({res , status:201 , data:reslut});
})

router.delete("/removeMessage/:id" , auth , async(req ,res)=>{
    const reslut = await removeMessage(req);
    return SucessResponse({res ,message :"message deleted sucessfully" , data : reslut})
})


export default router