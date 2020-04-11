from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.table import TableDetails
from core import db


table_resource_fields = {
    'table_number': fields.Integer,
    'table_size': fields.Integer,
    'table_status': fields.String,
    'current_session': fields.Integer 
}

parser = reqparse.RequestParser()
parser.add_argument('table_size')

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


class ClearTable(Resource):
    def patch(self, table_number):
        """Clear a table of a session and reset its status"""
        table = TableDetails.query.get_or_404(table_number)

        table.current_session = None
        table.table_status = 'Empty'
        db.session.commit()

        return 200



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
    def patch(self, table_number):
        table = TableDetails.query.get_or_404(table_number)
        if 'assistance' in request.json:
            table.current_session = request.json['assistance']
        db.session.commit()
        return table, 200