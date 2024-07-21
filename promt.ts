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
    return `Develop a comprehensive course on the topic "${input}". The duration of the course will be determined based on optimal and enough learning conditions, ranging from 3 to 18 days. Each day should be divided into 3 modules. Design the course with the following components in a JSON structure and name should be short and in ReferenceBooks source should be url of book to buy from amazon or other website :
{
"name:" : "Course Name",
"numberofdays": "Number of days"   
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


export const GENRATE_MODULE = (module: string, course: string) => {
//     return `Generate comprehensive learning content specifically for the module "${module}" in the "${course}" course. Note that other modules in the course have already been defined. Focus exclusively on the topics outlined for "${module}" in the course structure. Provide detailed explanations, examples, and practical applications relevant to "${module}". Ensure the content is structured to cover the essential aspects of "${module}" without extending into other modules of the course. Format the content in html skiping head body , direct give content like "<h1>headnig</h1> <p>....</p>" and note important  things and heading should be bold and big in size , and dont nest span inside h1 and have text color #8678F9 and rest have white color and use tailwindcss to style and give jsx and heading tag size sholud be greater than normal text and it sholud contains more images and all the image source is working if , not surre about the working then give 2-3 images and sepration of topic done useing line   and there should be more amout of space between diffenr topics and it should not contains like  <h1><span>...</span> </h1> .
// Present the content in a professional instructional style, akin to how a seasoned educator would deliver a lecture. Include thorough explanations with technical depth, illustrative examples, and practical scenarios that underscore the relevance of "Number Systems and Data Representation" in the context of "Computer Organization and Architecture". Structure the material with clear headings, subheadings, and a logical flow that aids comprehension. Aim for a blend of clarity, precision, and academic rigor to facilitate optimal learning outcomes.`
    return `Generate comprehensive learning content for the module "${module}" in the "${course}" course. Other modules in the course have already been defined, so focus exclusively on the topics outlined for "${module}" in the course structure. Provide detailed explanations, examples, and practical applications relevant to "${module}". Structure the content to cover the essential aspects of "${module}" without extending into other modules.
Format the content in HTML, skipping head and body tags. Directly provide content like:
<h1>Heading</h1>
<p>...</p>
Important points and headings should be bold and large in size.
Avoid nesting spans inside h1 tags.
Use text color #8678F9 for headings and white for the rest of the content.
Utilize TailwindCSS for styling and JSX for the code.
Ensure all heading tags are larger than normal text having #8678F9 colour.
Precede all second-level headings (main headings other than the module) with a horizontal bar <hr>.
Ensure there is one empty line before each heading inside the main headings.
Use proper indentation for bullet points or numbered lists.
Use the <b> tag for indicating bold text.
Present the content in a professional instructional style, similar to how a seasoned educator would deliver a lecture. Include thorough explanations with technical depth, illustrative examples, and practical scenarios that underscore the relevance of "${module}" in the context of "${course}". Structure the material with clear headings, subheadings, and a logical flow to aid comprehension. Aim for a blend of clarity, precision, and academic rigor to facilitate optimal learning outcomes.
Example Formatting:
<hr>
<h1>Main Heading</h1>
<p>...</p>

<br>
<hr style="border: 2px solid #8678F9; border-radius: 5px;">
<h2>Subheading</h2>
<h3>...</h3>
<p> ... </p>

<h3>...</h3>
<p> ... </p>

<br>
<hr style="border: 2px solid #8678F9; border-radius: 5px;">
<h2>Subheading</h2>
<h3>...</h3>
<p> ... </p><br>

<h3>...</h3>
<p> ... </p><br>

<ul>
  <br>
  <li>Indented bullet point</li>
  <br>
  <li><b>Bold text</b></li>
</ul>

<pre style="background-color: rgba(0, 0, 0, 0.2); color: #ffffff; padding: 1em; border-radius: 5px;">
    <code>
        // Sample code block
    </code>
</pre>
Ensure that the content adheres to these formatting guidelines to maintain a consistent and professional appearance.`
}
