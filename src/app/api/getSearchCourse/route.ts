import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server";



export async function POST(req: NextRequest) {
    const data = await req.json()
    const courses = await db.course.findUnique({
        where: {
            id: data.courseId
        },

    });

    return new NextResponse(JSON.stringify(courses), {
        status: 200,
    });
}
