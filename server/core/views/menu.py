from flask_restful import Resource, fields, marshal_with

from core.models.menu import Menu


menu_resource_fields = {
    'menu_id': fields.Integer,
    'category_id': fields.Integer,
    'item_name': fields.String,
    'description': fields.String,
    'price': fields.Integer,
    'visibility': fields.String,
    'position_in_menu': fields.Integer,
    'date_added': fields.String,
    'total_calories': fields.Integer,
    'discount': fields.Integer
    
}

class MenuItems(Resource):
    @marshal_with(menu_resource_fields)
    def get(self):
        """Return the list of all MenuItems."""
        return Menu.query.all(), 200