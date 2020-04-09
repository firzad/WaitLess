from core import db

class SummaryModel(db.Model):
    __tablename__ = 'summary'

    session_id = db.Column(db.Integer, primary_key=True)
    table_number = db.Column(db.Integer)
    date_order = db.Column(db.DateTime)
    price = db.Column(db.Integer)

    def __init__(self, table_number, date_order):
    	self.table_number = table_number
    	self.date_order = date_order
    	self.price = 0