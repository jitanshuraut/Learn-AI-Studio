import { CourseStatus, ModuleData } from "@/types"
export function extractAndParseJSON(input: string): CourseStatus | null {
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

export function ModuleCreator(input: string): ModuleData[] | null {
    const jsonRegex = /```json([\s\S]*?)```/;
    const match = input.match(jsonRegex);

    if (match && match[1]) {
        try {
            const jsonString = match[1].trim();
            const parsedObject: any = JSON.parse(jsonString);
            const modules: ModuleData[] = [];

            for (const key in parsedObject) {
                if (key.startsWith("Day ")) {
                    const dayNumber = parseInt(key.split(" ")[1], 10);
                    const dayModules = parsedObject[key];

                    dayModules.forEach((module: string, index: number) => {
                        const moduleNumber = index + 1;
                        const title = module.split(": ")[1];
                        modules.push({
                            dayNumber,
                            moduleNumber,
                            title,
                        });
                    });
                }
            }

            return modules;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }

    return null;
}