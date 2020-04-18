from chatbot import chatbot
from core import db


class ChatbotModel():

    #chatbot_response, list_response = chatbot.chat('pizza')
    assistance = db.Column(db.Boolean)

    def __init__(self):
        self.chatbot_response = chatbot_response
        self.list_response = list_response
        self.assistance = False