from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.chatbot import ChatbotModel
#from core.models.table import TableDetails

table_resource_fields = {
    'chatbot_response' : fields.String,
    'list_response' : fields.String,
    'assistance': fields.Boolean
}


class Chat(Resource):
    @marshal_with(table_resource_fields)
    def get(self, user_input):
        """get chatbot response"""
        chatbot_response = ChatbotModel.query.get_or_404(user_input)
        return chatbot_response, 200


# class SwitchTableAssistance(Resource):
#     @marshal_with(table_resource_fields)
#     def patch(self, table_number):
#         table = TableDetails.query.get_or_404(table_number)
#         if 'assistance' in request.json:
#             table.assistance = request.json['assistance']
#         db.session.commit()
#         return table, 200