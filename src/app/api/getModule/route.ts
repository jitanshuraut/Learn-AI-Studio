import { NextResponse, NextRequest } from "next/server";
import { GENRATE_MODULE } from "../../../../promt";
import { model } from "../../../../genAI";
import { db } from "@/lib/db"
import { extractAndParseJSON } from "@/lib/jsonParser";




export async function POST(req: NextRequest) {
    const data = await req.json()

    try {
        let user = await db.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" });
        }

        const moduleData = await db.module.findFirst({
            where: {
                courseId: data.courseId,
                moduleNumber: parseInt(data.moduleNumber),
                dayNumber: parseInt(data.dayNumber)
            }
        });

        if (!moduleData) {
            return NextResponse.json({ error: 'Module not found' });
        }

        const course = await db.course.findUnique({
            where: {
                id: data.courseId as string,
            },
            select: {
                courseName: true,
            },
        });

        if (!course) {
            return NextResponse.json({ error: 'Module not found' });
        }


        const existingTopic = await db.topic.findFirst({
            where: {
                moduleId: moduleData.id,
            }
        });

        if (existingTopic) {
            return NextResponse.json({ data: existingTopic.content });
        }

        const prompt = GENRATE_MODULE(moduleData.title, course.courseName)
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: any = response.text();
        console.log(text);

        const newTopic = await db.topic.create({
            data: {
                moduleId: moduleData.id,
                title: moduleData.title,
                content: text,
            }
        });



        return NextResponse.json({ data: text });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



