import os
import re
import sys
from youtube_transcript_api import YouTubeTranscriptApi
from flask import Flask, jsonify, request

from dotenv import load_dotenv  # type: ignore
import requests
load_dotenv()


app = Flask(__name__)


def init():
    global answer
    answer = False


def get_video_id(url):
    match = re.search(r"=(\w+)$", url)
    if match:
        return match.group(1)
    else:
        return None


def get_script(video_id, length, word_length):
    response = YouTubeTranscriptApi.get_transcript(str(video_id))
    concatenated_text = ''
    for item in response:
        concatenated_text += item['text'] + ' '
    try:
        word_length = int(word_length)
    except:
        pass

    script = concatenated_text.strip()
    if length == 1:
        min_length = int(len(script.split()) / 16)
        max_length = min_length + 25
    elif length == 2:
        min_length = int(len(script.split()) / 12)
        max_length = min_length + 50
    elif length == 3:
        min_length = int(len(script.split()) / 8)
        max_length = min_length + 100
    elif length == 4:

        min_length = word_length
        max_length = word_length + 1
    else:
        min_length = 0
        max_length = 0

    return script, max_length, min_length


def get_summary(script, min_length, max_length):
    API_KEY = os.getenv("API_KEY")
    AUTH = f"Bearer {API_KEY}"
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": AUTH}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    output = query({
        "inputs": script,
        "parameters": {
            "min_length": min_length,
            "max_length": max_length
        }
    })

    try:
        return output[0]['summary_text']
    except:
        print(output)
        sys.exit()


def process_video(url: str, option: int, word_length: int, check_grammar_var: bool = True):
    # Process the video URL and chosen option
    id = get_video_id(url=url)

    data = get_script(video_id=id, length=option, word_length=word_length)

    summary = get_summary(
        script=data[0], min_length=data[2], max_length=data[1])

    if check_grammar_var == True:
        summary = check_grammar(script=summary)

        return summary
    else:
        return summary


def check_grammar(script):
    API_KEY = os.environ.get('API_KEY')
    AUTH = f"Bearer {API_KEY}"
    API_URL = "https://api-inference.huggingface.co/models/pszemraj/flan-t5-large-grammar-synthesis"
    headers = {"Authorization": AUTH}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    output = query({
        "inputs": script,
    })
    try:
        return output[0]['generated_text']
    except:
        return output


@app.route('/process_video', methods=['POST'])
def process_video_route():
    data = request.json
    url = data.get('url')
    option = data.get('option')
    word_length = data.get('word_length')
    check_grammar_var = data.get('check_grammar')

    summary = process_video(url, option, word_length, check_grammar_var)

    return jsonify({'summary': summary})


@app.route('/check_grammar', methods=['POST'])
def check_grammar_route():
    data = request.json
    script = data.get('script')
    grammar_corrected_text = check_grammar(script)
    return jsonify({'grammar_corrected_text': grammar_corrected_text})


if __name__ == '__main__':

    # Run the Flask application
    app.run()
