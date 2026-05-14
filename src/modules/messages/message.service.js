import { env } from "../../../config/env.service.js";
import { BadRequestException } from "../../common/index.js";
import { deleteById, findAll, findById, insertOne, userModel } from "../../DB/index.js";
import { messageModel } from "../../DB/index.js";


export const sendMessage = async(req , userId)=>{
    const {message } = req.body;
    console.log(req.file);
    
    
    const reciverReslut = await findById({model:userModel , id:userId});    
    if(!reciverReslut){
       return  BadRequestException({message :"invalid user"})
    }
    let imageLink = '';
    if(req.file.filename){
        imageLink =`${env.baseUrl}upload/generl/${req.file.filename}`
    }
    const addMessage = await insertOne({model : messageModel , data:{message , image:imageLink , receverId:userId , senderId:req.userId}})
    if(addMessage){
        return addMessage;
    }
    BadRequestException({message:"message send failed"});
}

export const getAllMessages = async (req)=>{
    
    const messagesSender = await findAll({model : messageModel , filter : {senderId : req.userId }});
    const messagesResver = await findAll({model : messageModel , filter : {receverId : req.userId }});

    return {
       sendedMessages: messagesSender ,
       recevedMessages: messagesResver
    };
}

export const getMessageById = async(req)=>{
        const {id} = req.params;
    
    const reslut = await findById({model:messageModel , id});
    if(reslut){
        if(reslut.receverId == req.userId || reslut.senderId == req.userId ){
            return reslut
        }
    }
    return BadRequestException({message:"message not found"});
}

export const removeMessage = async(req)=>{
    const {id} = req.params;
    const checkMessage = await findById({model:messageModel , id});
    if(checkMessage){
        if(checkMessage.receverId == req.userId || checkMessage.senderId == req.userId ){
            const reslut = await deleteById({model :messageModel , id})
            return reslut;
        }
    }
    return  BadRequestException({message:"message not found"})
} 


