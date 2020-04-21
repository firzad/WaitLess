from flask_restful import Resource, fields, marshal_with, reqparse, url_for, request

from core.models.menu import Menu
from core import db, app
from core.views.image import Image

class ImageURL(fields.Raw):
    def format(self, value):
        return app.config['BASE_URL']+url_for('image', file_name=value)


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
    'discount': fields.Integer,
    'category': fields.String,
    'file_name': fields.String(attribute='imgfile'),
    'img_url': ImageURL(attribute='imgfile')
}
# category_id, item_name, description, price, position_in_menu
parser = reqparse.RequestParser()
parser.add_argument('category_id')
parser.add_argument('item_name')
parser.add_argument('description')
parser.add_argument('price')
parser.add_argument('position_in_menu')
parser.add_argument('imgfile')



class MenuItems(Resource):
    @marshal_with(menu_resource_fields)
    def get(self):
        """Return the list of all MenuItems."""
        return Menu.query.filter(Menu.visibility==True).order_by(Menu.menu_id).all(), 200

    @marshal_with(menu_resource_fields)
    def post(self):
        """Return the list of all MenuItems."""
        args = parser.parse_args()
        new_menu = Menu(
            category_id=args.get('category_id'),
            item_name=args.get('item_name'),
            description=args.get('description'),
            price=args.get('price'),
            position_in_menu=args.get('position_in_menu'),
            imgfile=args.get('imgfile')
        )
        db.session.add(new_menu)
        db.session.commit()
        return new_menu, 201

class MenuItemById(Resource):
    @marshal_with(menu_resource_fields)
    def get(self, menu_id):
        """Return menu item by id"""
        return Menu.query.filter(Menu.menu_id == menu_id).all(), 200

    def get_no_marshal(self, menu_id):
        """Return menu item by id, non marshaled object directly. used internally by ticket_item.py view"""
        return Menu.query.filter(Menu.menu_id == menu_id).all()

    @marshal_with(menu_resource_fields)
    def patch(self, menu_id):
        menu = Menu.query.get_or_404(menu_id)
        if 'item_name' in request.json:
            menu.item_name = request.json['item_name']
        if 'description' in request.json:
            menu.description = request.json['description']
        if 'price' in request.json:
            menu.price = request.json['price']
        if 'imgfile' in request.json:
            menu.imgfile = request.json['imgfile']
        if 'visibility' in request.json:
            visibility = 0 if request.json['visibility'] == False else 1
            menu.visibility = visibility

        db.session.commit()

        return menu, 200


class MenuItemByCategory(Resource):
    @marshal_with(menu_resource_fields)
    def get(self, category_id):
        """Return menu item by id"""
        return Menu.query.filter(Menu.category_id == category_id).all(), 200