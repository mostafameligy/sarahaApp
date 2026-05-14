import { Router } from "express";
import { auth, SucessResponse, validation } from "../../common/index.js";
import { deleteUser, getUserByUrl, getUserData, getUserUrl, updateProfile } from "./user.service.js";
import { getDataByUrl, updateProfileValidation } from "./user.validation.js";
import { useMulter } from "../../common/middleware/multer.middelware.js";

const router = Router();

router.get("/getUserInfo", auth, async(req, res) => {
    const reslut = await getUserData(req.userId);
    SucessResponse({res , message:"sucess" , data:reslut});
});
router.get("/getUserUrl" , auth , async(req , res)=>{
    const reslut = await getUserUrl(req.userId);
    SucessResponse({res , message:"sucess" , data:reslut})
})
router.get("/getUserByUrl" ,validation(getDataByUrl) , async(req, res)=>{
    const reslut = await getUserByUrl(req.body.url);
    SucessResponse({res , message:"sucess" , data:reslut});
})

router.delete("/deleteUser" , auth , async(req , res)=>{
    const reslut = await deleteUser(req.userId) 
    SucessResponse({res , message:"deleted sucessfully" });
})

router.patch("/updateProfile" ,useMulter().single("image") , validation(updateProfileValidation) , auth , async(req ,res)=>{
    let reslut ;
    if(req.file){
        reslut = await updateProfile(req.body , req.userId , req.file.filename);
        
    }else{
        reslut = await updateProfile(req.body , req.userId);
        
    }
    SucessResponse({res , message:"Updated sucessfully" , data:reslut});
})

export default router;
