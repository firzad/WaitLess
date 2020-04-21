
def get_recommendations(tag, data):
    for i in range(len(data["intents"])):
        if data["intents"][i]['tag'] == 'no_special_requirements':
            data["intents"][i]["best_seller"]='Chicken Burger'
            response = 'Our best-sellers is '+ data["intents"][i]["best_seller"]
            return()

        elif data["intents"][i]['tag'] == "Vegan" or data["intents"][i]['tag'] == "Vegetarian" or data["intents"][i]['tag'] == "Lactose Intolerant" or data["intents"][i]['tag'] == "Gluten Free":
            data["intents"][i]["best_seller"]='falafel wrap'
            response = 'Our '+ tag +'  best-sellers is '+ data["intents"][i]["best_seller"]
            return response

