import multer from "multer";
import fs from "fs"
import { extantion } from "../extentions/allowedExtention.js";

export const useMulter  = ({folderPath , allowedExtention , maxSize = 20} = {folderPath : "generl" , allowedExtention:extantion.images })=>{
    
    const storage  = multer.diskStorage({
        destination :function(req , file , cb){
            let path = `upload/${folderPath}`;
            if(!fs.existsSync(path)){
                fs.mkdirSync(path , {recursive :true})
            }
            cb(null , path)
        },
        filename: function(req , file , cb){
            let filename = Date.now() + "-" + file.originalname
            cb(null , filename)
        }
    })

    const fileFilter = function(req , file , cb){

        if(allowedExtention.includes(file.mimetype)){
            return cb(null,true)
        }  
        return cb(new Error("file type is not allowed") , false)
       
    }

    return multer({storage , fileFilter , limits: {fileSize :maxSize * 1024 * 1024 }})
}