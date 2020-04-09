from flask_restful import Resource, fields, marshal_with, reqparse, request

from core.models.ingredients import IngredientsList
from core import db

ingredients_resource_fields = {
    'ingredient_id': fields.Integer,
    'ingredient_name': fields.String,
    'price': fields.Integer,
    'calorie': fields.Integer    
}

class Ingredients(Resource):

    @marshal_with(ingredients_resource_fields)
    def get(self):
        """Returns a list of Ingredients"""
        return IngredientsList.query.all(), 200