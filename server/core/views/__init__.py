from flask_restful import Api

from core import app
from .menu import MenuItems
from .table import TableDetail, TableDetailById
from .category import Categories, CategoryById

api = Api(app)   


api.add_resource(MenuItems, '/Menu')
api.add_resource(TableDetail, '/Tables')
api.add_resource(TableDetailById, '/Tables/<table_number>')
api.add_resource(Categories, '/Categories')
api.add_resource(CategoryById, '/Categories/<category_id>')

if __name__ == '__main__':
    app.run()
