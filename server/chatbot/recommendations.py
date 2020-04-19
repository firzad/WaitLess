
def get_recommendations(tag, data):
    for tg in data["intents"]:
        if tag == 'no_special_requirements':
            tg['best_seller']='Chicken Burger'
            print('Our best-sellers is ', tg['best_seller'])
            break

        elif tag == "Vegan" or tag == "Vegetarian" or tag == "Lactose Intolerant" or tag == "Gluten Free":
            tg['best_seller']='falafel wrap'
            print('Our', tag, 'best-sellers is ', tg['best_seller'])
            break
