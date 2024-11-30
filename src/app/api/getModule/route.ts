import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db"
import { redis } from "@/lib/redis";

function transformColorToH1(htmlString: string): string {

    const regex = /<(\w+)\b[^>]*style="([^"]*color:\s*#8678F9;[^"]*)"[^>]*>(.*?)<\/\1>/gi;

    const transformedHtml = htmlString.replace(regex, (_, tag, style, content) => {
        const h1Element = `<h1 style="color: #8678F9;font-size: 25px;margin-bottom: 15px;margin-top: 10px;font-weight: bold; ">${content}</h1>`;
        return `<!--CHECK-HR-->\n${h1Element}`;
    });


    const finalHtml = transformedHtml.replace(
        /<!--CHECK-HR-->\n(<h1[^>]*>.*?<\/h1>)/gi,
        (match, h1Tag, offset, original) => {
            const precedingContent = original.slice(0, offset);
            const hasHr = /<hr\s*[^>]*>\s*$/i.test(precedingContent);
            const styledHr = `<hr style="border: 2px solid #8678F9; border-radius: 5px; margin-bottom: 10px;margin-top: 10px;">`;
            return hasHr ? h1Tag : `${styledHr}\n${h1Tag}`;
        }
    );

    return finalHtml;
}

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
                domain: true,
            },
        });

        if (!course) {
            return NextResponse.json({ error: 'Module not found' });
        }

        const data_cache: any = await redis.get(String(moduleData.id));
        if (data_cache) {
            return NextResponse.json({ data: data_cache });
        }


        const existingTopic = await db.topic.findFirst({
            where: {
                moduleId: moduleData.id,
            }
        });


        if (existingTopic) {
            await redis.set(String(moduleData.id), String(existingTopic.content));
            await redis.expire(String(moduleData.id), 600);
            return NextResponse.json({ data: existingTopic.content });
        }

        console.log(moduleData.title)
        console.log(course.courseName)
        console.log(course.domain)
        const url = process.env.PYTHON_SERVER + "/v1/course-genration-module";
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ module: moduleData.title, course: course.courseName, topic: course.domain })
        });


        const response = await result.json();
        console.log("Response from server:", response);
        let text: any = response.content.replace(/```(html|json|[a-zA-Z]*)|```/g, "");
        text = transformColorToH1(text);
        console.log("Response from server:", text);
        const newTopic = await db.topic.create({
            data: {
                moduleId: moduleData.id,
                title: moduleData.title,
                content: text,
            }
        });

        const newProgess_check = await db.progress.findFirst({
            where: {
                moduleId: moduleData.id
            }
        });

        if (!newProgess_check) {

            const newProgess = await db.progress.create({
                data: {
                    moduleId: moduleData.id,
                    courseId: data.courseId,
                    userId: data.userId,
                    status: "success",
                }
            });


            const updatedCourse = await db.course.update({
                where: {
                    id: data.courseId as string,
                },
                data: {
                    ModuleCreated: {
                        increment: 1,
                    },
                },
            });
        }

        const redis_resp = await redis.set(String(moduleData.id), String(text));
        const redis_resp_ttl = await redis.expire(String(moduleData.id), 600);
        console.log(redis_resp_ttl);
        return NextResponse.json({ data: text });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

}



