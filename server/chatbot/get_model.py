from server.chatbot import pre_processing
import json
import pickle

def model():
    with open("/Users/aarushigera/Downloads/COMP9900/project/capstone-project-masterminds/server/chatbot/intents.json") as file:
        data = json.load(file)

    try:
        with open("data.pickle", "rb") as f:
            words, labels, training, output = pickle.load(f)
            model, words, labels, training, output = pre_processing.create_model(words, labels, training, output)
    except:
        model, words, labels, training, output = pre_processing.preprocession(data)

    return model, data, words, labels, training, output