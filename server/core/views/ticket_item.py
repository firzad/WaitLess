from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.ticket import TicketModel
from core import db


table_resource_fields = {
    'order_item_id': fields.Integer,
    'ticket_id': fields.Integer,
    'menu_id': fields.Integer,
    'ingredients_added': fields.String,
    'ingredients_removed': fields.String,
    'remark': fields.String,
    'item_staus': fields.String
}

#parser = reqparse.RequestParser()
#parser.add_argument('session_id','table_number')

class TicketItem(Resource):

    @marshal_with(table_resource_fields)
    def get(self, ticket_id):
        """get ticket items for a ticket id"""
        ticket_item = TicketItemModel.query.filter(TicketItemModel.ticket_id == ticket_id).all()
        return ticket_item, 200
