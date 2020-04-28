
def get_recommendations(tag, data):
    print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', tag)
    for i in range(len(data["intents"])):
        if data["intents"][i]['tag'] == 'no_special_requirements' and tag == 'no_special_requirements':
            data["intents"][i]["best_seller"] = 'Chicken Burger'
            response = 'Our best-sellers is ' + \
                data["intents"][i]["best_seller"]
            return response
        elif (data["intents"][i]['tag'] == "Vegan" and tag == "Vegan") or (data["intents"][i]['tag'] == "Vegetarian" and tag == "Vegetarian") or (data["intents"][i]['tag'] == "Lactose Intolerant" and tag == "Lactose Intolerant") or (data["intents"][i]['tag'] == "Gluten Free" and tag == "Gluten Free"):
            data["intents"][i]["best_seller"] = 'falafel wrap'
            response = 'Our ' + tag + '  best-sellers is ' + \
                data["intents"][i]["best_seller"]
            return response
