import { NextResponse, NextRequest } from "next/server";
import pptxgen from "pptxgenjs";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        // data.content is expected to be slide structure or text
        const pptx = new pptxgen();

        // helper to remove HTML tags
        const stripHtml = (html: string) => {
            return html.replace(/<[^>]*>/g, "");
        };

        // recursively strip html from any string in an object/array
        const sanitize = (val: any): any => {
            if (typeof val === 'string') return stripHtml(val);
            if (Array.isArray(val)) return val.map(sanitize);
            if (val && typeof val === 'object') {
                const out: any = {};
                for (const k in val) {
                    out[k] = sanitize(val[k]);
                }
                return out;
            }
            return val;
        };

        // sanitize incoming content
        data.content = sanitize(data.content);

        const processSlideData = (slideData: any) => {
            Object.keys(slideData).forEach((slideKey) => {
                const slide = pptx.addSlide();
                const title = stripHtml(String(slideData[slideKey].title || ""));
                const content = stripHtml(String(slideData[slideKey].content || ""));

                slide.addText(title, { x: 0.5, y: 0.8, fontSize: 24, bold: true });
                slide.addText(content, { x: 0.5, y: 2.1, fontSize: 18 });

                if (Array.isArray(slideData[slideKey].bulletPoints)) {
                    const formattedBulletPoints = slideData[slideKey].bulletPoints.map((point: any) => ({
                        text: stripHtml(String(point)),
                        options: { bullet: true, fontSize: 18 }
                    }));
                    slide.addText(formattedBulletPoints, { x: 0.5, y: 4.0 });
                } else if (typeof slideData[slideKey].bulletPoints === 'string') {
                    slide.addText(stripHtml(slideData[slideKey].bulletPoints), { x: 0.5, y: 4.0, fontSize: 18 });
                }
            });
        };

        const slidesSource = data.content?.slides ? data.content.slides : data.content;

        // if we received plain string, try to split into multiple slides
        if (typeof slidesSource === 'string') {
            // already sanitized
            const textString = slidesSource as string;
            // split by blank lines first
            const parts = textString.split(/\r?\n\r?\n/).map(p => p.trim()).filter(p => p);
            if (parts.length > 1) {
                parts.forEach(p => {
                    const slide = pptx.addSlide();
                    slide.addText(p, { x: 0.5, y: 0.5, fontSize: 18 });
                });
            } else {
                // if still single chunk, break into smaller pieces by length
                const maxLen = 1000;
                let i = 0;
                while (i < textString.length) {
                    const chunk = textString.slice(i, i + maxLen);
                    const slide = pptx.addSlide();
                    slide.addText(chunk, { x: 0.5, y: 0.5, fontSize: 18 });
                    i += maxLen;
                }
            }
        } else if (slidesSource && typeof slidesSource === 'object') {
            if (Array.isArray(slidesSource)) {
                slidesSource.forEach(processSlideData);
            } else {
                processSlideData(slidesSource);
            }
        } else {
            // fallback: create a single slide with raw text (strip HTML tags)
            const text = stripHtml(String(data.content));
            const slide = pptx.addSlide();
            slide.addText(text, { x: 0.5, y: 0.5, fontSize: 18 });
        }

        const arrayBuffer = await pptx.write("arraybuffer");
        const buffer = Buffer.from(arrayBuffer);

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'Content-Disposition': 'attachment; filename="presentation.pptx"'
            }
        });
    }
    catch (error) {
        return NextResponse.json({ message: "Error generating PPT" }, { status: 500 });
    }
}



