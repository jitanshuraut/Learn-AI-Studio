import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server";



export async function POST(req: NextRequest) {
    const data = await req.json()
    console.log(data)

    try {
        let user = await db.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }

        return NextResponse.json({ Credit: user.Credit });
    }
    catch (err) {
        return NextResponse.json({ message: "Error" });
    }

}