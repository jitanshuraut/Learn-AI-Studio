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


export function ModuleCreator(input: any): ModuleData[] | null {
    try {
        const modules: ModuleData[] = [];
        if (typeof input !== 'object' || input === null) {
            if (typeof input === 'string') {
                try {
                    input = JSON.parse(input);
                } catch (error) {
                    console.error("Failed to parse input string to JSON:", error);
                    return null;
                }
            } else {
                console.error("Input is not a valid object or string:", input);
                return null;
            }
        }

       
        console.log("Processing valid input:", input);
        for (const key in input) {
            if (key.startsWith("Day ")) {
                const dayNumber = parseInt(key.split(" ")[1], 10);
                const dayModules = input[key];
                if (Array.isArray(dayModules)) {
                    dayModules.forEach((module: string, index: number) => {
                        const moduleNumber = index + 1;
                        const title = module.split(": ")[1];
                        modules.push({
                            dayNumber,
                            moduleNumber,
                            title,
                        });
                    });
                } else {
                    console.error(`Expected an array for ${key}, but got ${typeof dayModules}`);
                }
            }
        }

        return modules;
    } catch (error) {
        console.error("Error parsing module data:", error);
        return null;
    }
}