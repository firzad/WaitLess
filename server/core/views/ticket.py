from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.ticket import TicketModel
from core import db

ticket_resource_fields = {
    'ticket_id': fields.Integer,
    'session_id': fields.Integer,
    'ticket_timestamp': fields.DateTime,
    'table_number': fields.Integer 
}

parser = reqparse.RequestParser()
parser.add_argument('session_id')

class Ticket(Resource):

    @marshal_with(ticket_resource_fields)
    def get(self, session_id):
        """get ticket details"""
        ticket = TicketModel.query.filter(TicketModel.session_id == session_id).all()
        return ticket, 200
