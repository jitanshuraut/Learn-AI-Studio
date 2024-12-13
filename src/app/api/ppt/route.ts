import { NextResponse, NextRequest } from "next/server";
import { encode, decode } from "msgpackr";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const url = process.env.PYTHON_SERVER + "/v1/ppt";
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-msgpack'
            },
            body: encode({ content: data.content })
        });
        const response = await result.arrayBuffer();
        const decodedResponse = decode(new Uint8Array(response));
        // console.log(decodedResponse);

        return NextResponse.json({ "response": decodedResponse });
    }
    catch {
        return NextResponse.json({ message: "Error" });
    }
}



