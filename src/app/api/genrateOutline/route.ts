import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";
import { CHECKER, GENRATE_OUTLINE } from "../../../../promt";

const API_KEY: string = process.env.GENAI || "";

const genAI: any = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface CourseStatus {
    message: string;
    coursename: string;
    safe: boolean;
}

function extractAndParseJSON(input: string): CourseStatus | null {
    const jsonRegex = /```json([\s\S]*?)```/;
    const match = input.match(jsonRegex);

    if (match && match[1]) {
        try {
            const jsonString = match[1].trim();
            const parsedObject: CourseStatus = JSON.parse(jsonString);
            return parsedObject;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }

    return null;
}


export async function POST(req: NextRequest) {
    const data = await req.json()
    console.log(data)
    const prompt = CHECKER(data.course)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text: CourseStatus | null = extractAndParseJSON(response.text());

    try {

        if (text?.safe) {
            console.log("success hit")
            const genrate_promt = GENRATE_OUTLINE(data.course)
            console.log(genrate_promt)
            const result = await model.generateContent(genrate_promt);
            console.log(result)
            const response = await result.response;
            console.log(response)
            const module_text = extractAndParseJSON(response.text());
            console.log(module_text);
            return NextResponse.json(module_text)
            
        }
    }
    catch (err) {

    }


    return NextResponse.json(text)
}



