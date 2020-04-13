import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
import tensorflow
import random
import json
import pickle
import os
import string

with open("intents.json") as file:
    data = json.load(file)

try:
    with open("data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
        print('training 0 n 1 ',len(training[0]), len(training[1]))
        print(('output 0 n 1 ', len(output[0]), len(output[1])))
        print('words ', len(words))
        print('labels ', len(labels))
except:
    words = []
    labels = []
    docs_x = []
    docs_y = []

    for intent in data["intents"]:
        for pattern in intent["patterns"]:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            docs_x.append(wrds)
            docs_y.append(intent["tag"])

        if intent["tag"] not in labels:
            labels.append(intent["tag"])

    words = [stemmer.stem(w.lower()) for w in words if w != "?"]
    words = sorted(list(set(words)))

    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        wrds = [stemmer.stem(w.lower()) for w in doc]

        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)


    training = numpy.array(training)
    output = numpy.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)

tensorflow.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)


if os.path.exists("model.tflearn" + ".meta"):
    model.load("model.tflearn")
else:
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    w = model.get_weights(net.W)
    b = model.get_weights(net.b)
    print('weights ', w)
    print('***************')
    print('bias ', b)
    print('Hello parappaaaa')
    model.save("/Users/aarushigera/Downloads/COMP9900/chatbot/model.tflearn")



def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return numpy.array(bag)

def get_order():
    for tg in data["intents"]:
        if tg['tag'] == 'mistake':
            tg['update_order_list'] = ["3Cheese Pizza", "Hot Coffee", "Beef Burger", "Cold Coffee", "Fries", "Penne Arrabiata Pasta"]
            print('Hellpppppppppppsdgjshbdjkfhbkaebf')
            print(tg['update_order_list'])

def get_recommendations(tag):
    for tg in data["intents"]:
        if tag == 'no_special_requirements':
            print('Our best-sellers are')
            tg['best_seller']=['Chicken Burger']
            return tg['best_seller']

        else:
            print('Our', tag, 'best-sellers are')
            tg['best_seller']=['falafel wrap']
            print('yum ', tg['best_seller'])
            return tg['best_seller']

multiple_order_list = []

def chat():
    get_order()
    response_flag = 0
    item_to_be_updated = None
    print('''Hi! I am Jenny, your waiting assistant for the day. How can I help you?
            1. Recommendations
            2. Oops! Did you make a mistake in the order. I can help you!
            3. Do you need staff assistance?
            4. Quit''')
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break
        if response_flag:
            #call function to update the order
            print('Your order has been updated')
            response_flag = 0
            inp = 'start over'

        results = model.predict([bag_of_words(inp, words)])[0]
        results_index = numpy.argmax(results)
        tag = labels[results_index]
        best_seller = None
        update_orders_list = None
        update_options = None
        update_patty = None
        update_veggie = None
        update_cheese = None
        update_milk = None
        update_coffee_type = None
        update_temp = None
        update_sauce = None
        update_shape = None
        update_crust = None

        if results[results_index]> 0.7:
            for tg in data["intents"]:
                if tg['tag'] == tag:
                    responses = tg['responses']
                    if tag == "Vegan" or tag == "Vegetarian" or tag == "Lactose Intolerant" or tag == "Gluten Free" or tag == "no_special_requirements":
                        best_seller = get_recommendations(tag)
                    if tag == "mistake":
                        update_orders_list = tg['update_order_list']
                    if tag == "burger":
                        update_options = tg['update_options']
                        item_to_be_updated = tag
                    if tag == "patty":
                        update_patty = tg['update_patty']

                    if tag == "coffee":
                        update_options = tg['update_options']
                        item_to_be_updated = tag
                    if tag == "milk":
                        update_milk = tg['update_milk']
                    if tag  == "coffee_type":
                        update_coffee_type = tg['update_coffee_type']
                    if tag == "hot_or_cold":
                        update_temp = tg['update_temp']

                    if tag == "pasta":
                        update_options = tg['update_options']
                        item_to_be_updated = tag
                    if tag == "sauce":
                        update_sauce = tg['update_sauce']
                    if tag == "pasta_shape":
                        update_shape = tg['update_shape']

                    if tag == "pizza":
                        update_options = tg['update_options']
                        item_to_be_updated = tag
                    if tag == "crust":
                        update_crust = tg['update_crust']

                    if tag == "fries":
                        item_to_be_updated = tag

                    if tag == "veggies":
                        update_veggie = tg['update_veggie']
                    if tag == "cheese":
                        update_cheese = tg['update_cheese']
                    if tag == 'other':
                        #call function for staff assistance
                        continue


            try:
                print(random.choice(responses))
            except:
                continue
            if best_seller:
                print(best_seller)
                best_seller = None
            if update_orders_list:
                print(update_orders_list)
                update_orders_list = None
            if update_options:
                print(update_options)
                update_options = None
            if update_patty:
                print(update_patty)
                update_patty = None
                response_flag = 1
            if update_veggie:
                if item_to_be_updated == "burger":
                    removed_veggies = ['Mushroom', 'Broccoli']
                    update_veggie = [e for e in update_veggie if e not in removed_veggies]
                    print(update_veggie)
                if item_to_be_updated == "pasta":
                    removed_veggies = ['Lettuce']
                    update_veggie = [e for e in update_veggie if e not in removed_veggies]
                    print(update_veggie)
                if item_to_be_updated == "pizza":
                    removed_veggies = ['Lettuce', 'Broccoli']
                    update_veggie = [e for e in update_veggie if e not in removed_veggies]
                    print(update_veggie)
                update_veggie = None
                response_flag = 1
            if update_cheese:
                print(update_cheese)
                update_cheese = None
                response_flag = 1
            if update_milk:
                print(update_milk)
                update_milk = None
                response_flag = 1
            if update_temp:
                print(update_temp)
                update_temp = None
                response_flag = 1
            if update_coffee_type:
                print(update_coffee_type)
                update_coffee_type = None
                response_flag = 1
            if update_sauce:
                if item_to_be_updated == "pizza":
                    removed_sauce = ["Alfredo", "Arrabiata", "Pesto", "Aglio E Olio"]
                    update_sauce = [e for e in update_sauce if e not in removed_sauce]
                    print(update_sauce)
                if item_to_be_updated == "pasta":
                    removed_sauce = ["Mustard", "Tomato", "Thousand Island"]
                    update_sauce = [e for e in update_sauce if e not in removed_sauce]
                    print(update_sauce)
                update_sauce = None
                response_flag = 1
            if update_shape:
                print(update_shape)
                update_shape = None
                response_flag = 1
            if update_crust:
                print(update_crust)
                update_crust = None
                response_flag = 1

        else:
            print('I didn\'t get that. Please try again!')

chat()