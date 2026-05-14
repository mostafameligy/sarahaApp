import dotenv from "dotenv";

dotenv.config({ path: "./config/.env" });

export const env = {
  port: process.env.PORT,
  uri: process.env.URI,
  mood: process.env.MOOD,
  salt: process.env.SALT,
  tokenKey: process.env.JWT_KEY,
  userSignture: process.env.USER_SIGNETURE,
  adminSignture: process.env.ADMIN_SIGNETURE,
  userRefreshSignture: process.env.USER_REFRESH_SIGNETURE,
  adminRefreshSignture: process.env.ADMIN_REFRESH_SIGNETURE,
  baseUrl: process.env.BASE_URL,
  redisUrl: process.env.REDIS_URl,
  appPassword: process.env.APP_PASSWORD,
  appEmail: process.env.APP_EMAIL,
};
