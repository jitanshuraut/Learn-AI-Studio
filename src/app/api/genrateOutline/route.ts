import { NextResponse, NextRequest } from "next/server";
import { CHECKER, GENRATE_OUTLINE } from "../../../../promt";
import { model } from "../../../../genAI";
import { db } from "@/lib/db"
import extractAndParseJSON from "@/lib/jsonParser"


interface CourseStatus {
    message: string;
    coursename: string;
    safe: boolean;
}


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


        const currentTime = new Date();
        const lastUpdate = new Date(user.LastCreditUpdate);
        const timeDiff = Math.abs(currentTime.getTime() - lastUpdate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (dayDiff > 7) {
            const updatedUser = await db.user.update({
                where: { id: user.id },
                data: {
                    Credit: {
                        increment: 5,
                    },
                    LastCreditUpdate: currentTime,
                },
            });
            user = updatedUser;
        }

        if (user.Credit === null || user.Credit <= 0) {
            return NextResponse.json({ message: "Insufficient credit" });
        }

        const finalUser = await db.user.update({
            where: { id: user.id },
            data: {
                Credit: {
                    decrement: 1,
                },
            },
        });



        const prompt = CHECKER(data.course);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text: CourseStatus | null = extractAndParseJSON(response.text());

        if (text?.safe) {
            const genrate_promt = GENRATE_OUTLINE(data.course);
            const result = await model.generateContent(genrate_promt);
            const response = await result.response;
            const module_text = extractAndParseJSON(response.text());
            return NextResponse.json(module_text);
        } else {
            return NextResponse.json({ message: "Error" });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" });
    }

    // return NextResponse.json(text)
}



