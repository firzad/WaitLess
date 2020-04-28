from . import pre_processing, recommendations, input_processing, get_model

from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import random
import nltk
nltk.download('punkt')


def chat(inp):
    model, data, words, labels, training, output = get_model.model()
    response_flag = 0
 
    while True:
        if inp.lower() == "quit":
            break
        if response_flag:
            #call function to update the order
            response_flag = 0
            inp = 'start over'

        results = model.predict([input_processing.bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results)
        tag = labels[results_index]
        item_list = None

        if results[results_index]> 0.7:
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    responses = tg['responses']
                    if tag == "Mains" or tag == "Salads" or tag == "Sides" or tag == "Drinks" or tag == "Desserts":
                        item_list = [tag]

            try:
                choice = random.choice(responses)
                return choice,item_list
            except:
                continue

        else:
            return 'I didn\'t get that. Please try again!',[]

