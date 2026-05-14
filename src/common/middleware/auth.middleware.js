import { creatRevokeKey, get } from "../../DB/redis.service.js";
import { BadRequestException, decodeAcessToken, UnauthorizedException } from "../index.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return UnauthorizedException({ message: "un authorized" });
  }
  const decodedData = decodeAcessToken(authorization);
  `rovokeToken::${decodedData.id}::${authorization}`
  const revokeTokenKey = creatRevokeKey({userId : decodedData.id , token : authorization })
  const revokeToken = await get(revokeTokenKey);
  if(revokeToken){
    throw new BadRequestException({message:"your are loged out sign in again please"})
  }
  req.token = authorization
  req.decodedData = decodedData;
  req.userId = decodedData.id;
    next();
};
