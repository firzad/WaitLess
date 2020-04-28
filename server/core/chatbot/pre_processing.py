import os
import pickle
import tensorflow
import tflearn
import numpy
import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()


def preprocession(data):
    training = []
    output = []
    try:
        with open("core/chatbot/data.pickle", "rb") as f:
            words, labels, training, output = pickle.load(f)
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

        with open("core/chatbot/data.pickle", "wb") as f:
            pickle.dump((words, labels, training, output), f)
            print('pickle file generated')
        return create_model(words, labels, training, output)


def create_model(words, labels, training, output):
    tensorflow.reset_default_graph()

    net = tflearn.input_data(shape=[None, len(training[0])])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
    net = tflearn.regression(net)

    model = tflearn.DNN(net)

    if os.path.exists("core/chatbot/model.tflearn" + ".meta"):
        model.load("core/chatbot/model.tflearn")
    else:
        model.fit(training, output, n_epoch=1000,
                  batch_size=8, show_metric=True)
        w = model.get_weights(net.W)
        b = model.get_weights(net.b)

        model.save("core/chatbot/model.tflearn")
    return model, words, labels, training, output


def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return numpy.array(bag)


def get_order(data):
    for tg in data["intents"]:
        if tg['tag'] == 'mistake':
            tg['update_order_list'] = ["3Cheese Pizza", "Beef Burger",
                                       "Cold Coffee", "Fries", "Penne Arrabiata Pasta"]
            print(tg['update_order_list'])
            return tg['update_order_list']
