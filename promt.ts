export const CHECKER = (input: string) => {
    return `Validate and extract course "${input}". Ensure the content adheres strictly to the following regulations:

No courses related to human, animal, or bird biology should be accepted, unless pertaining to poisonous or dangerous plants to living organisms.
Strict filtering for any violations or inappropriate content is mandatory.
Output should follow a JSON structure with the following keys:
"message": Course evaluation result message.
"coursename": Extracted and purified course name.
"safe": Boolean (true or false) indicating if the course is acceptable.
Regulations:

Biology courses related to human, animal, or bird operations and practices are strictly prohibited, except those involving information about poisonous or dangerous plants to living organisms.
Ensure the output JSON structure contains the correct keys (message, coursename, safe).
Flagged the topics that are not educational courses, such as general knowledge queries, current events, or non-academic subjects.
Filter out inputs that contain irrelevant information, including personal queries, factual questions, or speculative topics.
Any study/course through Data is allowed.
The message key should indicate if the course input is acceptable or specify the violation.
The coursename key should contain only the extracted course name without any additional information.
Set safe to true if the course is acceptable; set to false if there is a violation.`
}

export const GENRATE_OUTLINE = (input: string) => {
    return `Develop a comprehensive course on the topic "${input}". The duration of the course will be determined based on optimal and enough learning conditions, ranging from 3 to 18 days. Each day should be divided into 3 modules. Design the course with the following components in a JSON structure:
{
"Introduction": ["Introduce the course and its objectives."],
"Day 1": ["Day 1 - Module 1: Topic", "Day 1 - Module 2: Topic", "Day 1 - Module 3: Topic"],
...
"Day X": ["Day X - Module 1: Topic", "Day X - Module 2: Topic", "Day X - Module 3: Topic"], // X is the determined number of days by optimal conditions
"Assessment": ["Include assessments to test understanding, such as single-choice or multiple-choice questions."],
"Conclusion": ["Summarize key learnings and practical applications."],
"ReferenceBooks": [
{
"title": "",
"version": "",
"author": "",
"source": ""
}
// Add more reference books as needed
],
"CourseStructureInfluence": "The course structure should comprehensively cover all necessary concepts and act as a standalone learning resource."
}`
}


export const GENRATE_MODULE = (input: string) => {
    return `Generate comprehensive learning content specifically for the module "${input}" in the "Computer Organization and Architecture" course. Note that other modules in the course have already been defined. Focus exclusively on the topics outlined for "Number Systems and Data Representation" in the course structure. Provide detailed explanations, examples, and practical applications relevant to "Number Systems and Data Representation". Ensure the content is structured to cover the essential aspects of "Number Systems and Data Representation" without extending into other modules of the course. Format the content in Markdown.
Present the content in a professional instructional style, akin to how a seasoned educator would deliver a lecture. Include thorough explanations with technical depth, illustrative examples, and practical scenarios that underscore the relevance of "Number Systems and Data Representation" in the context of "Computer Organization and Architecture". Structure the material with clear headings, subheadings, and a logical flow that aids comprehension. Aim for a blend of clarity, precision, and academic rigor to facilitate optimal learning outcomes.`
}