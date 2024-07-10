import { db } from "@/lib/db"
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";


export async function GET(req: NextApiRequest, { params }: { params: { slug: string } }) {
    const UserId = params.slug

    const courses = await db.course.findMany({
        where: {
            userId: UserId,
        },
        include: {
            user: true,         // Include the related User
            modules: true,      // Include the related Modules
            progress: true,     // Include the related Progress
        },
    });
    return new NextResponse(JSON.stringify(courses), {
        status: 200,
    });
}
