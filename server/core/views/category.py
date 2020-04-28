from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.category import Category
from core import db

category_resource_fields = {
    'category_id': fields.Integer,
    'category_name': fields.String,
    'position_in_menu': fields.Integer,
    'visibility': fields.Boolean
}

parser = reqparse.RequestParser()
parser.add_argument('category_name')
parser.add_argument('position_in_menu')


class Categories(Resource):

    @marshal_with(category_resource_fields)
    def get(self):
        """Returns a list of categories"""
        return Category.query.order_by(Category.position_in_menu).filter(Category.visibility == True).all(), 200

    @marshal_with(category_resource_fields)
    def post(self):
        """Adds new category"""
        args = parser.parse_args()
        new_category = Category(category_name=args.get(
            'category_name'), position_in_menu=args.get('position_in_menu'))
        db.session.add(new_category)
        db.session.commit()
        return new_category, 201


class CategoryById(Resource):

    @marshal_with(category_resource_fields)
    def patch(self, category_id):
        """Modifies the position of category category"""
        category = Category.query.get_or_404(category_id)

        if 'position_in_menu' in request.json:
            category.position_in_menu = request.json['position_in_menu']
        if 'visibility' in request.json:
            visibility = 0 if request.json['visibility'] == False else 1
            category.visibility = visibility

        db.session.commit()
        return category, 200
    @marshal_with(category_resource_fields)
    def get(self, category_id):
        return Category.query.filter(Category.category_id == category_id).all(), 200
