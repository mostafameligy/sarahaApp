import { env } from "../../../../config/index.js";

export const  ErrorResposne = ({ message = "fail" , status = 400, extra = undefined} = {})=>{

    throw new Error(message , {cause : {extra , status }});
    // error.status = status ;
    // throw error

}

// ex: somthing wrong in request 
export const BadRequestException = ({message = "badRequest" ,status = 400 , extra = undefined}={})=>{
    
    return ErrorResposne({message , status , extra});
}

// ex: user not found
export const UnauthorizedException = ({message = "UnauthorizedException" , status = 401 , extra = undefined} = {})=>{
    return ErrorResposne({message , status , extra});
}

// ex:don't have an acess in this action
export const ForbiddenException = ({message = "ForbiddenException" , status = 403 , extra = undefined})=>{
    return ErrorResposne({message , status , extra});
}

//ex:email not found
export const NotFoundException= ({message = "NotFoundException" , status = 404  , extra = undefined})=>{
    return ErrorResposne({message , status , extra});
}

//ex: email already exist
export const ConflictException  = ({message = "Conflict" , status = 409 , extra = undefined})=>{
    return ErrorResposne({message , status , extra});
}

export const glopalErrorHandling  = (error , req , res ,next )=>{
    
    const status =error.cause?.status ?? 500;
    const isProduction = env.mood == "pro";
    const defoultErrorMessage = "somthing error in server DB";
    const displayErrorMessage = error.message || defoultErrorMessage;
    
    return res.status(status).json({
        status ,
        stack : isProduction ? undefined : error.stack || {},
        errorMessage : isProduction ? status == 500 ? defoultErrorMessage : displayErrorMessage : displayErrorMessage,
        extra : error?.cause?.extra || {}
    })
}