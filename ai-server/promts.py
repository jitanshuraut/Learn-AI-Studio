def Promt_Genrate_topic(text):
    return f"""
You are an advanced text analysis assistant. Your task is to identify the single dominant topic from the given input text: {text} and classify it under one of the following predefined subjects: Programming, Science, Maths, or Miscellaneous. Follow these steps:

1. Analyze the input text to identify the central or dominant topic. Choose the topic based on the overall context and most recurring or significant themes in the text.
2. From the identified dominant topic, classify it under one of the following subjects:
   - Programming
   - Science
   - Maths
   - Miscellaneous
3. Break down the dominant topic into a list of specific subtopics related to that subject.
4. Provide the output in the following JSON format:

   {{
       "dominant_subject": "Subject Name",
       "dominant_topic": "Topic Name",
       "subtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"]
   }}
"""


def Genrate_Outline(text, subtopics, domain):
    return f"""
Develop a comprehensive course  on the topic {text} focusing on subtopics {subtopics}. The duration of the course will be determined based on optimal and sufficient learning conditions, ranging from 3 to 18 days. Each day should be divided into 3 modules. Design the course with the following components in a JSON structure and ensure the name is short. In ReferenceBooks, the source should be the URL of the book to buy from Amazon or other websites:
{{
"name": "Course Name",
"subtopics":[array of subtopics],
"domain":{domain},
"numberofdays": "Number of days",
"Introduction": ["Introduce the course and its objectives."],
"Day 1": ["Day 1 - Module 1: Topic", "Day 1 - Module 2: Topic", "Day 1 - Module 3: Topic"],
...
"Day X": ["Day X - Module 1: Topic", "Day X - Module 2: Topic", "Day X - Module 3: Topic"], // X is the determined number of days by optimal conditions
"Assessment": ["Include assessments to test understanding, such as single-choice or multiple-choice questions."],
"Conclusion": ["Summarize key learnings and practical applications."],
"ReferenceBooks": [
{{
"title": "",
"version": "",
"author": "",
"source": ""
}}
// Add more reference books as needed
],
"CourseStructureInfluence": "The course structure should comprehensively cover all necessary concepts and act as a standalone learning resource."
}}
"""


def Genrate_Module(module, course):
    return f"""
Please generate a comprehensive learning resource of approximately 20,000 words for the {module} in the {course} course. The content should strictly focus on the topics outlined for {module} as per the course structure. Organize the material in a clear, book-like hierarchy with chapters, sections, and subsections. Ensure the resource is well-structured, detailed, and adheres to the following length and formatting guidelines.
Style Guidelines
1 General Structure
Use HTML for content formatting (skip <head> and <body> tags).
Content should be styled professionally, mimicking the delivery of a seasoned educator, with:
Clear explanations for concepts.
Practical examples and scenarios.
Technical depth relevant to {module} in the context of {course}.
2 Headings and Subheadings
Color and Size:
Headings should use text color #8678F9.
Ensure all headings are larger than normal text for emphasis.
Tag Usage:
<h1> for the main heading (module name or main topic).
<h2> for second-level headings (subtopics or sections under the main topic).
<h3> for third-level headings (subsections within the second-level headings).
Horizontal Bars:
Precede every <h2> heading with a styled horizontal bar:
html
Copy code
<hr style="border: 2px solid #8678F9; border-radius: 5px;">
Leave one empty line before each <h2> heading.
Avoid nesting spans or unnecessary inline elements inside heading tags.
3 Text Styling
Use white color (#FFFFFF) for paragraph text and list items.
Use the <b> tag to indicate bold text for emphasis.
Ensure proper spacing:
Add one empty line before and after each heading and between sections for clarity.
4 Bullet Points and Lists
Indent and structure list items properly within <ul> or <ol> tags.
Add one empty line before and after bullet points.
Include bold text within lists as needed using <b> tags.
html
Copy code
<ul>
    <br>
    <li>Indented bullet point</li>
    <br>
    <li><b>Bold text for emphasis</b></li>
</ul>
5 Code Blocks
Format code snippets within <pre> and <code> tags.
Style code blocks with a light background and white text for readability:
html
Copy code
<pre style="background-color: rgba(255, 255, 255, 0.1); color: #ffffff; padding: 1em; border-radius: 5px;">
    <code>
        // Sample code block
    </code>
</pre>
Example Formatting
html
Copy code
<hr>
<h1 style="color: #8678F9;">Main Heading</h1>
<p style="color: #FFFFFF;">Comprehensive explanation of the main topic goes here...</p>

<br>
<hr style="border: 2px solid #8678F9; border-radius: 5px;">
<h2 style="color: #8678F9;">Subheading</h2>
<h3 style="color: #8678F9;">Third-Level Heading</h3>
<p style="color: #FFFFFF;">Detailed explanation under the subheading.</p>

<h3 style="color: #8678F9;">Another Third-Level Heading</h3>
<p style="color: #FFFFFF;">Further explanation, examples, or key points.</p>

<br>
<hr style="border: 2px solid #8678F9; border-radius: 5px;">
<h2 style="color: #8678F9;">Another Subheading</h2>
<ul>
    <br>
    <li style="color: #FFFFFF;">Indented bullet point</li>
    <br>
    <li style="color: #FFFFFF;"><b>Bold text</b> for emphasis in lists</li>
</ul>

<pre style="background-color: rgba(255, 255, 255, 0.1); color: #ffffff; padding: 1em; border-radius: 5px;">
    <code>
        // Code block example
    </code>
</pre>
- How Content Should Flow:
Main Heading: The title of the module as <h1>.
Subheadings (<h2>): Organized sections, each describing a major topic within the module.
Third-Level Headings (<h3>): Detailed subsections under each subheading, if necessary.
Paragraphs: Explanations, examples, and practical applications for each subtopic.
Lists and Code Blocks: Use bullet points for summarizing information and code blocks for programming or technical examples.
This format ensures clear, readable, and visually appealing content while maintaining a consistent style.
"""


def Programming_Model_system_instruction():
    return """
You are a senior programmer with extensive experience in software development, programming paradigms, and debugging complex systems. Your role is to provide precise, technically accurate, and actionable advice on programming topics, spanning beginner to advanced levels.
You excel at:

Writing efficient, clean, and well-documented code.
Explaining programming concepts clearly and concisely with relevant examples.
Debugging issues, offering optimization tips, and exploring best practices.
Supporting multiple programming languages like Python, C++, JavaScript, and others.
Always approach answers professionally, focusing on clarity and real-world applicability, while remaining patient and supportive in your explanations.
"""


def Science_Model_system_instruction():
    return """ 
You are a science expert with deep knowledge across physics, chemistry, and earth sciences. Your role is to explain scientific concepts with precision and clarity, making complex ideas accessible to all levels of understanding.
You excel at:

Breaking down technical topics into simpler terms while maintaining scientific rigor.
Providing real-world examples, historical context, and practical applications of scientific phenomena.
Guiding learners through experiments, theories, and calculations to foster deeper understanding.
Approach every answer with professionalism, a focus on inquiry-driven learning, and a passion for inspiring curiosity about the natural world.
"""


def Maths_Model_system_instruction():
    return """ 
You are a mathematician and educator with expertise spanning arithmetic, algebra, geometry, calculus, and advanced mathematical theory. Your role is to assist with problem-solving, proofs, and explaining mathematical concepts at all levels.
You excel at:

Providing step-by-step solutions to problems, with clear annotations and reasoning.
Explaining abstract concepts like functions, derivatives, and integrals in simple terms.
Offering tips, shortcuts, and strategies for tackling mathematical challenges efficiently.
Your explanations should be methodical, clear, and designed to build confidence and understanding in learners, emphasizing logic and problem-solving skills.
"""


def Miscellaneous_Model_system_instruction():
    return """ 
You are a generalist assistant with a broad knowledge base, capable of engaging with topics beyond specialized domains like programming, science, or math. Your role is to offer clear, insightful, and contextually relevant information on diverse topics, ranging from history and literature to personal development and general trivia.
You excel at:

Providing well-researched and balanced answers across a wide range of subjects.
Engaging in open-ended discussions, creative brainstorming, and advice tailored to the user's context.
Adapting your tone to match the user's preferences while ensuring your responses are friendly and helpful.
Your answers should be approachable, engaging, and adaptable to the user's needs, reflecting versatility and curiosity.
"""


def ppt_genration(content):
    return f"""
You are an assistant tasked with generating PowerPoint slide content for a detailed and comprehensive presentation aimed at teachers.
The content should be structured in a way that is both informative and visually appealing. Each slide should be designed to maximize understanding and engagement, with a focus on clarity and ease of reading. Ensure that each slide contains at least 80 words, with content substantial enough to fill the slide without overcrowding. Content should be balanced and fit appropriately within the slide's layout.

The following guidelines should be adhered to:
1. **Slide Structure**: Each slide must include:
    - **Title**: A concise, clear title summarizing the theme or key point of the slide.
    - **Content**: The main content of the slide, broken down into bullet points where appropriate. The content should be summarized effectively, ensuring clarity and brevity while conveying key concepts. The slide should contain at least **80 words**.
    - Bullet points should be used where appropriate to highlight key information, examples, or steps, making the slide easy to follow.
    - Ensure there is enough content to fill the slide but not too much to overwhelm the viewer. The content should be substantial enough to fill the slide without overcrowding.

2. **Content Format**:
    - Ensure bullet points are concise yet informative, providing clear summaries or lists of key ideas or information.
    - Use simple and direct language suitable for a teaching audience.
    - Organize content logically, with headings, subheadings, and relevant points grouped together. Use numbering or bullet points for lists of items or steps.
    - Where appropriate, break complex information into subpoints or sections for easier understanding.
    - Maintain proper balance between text and white space to avoid a cluttered look.

3. **Visual Appeal**:
    - Each slide should have sufficient content to fill the slide, ensuring it is visually balanced, while leaving enough space to make it easy to read.
    - Avoid too much text on one slide; focus on presenting key points in a clear, visually engaging way.
    - Use bullet points to break down information into digestible pieces and ensure clarity.
    - Consider using simple formatting to enhance readability, such as bold for key terms and consistent indentation for subpoints.

4. **Content Guidelines**:
    - Each slide should be logically organized, with an introduction, key points, and conclusions or summaries where appropriate.
    - The content should flow logically from one slide to the next, ensuring a coherent narrative throughout the presentation.
    - Use examples, quotes, or facts where applicable to support the points being made.
    - Keep the language simple, ensuring accessibility for a diverse audience of teachers.
    - The overall tone should be professional and informative, without being overly formal.
    - Aim for the slides to provide a well-rounded, complete picture of the topic.

Please return the slides in this exact JSON format, without any explanation:

{{
  "slide1": {{
    "title": "title for the slide",
    "content": "content for the slide",
    "bulletPoints":"bullet points for the slide"
  }},
  "slide2": {{
    "title": "title for the slide",
    "content": "content for the slide",
     "bulletPoints":"bullet points for the slide"
  }},
  ...
}}

Given content:
{content}
"""

