from core import db

class TicketItemModel(db.Model):
    __tablename__ = 'ticket_item'

    order_item_id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer)
    menu_id = db.Column(db.Integer)
    ingredients_added = db.Column(db.String)
    ingredients_removed = db.Column(db.String)
    remark = db.Column(db.String)
    item_status = db.Column(db.String)

    def __init__(self, ticket_id, menu_id, ingredients_added, ingredients_removed, remark, item_status):
        self.order_item_id = order_item_id
        self.ticket_id = ticket_id
        self.menu_id = menu_id
        self.ingredients_added = ingredients_added
        self.ingredients_removed = ingredients_removed
        self.remark = remark
        self.item_status = item_status
