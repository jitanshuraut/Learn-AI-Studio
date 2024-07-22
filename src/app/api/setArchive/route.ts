import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
    const data = await req.json()
    try {
        const updatedCourse = await db.course.update({
            where: {
                id: data.courseId as string,
            },
            data: {
                Archive: parseInt(data.archive, 10)
            },
        });
        return NextResponse.json({ message: 'success' });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



