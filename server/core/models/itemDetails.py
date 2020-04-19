from core import db
#from .itemDetails import ItemDetails
from .ingredients import IngredientsList

class ItemDetail(db.Model):
    __tablename__ = 'itemdetails'

    menu_id = db.Column(db.Integer, primary_key=True)
    ingredient_id= db.Column(db.Integer, db.ForeignKey('ingredients.ingredient_id'), primary_key=True)
    modifiable = db.Column(db.Boolean)
    quantity = db.Column(db.Integer)
    default_ingredient = db.Column(db.Boolean) 
    ingredients = db.relationship('IngredientsList')  

    def __init__(self, menu_id, ingredient_id, modifiable):
        self.menu_id = menu_id
        self.ingredient_id = ingredient_id
        self.modifiable = modifiable
        self.quantity = 0
        self.default_ingredient = True 

    