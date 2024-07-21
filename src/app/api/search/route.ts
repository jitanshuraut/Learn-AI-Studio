import { NextResponse, NextRequest } from "next/server";
import { client } from "../../../../genAI";
import { updatePinecone } from "@/lib/pineconeDB";





export async function GET(req: NextRequest) {
    try {
        const doc = {
            "id": "123",
            "content": "hi ther my self jitanshu"
        }
        await updatePinecone(client, "course", doc)


        return NextResponse.json({ message: 'success' });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



