export const  SucessResponse = ({res, status = 200 , message = "sucess" , data = undefined} = {})=>{
    return res.status(status).json({message , reslut : data })
}