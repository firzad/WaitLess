from flask_restful import Resource, fields, marshal_with, reqparse, request, marshal

from core.models.ticket_item import TicketItemModel
from core.models.ticket import TicketModel
from core.views.table import TableDetailById
from core.views.menu import MenuItemById
from core.models.menu import Menu

from core.views.ticket import ticket_resource_fields
from core.views.menu import menu_resource_fields

from core import db


ticket_item_resource_fields = {
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

    @marshal_with(ticket_item_resource_fields)
    def get(self, ticket_id):
        """get ticket items for a ticket id"""
        ticket_item = TicketItemModel.query.filter(TicketItemModel.ticket_id == ticket_id).all()
        return ticket_item, 200


"""Gets tickets for a given table session, including menu database entry"""
class TicketsBySession(Resource):

    #@marshal_with({**ticket_resource_fields,**ticket_item_resource_fields})
    def get(self, session_id):
        """get all ticket details for a given table session"""
        tickets = TicketModel.query.filter(TicketModel.session_id == session_id).all()
        ticket_json = []
        for t in tickets:
            ticket_items = TicketItemModel.query.filter(TicketItemModel.ticket_id == t.ticket_id).all()
            ticket_total = []
            for ticket_item in ticket_items:
                menu_entry = MenuItemById().get_no_marshal(ticket_item.menu_id)[0]
                menu_marsh = marshal(menu_entry, menu_resource_fields)
                ticket_item_marsh = marshal(ticket_item, ticket_item_resource_fields)
                ticket_marsh = marshal(t, ticket_resource_fields)
                ticket_total.append({**ticket_marsh,**ticket_item_marsh, **menu_marsh})
            ticket_json.append(ticket_total)
        return ticket_json, 200

class TicketPriceTotal(Resource):
    def get(self, session_id):
        ticket_list = TicketsBySession().get(session_id)
        total_price = 0
        for ticket in ticket_list[0]:
            total_price += sum(item['price'] for item in ticket)
        return [total_price], 200