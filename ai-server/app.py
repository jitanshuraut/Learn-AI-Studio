from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
from router import Genrate_Topic_SubTopic
from promts import Genrate_Outline, Genrate_Module, Programming_Model_system_instruction, Science_Model_system_instruction, Maths_Model_system_instruction, Miscellaneous_Model_system_instruction
from json_repair import repair_json
import os
from groq import Groq

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

api_key_gk=os.environ.get("GROQ_API_KEY")
client = Groq(api_key=api_key_gk)

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

        return jsonify({"content": str(out_line_2.text)}), 200
    except Exception as e:
        return jsonify({"error": "An error occurred, you may have reached the rate limit"}), 500
        # return jsonify({"error": e}), 500


@app.route('/v1/query', methods=['POST'])
def course_genration_module():
    try:
        query = str(request.json.get('query'))
        content = str(request.json.get('content'))

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a precise and helpful assistant. Always provide concise responses (around 100 words) based on the given context. If the query is unclear or lacks context, politely ask for clarification."
                },
                {
                    "role": "user",
                    "content": f"Using the information from the given context: {content}, answer the following query: {query}. Ensure the response is concise, clear, and relevant",
                }
            ],
            model="llama-3.1-70b-versatile",
        )

        return  jsonify({"content":str(chat_completion.choices[0].message.content)}),200

    except Exception as e:
        return jsonify({"error": e}), 500

if __name__ == '__main__':
    app.run(debug=True)
