import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
export const GROQ_API_KEY = process.env.GROQ_API_KEY;