from server.chatbot import pre_processing, recommendations, input_processing, get_model

from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
import tensorflow
import random

import pickle
import os


def chat(inp):
    model, data, words, labels, training, output = get_model.model()
    update_order_list = pre_processing.get_order(data)
    response_flag = 0
    item_to_be_updated = None
    print('''Hi! I am Jenny, your waiting assistant for the day. How can I help you?
            1. Recommendations
            2. Oops! Did you make a mistake in the order. I can help you!
            3. Do you need staff assistance?
            4. Quit''')
    while True:
        #inp = input("You: ")
        if inp.lower() == "quit":
            break
        if response_flag:
            #call function to update the order
            print('Your order has been updated')
            response_flag = 0
            inp = 'start over'

        results = model.predict([input_processing.bag_of_words(inp, words)])[0]
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
                        recommendations.get_recommendations(tag, data)
                    if tag == "mistake":
                        update_orders_list = update_order_list
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
                choice = random.choice(responses)
                item_list = None
                if best_seller:
                    item_list = best_seller
                    best_seller = None
                if update_orders_list:
                    item_list = update_orders_list
                    update_orders_list = None
                if update_options:
                    item_list = update_options
                    update_options = None
                if update_patty:
                    item_list = update_patty
                    update_patty = None
                    response_flag = 1
                if update_veggie:
                    if item_to_be_updated == "burger":
                        removed_veggies = ['Mushroom', 'Broccoli']
                        update_veggie = [e for e in update_veggie if e not in removed_veggies]
                        item_list = update_veggie
                    if item_to_be_updated == "pasta":
                        removed_veggies = ['Lettuce']
                        update_veggie = [e for e in update_veggie if e not in removed_veggies]
                        item_list = update_veggie
                    if item_to_be_updated == "pizza":
                        removed_veggies = ['Lettuce', 'Broccoli']
                        update_veggie = [e for e in update_veggie if e not in removed_veggies]
                        item_list = update_veggie
                    update_veggie = None
                    response_flag = 1
                if update_cheese:
                    item_list = update_cheese
                    update_cheese = None
                    response_flag = 1
                if update_milk:
                    item_list = update_milk
                    update_milk = None
                    response_flag = 1
                if update_temp:
                    item_list = update_temp
                    update_temp = None
                    response_flag = 1
                if update_coffee_type:
                    item_list = update_coffee_type
                    update_coffee_type = None
                    response_flag = 1
                if update_sauce:
                    if item_to_be_updated == "pizza":
                        removed_sauce = ["Alfredo", "Arrabiata", "Pesto", "Aglio E Olio"]
                        update_sauce = [e for e in update_sauce if e not in removed_sauce]
                        item_list = update_sauce
                    if item_to_be_updated == "pasta":
                        removed_sauce = ["Mustard", "Tomato", "Thousand Island"]
                        update_sauce = [e for e in update_sauce if e not in removed_sauce]
                        item_list = update_sauce
                    update_sauce = None
                    response_flag = 1
                if update_shape:
                    item_list = update_shape
                    update_shape = None
                    response_flag = 1
                if update_crust:
                    item_list = update_crust
                    update_crust = None
                    response_flag = 1
                return choice,item_list
            except:
                continue

        else:
            return 'I didn\'t get that. Please try again!'

