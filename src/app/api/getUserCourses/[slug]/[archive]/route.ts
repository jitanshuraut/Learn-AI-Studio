import { db } from "@/lib/db"
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { slug: string, archive: string } }) {
    const UserId = params.slug
    const archive = params.archive

    const courses = await db.course.findMany({
        where: {
            userId: UserId,
            Archive: parseInt(archive)
        },
        orderBy: {
            createdAt: 'desc'
        }
    });


    return new NextResponse(JSON.stringify(courses), {
        status: 200,
    });
}
