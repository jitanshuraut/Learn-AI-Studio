from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from router import Genrate_Topic_SubTopic
from promts import Genrate_Outline, Genrate_Module, Programming_Model_system_instruction, Science_Model_system_instruction, Maths_Model_system_instruction, Miscellaneous_Model_system_instruction, ppt_genration
from json_repair import repair_json
import os
from groq import Groq
from utility import content_Repair, segment_text

load_dotenv()

app = Flask(__name__)

api_Key = os.environ.get("API_KEY")
genai.configure(api_key=api_Key)

router_model = genai.GenerativeModel("models/gemini-1.5-flash")
Programing_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", system_instruction=Programming_Model_system_instruction())
Science_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", system_instruction=Science_Model_system_instruction())
Maths_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", system_instruction=Maths_Model_system_instruction())
Miscellaneous_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", system_instruction=Miscellaneous_Model_system_instruction())
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


@app.route('/v1/course-genration-outline', methods=['POST'])
def course_genration_outline():
    try:
        input_text = str(request.json.get('input_text'))
        dominant_topic, subtopics = Genrate_Topic_SubTopic(
            router_model, input_text)

        if dominant_topic == "Programming":
            subtopics_text = ", ".join(subtopics)
            out_line = Programing_model.generate_content(
                Genrate_Outline(input_text, subtopics_text, dominant_topic))
        elif dominant_topic == "Science":
            subtopics_text = ", ".join(subtopics)
            out_line = Science_model.generate_content(
                Genrate_Outline(input_text, subtopics_text, dominant_topic))
        elif dominant_topic == "Maths":
            subtopics_text = ", ".join(subtopics)
            out_line = Maths_model.generate_content(
                Genrate_Outline(input_text, subtopics_text, dominant_topic))
        else:
            subtopics_text = ", ".join(subtopics)
            out_line = Miscellaneous_model.generate_content(
                Genrate_Outline(input_text, subtopics_text, dominant_topic))

        clean_response = repair_json(out_line.text.lstrip("```json").rstrip(
            "```").strip())
        return jsonify(clean_response), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred, you may have reached the rate limit"}), 500


@app.route('/v1/course-genration-module', methods=['POST'])
def course_genration_module():

    try:
        module = str(request.json.get('module'))
        course = str(request.json.get('course'))
        topic = str(request.json.get('topic'))
        if topic == "Programming":
            print("Programming")
            out_line_2 = Programing_model.generate_content(
                Genrate_Module(module, course))
        elif topic == "Science":
            print("Science")
            out_line_2 = Science_model.generate_content(
                Genrate_Module(module, course))
        elif topic == "Maths":
            print("Maths")
            out_line_2 = Maths_model.generate_content(
                Genrate_Module(module, course))
        else:
            print("Miscellaneous_model")
            out_line_2 = Miscellaneous_model.generate_content(
                Genrate_Module(module, course))

        final_text = content_Repair(out_line_2.text, client)
        return jsonify({"content": str(final_text)}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred, you may have reached the rate limit"}), 500
        # return jsonify({"error": e}), 500


@app.route('/v1/query', methods=['POST'])
def query_llm():
    try:
        query = str(request.json.get('query'))
        content = str(request.json.get('content'))
        print(query)
        print(content)
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "you are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": f"Provide a concise response (around 100 words) to the following query: {query}, using the information from the given content: {content}",
                }
            ],
            model="llama-3.1-70b-versatile",
        )
        return jsonify({"content": str(chat_completion.choices[0].message.content)}), 200

    except Exception as e:
        return jsonify({"error": e}), 500


@app.route('/v1/ppt', methods=['POST'])
def ppt_llm():
    try:
        content = str(request.json.get('content'))
        segments_h1 = segment_text(content, 'h1')
        segments_h2 = []
        segments_h3 = []

        for segment_h1 in segments_h1:
            segments_h2.extend(segment_text(segment_h1, 'h2'))

        for segment_h2 in segments_h2:
            segments_h3.extend(segment_text(segment_h2, 'h3'))

        if len(segments_h3) > len(segments_h2) and len(segments_h3) > len(segments_h1):
            result = segments_h3
        elif len(segments_h2) > len(segments_h1):
            result = segments_h2
        else:
            result = segments_h1

        final_text = ""
        combined_segment = ""
        max_length = 10000
        print(len(result))
        final_compress = []
        i = 0
        while i < len(result):
            temp_text = result[i]
            i += 1
            while i < len(result) and len(result[i]) + len(temp_text) <= max_length:
                temp_text += result[i]
                i += 1
            final_compress.append(temp_text)

        print(len(final_compress))
        for segment in final_compress:
            if len(combined_segment) + len(segment) <= max_length:
                combined_segment += segment
            else:
                prompt = ppt_genration(combined_segment)
                chat_completion = client.chat.completions.create(
                    messages=[
                        {
                            "role": "system",
                            "content": "You are a helpful assistant who specializes in generating concise and informative PowerPoint slides."
                        },
                        {
                            "role": "user",
                            "content": prompt,
                        }
                    ],
                    model="llama-3.1-70b-versatile",
                )

                print("--------------------------------------------")
                print(chat_completion.choices[0].message.content)
                # print(len(combined_segment))
                print("--------------------------------------------")
                final_text += chat_completion.choices[0].message.content
                combined_segment = segment

        if combined_segment:
            prompt = ppt_genration(combined_segment)
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant who specializes in generating concise and informative PowerPoint slides."
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
                model="llama-3.1-70b-versatile",
            )

            print("--------------------------------------------")
            print(chat_completion.choices[0].message.content)
            # print(len(combined_segment))
            print("--------------------------------------------")
            final_text += chat_completion.choices[0].message.content

        print(final_text)
        response = repair_json(final_text)
        return jsonify({"slides": response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
