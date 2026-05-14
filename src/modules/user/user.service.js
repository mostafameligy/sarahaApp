import { env } from "../../../config/index.js";
import { BadRequestException, ConflictException } from "../../common/index.js";
import { deleteById, findOne, updateById } from "../../DB/database.service.js";
import { userModel } from "../../DB/model/user.model.js";

const createGender = (gender)=>{
    if(gender.toLowerCase()=="male"){
        return 0;
    }else if(gender.toLowerCase()=="female"){
        return 1;
    }
}


const findUserByEmail = async (email)=>{
    const reslut = await findOne({model:userModel , filter:{ email }})
    if(reslut){
        return true; 
    }
    return false;
}
const findUserByProfileName = async (profilName)=>{
    const reslut = await findOne({model:userModel , filter:{ profilName }})
    if(reslut){
        return true; 
    }
    return false;
}
export const getUserData = async(userId) => {
   const reslut = await findOne({model:userModel , filter:{_id:userId} , select :"fristName lastName profilName email"})
    if(reslut){
        return reslut; 
    }
    throw BadRequestException({message:"user not found"})
  
};

export const getUserUrl = async(userId)=>{
      const reslut = await findOne({model:userModel , filter:{_id:userId}})      
    if(reslut){
        return `${env.baseUrl}${reslut.profilName}`
    }
    throw  BadRequestException({message:"user not found"})
}
export const getUserByUrl = async(url)=>{
    let profilUrl = url.split("/")
    const profilName = profilUrl[profilUrl.length -1];
    
    const reslut = await findOne({model:userModel , filter:{profilName} , select :"fristName lastName profilName email"})
    if(reslut){
        return reslut; 
    }
    throw BadRequestException({message:"user not found"})
     
}

export const updateProfile = async (data , id , file)=>{
    const {name , email , profilName , gender} = data;
    if(file){
        const image = `${env.baseUrl}upload/${file}`
        data.image = image;
    }
    if(name){
       let [fristName , lastName] = name.split(" ");
        data.fristName = fristName || " ";
        data.lastName = lastName || " "
    }
    if(email){
       if(await findUserByEmail(email)){
            throw BadRequestException({message:"email already exist"})
        }
    }
    if(profilName){
       if(await findUserByEmailOrprofileName(profilName)){
            throw BadRequestException({message:"profilName already exist"})
        }
    }
    if(gender){
        data.gender = createGender(gender)
    }

    const reslut = await updateById({model :userModel , id , data} );
    if(reslut){
        return reslut;
    }
    throw BadRequestException({message:"user not found"})
}   

export const deleteUser =  async(id)=>{
    const user = await  findOne({model:userModel , filter:{_id :id } })
    if(user){
        const reslut = await deleteById({model:userModel , id });
        console.log(reslut);
        if(reslut){
            return reslut
        }
    }
    throw BadRequestException({message:"user not found"})

}