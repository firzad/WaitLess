from core import db

class TableDetails(db.Model):
    __tablename__ = 'table_details'

    table_number = db.Column(db.Integer, primary_key=True)
    table_size = db.Column(db.Integer)
    table_status = db.Column(db.String)

    def __init__(self, size):
        self.table_size = size
        self.table_status = "Empty"