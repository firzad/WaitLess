#from server.chatbot import pre_processing, recommendations, input_processing, get_model
from . import pre_processing, recommendations, input_processing, get_model

from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import random


def chat(inp):
    model, data, words, labels, training, output = get_model.model()
    response_flag = 0
    print('''Hi! I am Jenny, your waiting assistant for the day. How can I help you?\n
            1. Recommendations\n
            2. Do you need staff assistance?\n
            3. Waiting time\n''')
    while True:
        #inp = input("You: ")
        if inp.lower() == "quit":
            break
        if response_flag:
            #call function to update the order
            response_flag = 0
            inp = 'start over'

        results = model.predict([input_processing.bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results)
        tag = labels[results_index]
        best_seller = None

        if results[results_index]> 0.7:
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    responses = tg['responses']
                    if tag == "Vegan" or tag == "Vegetarian" or tag == "Lactose Intolerant" or tag == "Gluten Free" or tag == "no_special_requirements":
                        responses = [recommendations.get_recommendations(tag, data)]

            try:
                choice = random.choice(responses)
                item_list = None
                if best_seller:
                    item_list = best_seller
                    best_seller = None

                return choice,item_list
            except:
                continue

        else:
            return 'I didn\'t get that. Please try again!',[]

