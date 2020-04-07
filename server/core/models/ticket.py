from core import db

class TicketModel(db.Model):
    __tablename__ = 'ticket'

    ticket_id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer)
    ticket_timestamp = db.Column(db.DateTime)
    table_number = db.Column(db.Integer)

    def __init__(self, session_id, ticket_timestamp, table_number):
        self.session_id = session_id
        self.ticket_timestamp = ticket_timestamp
        self.table_number = table_number