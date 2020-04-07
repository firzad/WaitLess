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

class MenuItemById(Resource):
    @marshal_with(menu_resource_fields)
    def get(self, menu_id):
        """Return menu item by id"""
        return Menu.query.filter(Menu.menu_id == menu_id).all(), 200

    def get_no_marshal(self, menu_id):
        """Return menu item by id, non marshaled object directly. used internally by ticket_item.py view"""
        return Menu.query.filter(Menu.menu_id == menu_id).all()


class MenuItemByCategory(Resource):
    @marshal_with(menu_resource_fields)
    def get(self, category_id):
        """Return menu item by id"""
        return Menu.query.filter(Menu.category_id == category_id).all(), 200