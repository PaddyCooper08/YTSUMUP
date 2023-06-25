import json
import requests
from art import text2art
import dotenv

import typer

import threading
import sys
app = typer.Typer()

dotenv.load_dotenv()
title = "YT SUMUP"
artwork = text2art(title, font="block")

typer.secho(artwork, fg=typer.colors.RED)


def process_video(video_url: str, option: int, word_length: int = None, check_grammar: bool = True):

    url = 'http://localhost:5000/process_video'

    data = {
        'url': video_url,
        'option': option,
        'word_length': word_length,
        'check_grammar': check_grammar
    }

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        response_data = response.json()
        summary = response_data.get('summary')
        print(f'Summary: {summary}')
        sys.exit()
    else:
        print('Error occurred during the request.')
        print(f'Status Code: {response.status_code}')
        print(f'Response Content: {response.text}')
        sys.exit()


@app.command()
def process_youtube_video(
        video_url: str = typer.prompt("Enter the YouTube video URL"),
        option: int = typer.prompt(
            "Choose an option: 1 (Short), 2 (Medium), 3 (Long), 4 (Custom)",
            type=int,
            default=1,
            show_choices=True,
            show_default=False,
        ),
        check_grammar=typer.confirm("Would you like your summary to be grammar-checked?", default=True)):

    if option == 4:
        word_length = None
        while True:
            try:
                word_length = int(
                    typer.prompt("Enter a word length for the custom option"))
                pass
            except:
                typer.echo("Enter an integer!")

            typer.echo("Loading...")
            # Start the loading animation in a separate thread
            loading_thread = threading.Thread()
            loading_thread.start()
            process_video(video_url=video_url, option=option,
                          word_length=word_length, check_grammar=check_grammar)

            # Wait for the process_video function to complete
            loading_thread.join()
            typer.echo("\rLoading... Done!")
    else:

        typer.echo("Loading...")
        # Start the loading animation in a separate thread
        loading_thread = threading.Thread()
        loading_thread.start()
        process_video(video_url=video_url, option=option,
                      word_length=None, check_grammar=check_grammar)

        # Wait for the process_video function to complete
        loading_thread.join()
        typer.echo("\rLoading... Done!")


if __name__ == "__main__":
    app()
