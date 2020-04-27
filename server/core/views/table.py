from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.views.ticket_item import TicketItemsBySession
from core.models.table import TableDetails
from core import db, socketio
from core.chatbot import chatbot
from core.views.ticket_item import TicketSummary
from core.views.category import Categories

table_resource_fields = {
    'table_number': fields.Integer,
    'table_size': fields.Integer,
    'table_status': fields.String,
    'current_session': fields.Integer,
    'assistance': fields.Boolean
}

parser = reqparse.RequestParser()
parser.add_argument('table_size')
parser.add_argument('message')

class TableDetail(Resource):

    @marshal_with(table_resource_fields)
    def get(self):
        """Return the list of all TableDetails."""
        return TableDetails.query.all(), 200
    
    @marshal_with(table_resource_fields)
    def post(self):
        """Inserts new TableDetail into DB."""
        args = parser.parse_args()
        table = TableDetails(args.get('table_size'))
        db.session.add(table)
        db.session.commit()
        return table, 201

class TableItemDelivered(Resource):
    def patch(self, table_number):
        table = TableDetails.query.get_or_404(table_number)

        ticket_items = TicketItemsBySession().get(table.current_session)[0]
        print(ticket_items[0][0])
        if ticket_items[0][0]['ticket_status'] == 'Active':
            table.table_status = 'Seated'
        else:
            table.table_status = 'Ordered'

        db.session.commit()

class TableDetailById(Resource):
    
    def delete(self, table_number):
        """Delete existing TableDetail from DB."""
        table = TableDetails.query.get_or_404(table_number)
        db.session.delete(table)
        db.session.commit()
        return {"message":f"Deleted table {table_number}"}, 200

    @marshal_with(table_resource_fields)
    def patch(self, table_number):
        """Change existing TableDetail in DB."""
        table = TableDetails.query.get_or_404(table_number)

        if 'table_size' in request.json:
            table.table_size = request.json['table_size']
        if 'table_status' in request.json:
            table.table_status = request.json['table_status']
        db.session.commit()
        return table, 200

    @marshal_with(table_resource_fields)
    def get(self, table_number):
        """get table status"""
        table_status = TableDetails.query.get_or_404(table_number)
        return table_status, 200



class FreeTables(Resource):
    @marshal_with(table_resource_fields)
    def get(self):
        """Return list of free tables"""
        free_tables = []
        tables = TableDetails.query.all()
        for table in tables:
            if table.table_status == "Empty":
                free_tables.append(table)
        return free_tables, 200


class TableStatus(Resource):
    @marshal_with(table_resource_fields)
    def patch(self, table_number):
        """Clear a table of a session and reset its status"""
        table = TableDetails.query.get_or_404(table_number)
        if 'table_status' in request.json:
            table.table_status = request.json['table_status']
        if 'current_session' in request.json:
            table.current_session = request.json['current_session']
        else:
            table.current_session = None
        db.session.commit()

        return table, 200



class ActiveTables(Resource):
    @marshal_with(table_resource_fields)
    def get(self):
        """Return list of all active tables"""
        active_tables = []
        tables = TableDetails.query.all()
        for table in tables:
            if table.table_status != "Empty":
                active_tables.append(table)
        return active_tables, 200

class TableSession(Resource):
    @marshal_with(table_resource_fields)
    def patch(self, table_number):
        table = TableDetails.query.get_or_404(table_number)

        if 'session_id' in request.json:
            table.current_session = request.json['session_id']
        db.session.commit()
        return table, 200

class SwitchTableAssistance(Resource):
    @marshal_with(table_resource_fields)
    def patch(self, table_number):
        table = TableDetails.query.get_or_404(table_number)
        if 'assistance' in request.json:
            table.assistance = request.json['assistance']
        db.session.commit()
        return table, 200

# CHATBOT  -------------------------------------------------------------------
class Chat(Resource):
    def post(self):
        args = parser.parse_args()
        message=args.get('message')       
        chatbot_response, item_list = chatbot.chat(message)
        response = [chatbot_response]

        if 'Please pick a category' in chatbot_response:
            category =  Categories.get('Categories')
            response_str = ""
            for i in range(len(category[0])):
                response_str = response_str+category[0][i]['category_name']+',\n'
            response.append(response_str[:-2])
        if 'Our Best Sellers are' in chatbot_response:
            best_seller,_= TicketSummary.get('DishSummary')
            response_str = ""
            for i in range(len(best_seller['top_10'])):
                response_str= response_str+best_seller['top_10'][i]['item_name']+" : "+ best_seller['top_10'][i]['category']+ ",\n"
            response.append(response_str[:-2])

        if 'Our recommendation for' in chatbot_response:
            best_seller,_= TicketSummary.get('DishSummary')
            response_str = ""
            for i in range(len(best_seller['top_10'])):
                if best_seller['top_10'][i]['category'] == item_list[0]:
                    response_str= response_str+best_seller['top_10'][i]['item_name']+ ",\n"
            if not response_str == "":
                response.append(response_str[:-2])
            else:
                response_str = 'Well, I can\'t suggest you something at the moment. Why not try something new today!'
                response = [response_str] 
  
        return response, 200


