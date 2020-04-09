from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.itemDetails import ItemDetail
from core import db

item_details_resource_fields={
    'menu_id': fields.Integer, 
    'ingredient_id': fields.Integer, 
    'modifiable': fields.String, 
    'quantity':fields.Integer,
    'ingredients':fields.String
}

#parser = reqparse.RequestParser()
#parser.add_argument('menu_id')
class ItemDetails(Resource):
    @marshal_with(item_details_resource_fields)
    def get(self, menu_id):
        """Returns a list of Item details"""
        return ItemDetail.query.filter(ItemDetail.menu_id == menu_id).all(), 200