from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.itemDetails import ItemDetail
from core.models.ingredients import IngredientsList
from core import db

item_details_resource_fields={
    'menu_id': fields.Integer, 
    'ingredient_id': fields.Integer, 
    'modifiable': fields.String, 
    'quantity':fields.Integer,
    'ingredients':fields.String
}

parser = reqparse.RequestParser()
# parser.add_argument('menu_id')
parser.add_argument('ingredient_id')
parser.add_argument('modifiable')
parser.add_argument('ingredient')
parser.add_argument('calorie')


class ItemDetails(Resource):
    @marshal_with(item_details_resource_fields)
    def get(self, menu_id):
        """Returns a list of Item details"""
        return ItemDetail.query.filter(ItemDetail.menu_id == menu_id).all(), 200

    @marshal_with(item_details_resource_fields)
    def post(self, menu_id):
        """Adds Ingredients to a Menu"""
        args = parser.parse_args()
        ingredient_id = 0
        if 'ingredient_id' not in args or not args['ingredient_id']:
            new_ingredient = IngredientsList(args.get('ingredient'),args.get('calorie'))
            db.session.add(new_ingredient)
            db.session.commit()
            ingredient_id = new_ingredient.ingredient_id
        else:
            ingredient_id = args.get('ingredient_id')
        item_detail = ItemDetail(menu_id, ingredient_id, modifiable=bool(args.get('modifiable')))
        db.session.add(item_detail)
        db.session.commit()
        return item_detail, 201