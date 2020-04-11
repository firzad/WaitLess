from core import db
from datetime import datetime

class TicketModel(db.Model):
    __tablename__ = 'ticket'

    ticket_id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer)
    ticket_timestamp = db.Column(db.DateTime)
    table_number = db.Column(db.Integer)

    def __init__(self, session_id, table_number):
        self.session_id = session_id
        self.ticket_timestamp = str(datetime.now())
        self.table_number = table_number