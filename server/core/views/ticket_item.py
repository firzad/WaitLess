from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.ticket_item import TicketItemModel
from core.models.ticket import TicketModel
from core.views.table import TableDetailById

from core import db


table_resource_fields = {
    'order_item_id': fields.Integer,
    'ticket_id': fields.Integer,
    'menu_id': fields.Integer,
    'ingredients_added': fields.String,
    'ingredients_removed': fields.String,
    'remark': fields.String,
    'item_status': fields.String
}

#parser = reqparse.RequestParser()
#parser.add_argument('session_id','table_number')

class TicketItem(Resource):

    @marshal_with(table_resource_fields)
    def get(self, ticket_id):
        """get ticket items for a ticket id"""
        ticket_item = TicketItemModel.query.filter(TicketItemModel.ticket_id == ticket_id).all()
        return ticket_item, 200

"""Gets tickets for a given table session"""
class TicketsBySession(Resource):

    @marshal_with(table_resource_fields)
    def get(self, session_id):
        """get all ticket details for a given table session"""
        tickets = TicketModel.query.filter(TicketModel.session_id == session_id).all()
        ticket_items = []
        for t in tickets:
            ticket_items.append(TicketItemModel.query.filter(TicketItemModel.ticket_id == t.ticket_id).all())
        return ticket_items, 200
