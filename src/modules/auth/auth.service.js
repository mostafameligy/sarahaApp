import { env } from "../../../config/index.js";
import { BadRequestException, compareHash, ConflictException, creatToken, decodedRefreshToken, events, eventsKeys, generateHash, NotFoundException, providerEnums } from "../../common/index.js";
import { findById, findOne, insertOne, updateById } from "../../DB/index.js";
import { userModel } from "../../DB/model/user.model.js"
import jwt from "jsonwebtoken"
import { creatRevokeKey, get, redisDelete, set } from "../../DB/redis.service.js";
import { sendEmail } from "../../common/utiles/email/sendEmail.js";

export const createSigninRedisKey = (userId)=>{
    return `profileData::${userId}`;
}
export const createOtpRedisKey = (userId)=>{
    return `otp::${userId}`;
}


export const signUp = async (data,photoName)=>{
    const {name , email , password , profilName  } = data
    const checkUser = await findOne({model : userModel , filter :{email}});
    
    if(checkUser){
        ConflictException({message :"user already exist"});
    }
    let imageLink = ``
    if(photoName){
        imageLink = `${env.baseUrl}upload/generl/${photoName}`;
    }
    const hashedPassword = await generateHash(password);
    const addedUser = await insertOne({model : userModel , data : {name , email , password:hashedPassword ,profilName , image:imageLink }  });

    events.emit(eventsKeys.verify , {
        userId:addedUser._id,
        email
    })
    return addedUser;
}

export const signIn = async (data , issuer , userId)=>{
    const {email , password} = data;
    let checkUser = await get(createSigninRedisKey(userId))
    if(checkUser){
        return checkUser ;
    }
    checkUser = await findOne({model : userModel , filter :{email}});
    if(checkUser){
        const isMatchedPassword = await compareHash(password , checkUser.password);
        if(checkUser && isMatchedPassword && checkUser.provider == providerEnums.System ){    
            const {acessToken , refreshToken} = creatToken(checkUser);
            await set({
                key: createSigninRedisKey(userId),
                value: {checkUser , acessToken , refreshToken} ,
                ttl : 60*3
            })
            return {checkUser , acessToken , refreshToken};
        } 
    }
    NotFoundException({message :"invalid email or password or provider must be system"});
}

export const getUserById = async(userId)=>{
    const reslut = await findById({ model:userModel, id : userId});    
   return reslut;
}

export const generateNewAcessToken = (token)=>{
    const userData = decodedRefreshToken(token);
    let signture = undefined;
    switch(userData.aud){
        case "Admin":
            signture = env.adminSignture;
            break;
        default :
            signture = env.userSignture;
            break;
    }
    const newAcessToken =  jwt.sign({id:userData.id},signture , {audience : userData.aud ,expiresIn : "30m" });
    return newAcessToken;
}

export const logout = async(req)=>{
    `rovokeToken::${req.userId}::${req.token}`
    const revokeTokenKey = creatRevokeKey({userId :req.userId , token : req.token});

    await set({
        key :revokeTokenKey ,
        value : 1 ,
        ttl : req.decodedData.iat + (30 * 60)
    })
    
}


export const verifyEmail = async (data)=>{
    const user = await findOne({model : userModel , filter:data.email});
    if(user.isVerifed){
        return{
            message:"user is verified"
        }
    }
    if(!user){
        throw NotFoundException({message:'user not found'});
    }

    const redisData = await get(createOtpRedisKey(user._id));

    if(await compareHash( data.code, redisData )){
        user = await updateById({
            model : userModel ,
            id : user._id,
            data:{isVerifed: true}
        })
    }else{
       throw BadRequestException()
    }
    return user
}

export const forgetPassword = async(data)=>{
    const checkUser = await findOne({model : userModel , filter:{email : data.email}});

    if(!checkUser){
       throw NotFoundException({message:"email not found"});
    }
    events.emit(eventsKeys.changePassword , {userId:checkUser._id , email:data.email});

    return {
        message :"otp sent successfully"
    }
}

export const resetPassword = async({otp , email , newPassword} = {})=>{
    const findUser= await findOne({model:userModel , filter:{email}});
    if(!findUser){
       throw NotFoundException({message:"user not found"});
    }
    const redisOtp = await get(createOtpRedisKey(findUser._id));
    if(!redisOtp){
      throw BadRequestException({message:"send otp again"})
    }
    if(await compareHash(otp , redisOtp)){
        if(await compareHash(newPassword , findUser.password)){
            throw BadRequestException({message:"the same password enter another password"});
        }
        const hashedNewPassword = await generateHash(newPassword);
        const newData = await updateById({model : userModel , id:findUser._id , data:{password:hashedNewPassword} });
        if(newData){
            await redisDelete(createOtpRedisKey(findUser._id));
            return newData;
        }
        throw BadRequestException({message:"somthing wrong try again"})
    }else{
       throw BadRequestException({message:"otp is wrong"})
    }
}
