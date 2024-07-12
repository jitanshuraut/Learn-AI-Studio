import { db } from "@/lib/db"
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const UserId = params.slug

    const courses = await db.course.findMany({
        where: {
            userId: UserId,
        },
        include: {
            user: true,         
            modules: true,      
            progress: true,     
        },
    });
    return new NextResponse(JSON.stringify(courses), {
        status: 200,
    });
}
