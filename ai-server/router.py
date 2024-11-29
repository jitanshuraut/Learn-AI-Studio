import json
from promts import Promt_Genrate_topic


def Genrate_Topic_SubTopic(model, text):
    response = model.generate_content(Promt_Genrate_topic(text))
    clean_response = response.text.strip()
    clean_response = clean_response.lstrip("```json").rstrip(
        "```").strip()

    try:
        response_dict = json.loads(clean_response)
        dominant_topic = response_dict.get("dominant_subject")
        subtopics = response_dict.get("subtopics", [])
        print(dominant_topic, subtopics)
        return dominant_topic, subtopics
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON: {e}")
        return None, []
