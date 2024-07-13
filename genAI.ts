import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY: string = process.env.GENAI || "";

const genAI: any = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export { model };