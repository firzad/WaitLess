from core import db
#from .ingredients import Ingredients


class IngredientsList(db.Model):
    __tablename__ = 'ingredients'

    ingredient_id = db.Column(db.Integer, primary_key=True)
    ingredient_name = db.Column(db.String(50))
    price = db.Column(db.Integer)
    calorie = db.Column(db.Integer)

    def __init__(self, ingredient_name, calorie):
        self.ingredient_name = ingredient_name
        self.price = 0
        self.calorie = calorie

    def __repr__(self):
        return self.ingredient_name
