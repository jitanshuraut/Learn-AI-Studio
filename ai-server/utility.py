import re


def segment_text(text, tag):
    segments = re.split(rf'(<{tag}.*?>.*?</{tag}>)', text, flags=re.DOTALL)
    result = []
    current_segment = ""

    for segment in segments:
        if re.match(rf'<{tag}.*?>.*?</{tag}>', segment, flags=re.DOTALL):
            if current_segment:
                result.append(current_segment)
                current_segment = ""
        current_segment += segment

    if current_segment:
        result.append(current_segment)

    return result


def content_Repair(text, client):
    segments_h1 = segment_text(text, 'h1')
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
    max_length = 128000

    for segment in result:
        if len(combined_segment) + len(segment) <= max_length:
            combined_segment += segment
        else:
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are an assistant that specializes in enhancing the quality of content "
                            "inside an HTML document. Improve the text content for better structure, clarity, and tone while keeping the original HTML structure unchanged. "
                            "If any content appears incomplete or lacks detail, add relevant information to make it more comprehensive. "
                            "Respond only with the improved HTML document and nothing else."
                        )
                    },
                    {
                        "role": "user",
                        "content": f"Refine and enhance the content within this HTML structure, ensuring it is comprehensive, while preserving the tags. Only return the improved HTML: {combined_segment}"
                    }
                ],
                model="llama-3.1-70b-versatile",
            )

            print("--------------------------------------------")
            print(chat_completion.choices[0].message.content)
            print("--------------------------------------------")
            final_text += chat_completion.choices[0].message.content
            combined_segment = segment

    if combined_segment:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an assistant that specializes in enhancing the quality of content "
                        "inside an HTML document. Improve the text content for better structure, clarity, and tone while keeping the original HTML structure unchanged. "
                        "If any content appears incomplete or lacks detail, add relevant information to make it more comprehensive. "
                        "Respond only with the improved HTML document and nothing else."
                    )
                },
                {
                    "role": "user",
                    "content": f"Refine and enhance the content within this HTML structure, ensuring it is comprehensive, while preserving the tags. Only return the improved HTML: {combined_segment}"
                }
            ],
            model="llama-3.1-70b-versatile",
        )

        print("--------------------------------------------")
        print(chat_completion.choices[0].message.content)
        print("--------------------------------------------")
        final_text += chat_completion.choices[0].message.content

    return final_text
