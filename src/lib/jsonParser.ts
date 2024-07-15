

interface CourseStatus {
    message: string;
    coursename: string;
    safe: boolean;
}
export default function extractAndParseJSON(input: string): CourseStatus | null {
    const jsonRegex = /```json([\s\S]*?)```/;
    const match = input.match(jsonRegex);

    if (match && match[1]) {
        try {
            const jsonString = match[1].trim();
            const parsedObject: CourseStatus = JSON.parse(jsonString);
            return parsedObject;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }

    return null;
}
