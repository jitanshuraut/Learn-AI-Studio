import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const url = process.env.PYTHON_SERVER + "/v1/query";
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: data.query, content: data.content })
        });
        const response = await result.json();

        return NextResponse.json({ "response": response.content });
    }
    catch {
        return NextResponse.json({ message: "Error" });
    }

}



