from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.summary import SummaryModel
from core import db


summary_resource_fields = {
    'session_id': fields.Integer,
    'table_number': fields.Integer,
    'date_order': fields.DateTime,
    'price': fields.Integer 
}

parser = reqparse.RequestParser()
parser.add_argument('table_number')
parser.add_argument('date_order')


class SummaryTable(Resource):
    @marshal_with(summary_resource_fields)
    def get(self):
        """Return the list of all sessions."""
        return SummaryModel.query.all(), 200

    @marshal_with(summary_resource_fields)
    def post(self):
        """Inserts new session summary into DB."""
        args = parser.parse_args()
        session = SummaryModel(args.get('table_number'), args.get('date_order'))
        db.session.add(session)
        db.session.commit()
        return session, 201

class SummaryById(Resource):
    @marshal_with(summary_resource_fields)
    def get(self, session_id):
        """Return the summary of a session by id"""
        return SummaryModel.query.filter(SummaryModel.session_id == session_id).all(), 200

    @marshal_with(summary_resource_fields)
    def patch(self, session_id):
        """update the total price of the session insummary table"""
        summary = SummaryModel.query.get_or_404(session_id)

        if 'price' in request.json:
            summary.price = request.json['price']
        db.session.commit()
        return summary, 200

