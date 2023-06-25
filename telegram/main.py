import os
import logging
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
from dotenv import load_dotenv
import requests
import json
load_dotenv()

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

"""
    Makes the request to the api, getting the summary of the video

    @param video_url - URL of the video to be processed
    @param option - Option for the video ( 1 - 4 )
    @param word_length - Word length of the video ( None for options 1-3  )
    @param check_grammar - Whether or not to check the grammar of the video
    """


def process_video(video_url: str, option: int, word_length=None, ):
    BASE_URL = os.environ.get('BASE_URL')

    url = f'{BASE_URL}/process_video'

    data = {
        'url': str(video_url),
        'option': int(option),
        'word_length': word_length,
        'check_grammar': True
    }

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, data=json.dumps(data), headers=headers)

    # Handles errors and returns the summary
    if response.status_code == 200:
        response_data = response.json()
        summary = response_data.get('summary')

        return summary

    else:
        print(response.text)
        return (f'Response Content: {response.text}')


# Define the command handler for /youtube


def youtube_command(update, context):
    # Send a message asking for the YouTube video URL
    context.bot.send_message(
        chat_id=update.effective_chat.id, text="Please enter the YouTube video URL:")
    # Set the state to wait for the URL
    context.user_data['state'] = 'WAIT_URL'

# Define the handler for receiving messages


def message_handler(update, context):
    # Get the current state
    state = context.user_data.get('state')

    if state == 'WAIT_URL':
        # Get the user's message
        message = update.message.text

        # Store the YouTube video URL in user data for later use
        context.user_data['video_url'] = message

        # Offer options for grammar checking
        options = "Please select an option for length:\n1. Short\n2. Medium\n3. Long\n4. Custom"
        context.bot.send_message(
            chat_id=update.effective_chat.id, text=options)

        # Set the state to wait for the option
        context.user_data['state'] = 'WAIT_OPTION'

    elif state == 'WAIT_OPTION':
        # Get the selected option
        option = update.message.text

        # Process the selected option
        if option.isdigit() and 1 <= int(option) <= 4:
            # Store the selected option in user data for later use
            context.user_data['selected_option'] = option

            if option == '4':
                # Ask for the word length
                context.bot.send_message(
                    chat_id=update.effective_chat.id, text="Please enter the word length (an integer):")
                # Set the state to wait for the word length
                context.user_data['state'] = 'WAIT_WORD_LENGTH'
            else:
                # Get the stored YouTube video URL from user data
                video_url = context.user_data.get('video_url')
                if video_url:
                    gif = "https://i.imgur.com/Y2HXJ80.gif"
                    # Perform grammar checking based on the selected option
                    context.bot.send_message(
                        chat_id=update.effective_chat.id, text=f"You selected option {option}. Summarizing this video: {video_url}")

                    message = context.bot.send_animation(
                        chat_id=update.effective_chat.id, animation=gif)

                    res = process_video(video_url, option, word_length=None)
                    context.bot.send_message(
                        chat_id=update.effective_chat.id, text=res)
                    context.bot.delete_message(
                        chat_id=update.effective_chat.id, message_id=message.message_id)

                else:
                    # Error: No YouTube video URL found in user data
                    context.bot.send_message(
                        chat_id=update.effective_chat.id, text="Error: No YouTube video URL found.")
        else:
            # Invalid option entered
            context.bot.send_message(
                chat_id=update.effective_chat.id, text="Invalid option selected. Please try again.")

    elif state == 'WAIT_WORD_LENGTH':
        # Get the word length
        word_length = update.message.text

        # Check if the word length is a valid integer
        if word_length.isdigit():
            # Get the stored YouTube video URL from user data
            video_url = context.user_data.get('video_url')
            if video_url:
                gif = "https://i.imgur.com/Y2HXJ80.gif"
                # Perform grammar checking with custom word length
                context.bot.send_message(
                    chat_id=update.effective_chat.id, text=f"You selected option 4 with word length {word_length}. Summarizing this video: {video_url}")
                message = context.bot.send_animation(
                    chat_id=update.effective_chat.id, animation=gif)

                res = process_video(video_url, option=4,
                                    word_length=word_length)
                context.bot.send_message(
                    chat_id=update.effective_chat.id, text=res)
                context.bot.delete_message(
                    chat_id=update.effective_chat.id, message_id=message.message_id)
            else:
                # Error: No YouTube video URL found in user data
                context.bot.send_message(
                    chat_id=update.effective_chat.id, text="Error: No YouTube video URL found.")
        else:
            # Invalid word length entered
            context.bot.send_message(chat_id=update.effective_chat.id,
                                     text="Invalid word length entered. Please enter an integer.")


# Create the Telegram Updater and dispatcher
updater = Updater(token=os.getenv('TELEGRAM_TOKEN'), use_context=True)
dispatcher = updater.dispatcher

# Register the command handler and message handler
dispatcher.add_handler(CommandHandler("youtube", youtube_command))
dispatcher.add_handler(MessageHandler(
    Filters.text & ~Filters.command, message_handler))

# Start the bot
updater.start_polling()
