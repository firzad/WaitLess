from flask_restful import Resource, fields, marshal_with, reqparse, request, marshal
from core.models.ticket_item import TicketItemModel
from core.models.ticket import TicketModel
from core.models.table import TableDetails
from core.views.menu import MenuItemById
from core.models.menu import Menu

from core.views.ticket import ticket_resource_fields, TicketById
from core.views.menu import menu_resource_fields

from core import db, socketio


ticket_item_resource_fields = {
    'order_item_id' : fields.Integer,
    'ticket_id': fields.Integer,
    'menu_id': fields.Integer,
    'ingredients_added': fields.String,
    'ingredients_removed': fields.String,
    'remark': fields.String,
    'item_status': fields.String,
    'quantity': fields.Integer
}

parser = reqparse.RequestParser()
parser.add_argument('ticket_id')
parser.add_argument('menu_id')
parser.add_argument('ingredients_added')
parser.add_argument('ingredients_removed')
parser.add_argument('remark')
parser.add_argument('item_status')
parser.add_argument('quantity')
parser.add_argument('order_item_ids')

class TicketItemByTicket(Resource):

    @marshal_with(ticket_item_resource_fields)
    def get(self, ticket_id):
        """get ticket items for a ticket id"""
        ticket_item = TicketItemModel.query.filter(TicketItemModel.ticket_id == ticket_id).all()
        return ticket_item, 200

class TicketItem(Resource):
    @marshal_with(ticket_item_resource_fields)
    def post(self):
        args = parser.parse_args()
        new_item = TicketItemModel(ticket_id=args.get('ticket_id'), menu_id=args.get('menu_id'),
                                    ingredients_added=args.get('ingredients_added'),ingredients_removed=args.get('ingredients_removed'),
                                     remark=args.get('remark'),quantity=args.get('quantity'))
        db.session.add(new_item)
        db.session.commit()
        socketio.emit('ticketsUpdated', broadcast=True)
        return new_item, 200

class UpdateTicketItems(Resource):
    #@marshal_with(ticket_item_resource_fields)
    def patch(self):

        print(request.json)
        if 'item_status' in request.json:
            if 'order_item_ids' in request.json:
                for order_item_id in request.json['order_item_ids']:
                    print(order_item_id)
                    ticket_item = TicketItemModel.query.get_or_404(order_item_id)
                    ticket_item.item_status = request.json['item_status']
        db.session.commit()

        #update staff table view
        ticket = TicketModel.query.get_or_404(ticket_item.ticket_id)
        table = TableDetails.query.get_or_404(ticket.table_number)
        table.table_status = 'Ready To Deliver'

        all_ticket_items = TicketItemByTicket().get(ticket_item.ticket_id)[0]

        if all(item['item_status'] == 'Complete' for item in all_ticket_items):
            ticket = TicketModel.query.get_or_404(ticket_item.ticket_id);
            ticket.ticket_status = 'Complete'
        db.session.commit()
        return {}, 200


"""Gets tickets for a given table session, including menu database entry"""
class TicketItemsBySession(Resource):

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

class ActiveTicketMenuItems(Resource):
    def get(self):
        """get all ticket details"""
        tickets = TicketModel.query.filter(TicketModel.ticket_status == 'Active').all()
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
        ticket_list = TicketItemsBySession().get(session_id)
        total_price = 0
        for ticket in ticket_list[0]:
            total_price += sum(item['price'] for item in ticket)
        return [total_price], 200