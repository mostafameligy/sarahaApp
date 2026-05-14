import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";

export const creatToken = (user) => {
  let signture = undefined;
  let audience = undefined;
  let refreshSignture = undefined;

  switch (user.role) {
    case "0":
      signture = env.adminSignture;
      refreshSignture= env.adminRefreshSignture;
      audience = "Admin";
    default :
    signture = env.userSignture ;
    refreshSignture = env.userRefreshSignture;
    audience = "User";
  }

  const acessToken = jwt.sign({id : user.id} , signture , {audience , expiresIn :"30m"});
  const refreshToken = jwt.sign({id : user.id} , refreshSignture , {audience , expiresIn : "1d"})
  return {acessToken , refreshToken}
};

export const decodeAcessToken = (token)=>{

    const decode = jwt.decode(token);
    let signture = undefined;    
    switch(decode.aud){
        case "Admin":
           signture = env.adminSignture;
           break;
        default :
           signture = env.userSignture;
           break;
    }
    const verfiedToken = jwt.verify(token , signture);
    return verfiedToken ;
} 

export const decodedRefreshToken = (token) => {

    const decoded = jwt.decode(token);
    let signture = undefined;

    switch(decoded.aud){
        case "Admin":
            signture = env.adminRefreshSignture;
            break;
        default :
            signture = env.userRefreshSignture;
            break;
    }

    const decodedData = jwt.verify(token , signture);
    return decodedData 
}