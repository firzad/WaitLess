from core import db
from .category import Category


class Menu(db.Model):
    __tablename__ = 'menu'

    menu_id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'))
    item_name = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Integer)
    visibility = db.Column(db.Boolean)
    position_in_menu = db.Column(db.Integer)
    date_added = db.Column(db.DateTime)
    total_calories = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    category = db.relationship('Category')
    imgfile = db.Column(db.String)

    def __init__(self, category_id, item_name, description, price, position_in_menu, imgfile):
        self.category_id = category_id
        self.item_name = item_name
        self.description = description
        self.price = price
        self.visibility = True
        self.position_in_menu = position_in_menu
        self.total_calories = 0
        self.discount = 0
        self.imgfile = imgfile
