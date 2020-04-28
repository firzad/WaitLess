from core import db


class Category(db.Model):
    __tablename__ = 'category'

    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(50))
    visibility = db.Column(db.Boolean)
    position_in_menu = db.Column(db.Integer)

    def __init__(self, category_name, position_in_menu):
        self.category_name = category_name
        self.position_in_menu = position_in_menu
        self.visibility = True

    def __repr__(self):
        return self.category_name
