import { NextResponse, NextRequest } from "next/server";
import { GENRATE_MODULE } from "../../../../promt";
import { model } from "../../../../genAI";
import { db } from "@/lib/db"
import { redis } from "@/lib/redis";



export async function POST(req: NextRequest) {
    const data = await req.json()

    try {
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

        const data_cache: any = await redis.get(String(moduleData.id));
        console.log("from redis")
        console.log(data_cache)

        if (data_cache) {
            return NextResponse.json({ data: data_cache });
        }


        const existingTopic = await db.topic.findFirst({
            where: {
                moduleId: moduleData.id,
            }
        });


        if (existingTopic) {
            return NextResponse.json({ data: existingTopic.content });
        }

        // redis.get(moduleData.id).then((result) => {
        //     console.log(result); // Prints "value"
        //     return NextResponse.json({ data: result });

        // });

        const prompt = GENRATE_MODULE(moduleData.title, course.courseName)
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: any = response.text();
        // console.log(text);

        const newTopic = await db.topic.create({
            data: {
                moduleId: moduleData.id,
                title: moduleData.title,
                content: text,
            }
        });


        const redis_resp = await redis.set(String(moduleData.id), String(text));
        console.log(redis_resp);
        return NextResponse.json({ data: text });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



