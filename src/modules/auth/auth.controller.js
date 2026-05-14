import {  Router } from "express";
import { generateNewAcessToken, getUserById, signIn, signUp, logout, verifyEmail, forgetPassword, resetPassword } from "./auth.service.js";
import { auth, BadRequestException, extantion, NotFoundException, SucessResponse, validation } from "../../common/index.js";
import { signInSchame, signUpSchame } from "./auth.validation.js";
import { useMulter } from "../../common/middleware/multer.middelware.js";
const router = Router();

function createMainPathToFile(file){
  file.mainPath = `${file.destination}/${file.filename}`
}

function createMainPathToFiles(files){
   files.map((element)=>{
          element.map((file)=>{
          createMainPathToFile(file)
      })
  })
}

router.get("/", (req, res) => {
  res.status(200).json({ message: "auth sucessfully" });
});


router.post("/signUp" ,useMulter().single("image") , validation(signUpSchame),async (req, res)=>{
  
   
  const reslut =  await signUp(req.body ,req.file.filename)
  return SucessResponse({res , status : 201, message:"added sucessfully" , data : reslut});
})

router.post("/verify" , async(req , res) =>{
  const data = await verifyEmail(req.body);
  
  if(data){
  return SucessResponse({res , status : 200, message:"verifyed sucessfully" , data});
  }
    return BadRequestException({message:'error in verify try again later'});

})


router.get("/signIn", validation(signInSchame), async(req , res)=>{
  
  const reslut = await signIn(req.body , `${req.protocol}://${req.host}` , req.userId);
  return SucessResponse({res , message :"login sucessfully" , data : reslut})
})


router.get("/getUserById" , auth , async(req ,res)=>{  
    const reslut = await getUserById(req.userId);
    if(reslut){
      return  SucessResponse({res , data : reslut})
    }
    return NotFoundException({message:'user not found'})
})

router.get("/generateAcessToken" , (req, res )=>{
    const {authorization} = req.headers
    const newAcessToken = generateNewAcessToken(authorization)
    return SucessResponse({res , status : 201 , message :"sucess created new acess token" , data:newAcessToken}); 
})


router.post("/testMulterSingle" , useMulter({folderPath: "mostafa/profile/images" , allowedExtention:extantion.images , maxSize : 1}).single("image") , (req , res)=>{
    req.file.mainPath =`${req.file.destination}/${req.file.filename}`;
    SucessResponse({res , data:{file :req.file , body:req.body} });
}) 


router.post("/logout", auth , async (req , res)=>{
    await logout(req);
    return SucessResponse({res , message:"loged out sucessfully"});
})

router.post('/forgetPassword' ,async(req ,res)=>{
    const data = await forgetPassword(req.body);
   return SucessResponse({res , data})
})

router.put("/resetPassword" , auth , async(req , res)=>{
  const {otp , email , newPassword } = req.body
  const data = await resetPassword({otp , email , newPassword }) ;

  return SucessResponse({res , message:"password changed sucessfully" , data })
}  )

export default router;
