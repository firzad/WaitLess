
def get_recommendations(tag, data):

    if tag == 'no_special_requirements':
        data["intents"][21]["best_seller"]='Chicken Burger'
        return('Our best-sellers is '+ data["intents"][21]["best_seller"])

    elif tag == "Vegan" or tag == "Vegetarian" or tag == "Lactose Intolerant" or tag == "Gluten Free":
        data["intents"][21]["best_seller"]='falafel wrap'
        response = 'Our '+ tag +'  best-sellers is '+ data["intents"][21]["best_seller"]
        return response

