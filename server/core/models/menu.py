from core import db

class Menu(db.Model):
    __tablename__ = 'menu'

    menu_id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer)
    item_name = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Integer)
    visibility = db.Column(db.Boolean)
    position_in_menu = db.Column(db.Integer)
    date_added = db.Column(db.DateTime)
    total_calories = db.Column(db.Integer)
    discount = db.Column(db.Integer)



