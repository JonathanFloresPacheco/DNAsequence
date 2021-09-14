import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const LOCAL_HOST: any = process.env.LOCAL_HOST;
export const TYPE_BD: any = process.env.TYPE_BD;
export const BD: any = process.env.BD;
export const USER_BD: any = process.env.USER_BD;
export const PASS_BD: any = process.env.PASS_BD;
export const JWT_SECRET_VALUE: any = process.env.JWT_SECRET_VALUE;
