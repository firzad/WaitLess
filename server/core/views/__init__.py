from flask_restful import Api

from core import app
from .menu import MenuItems

api = Api(app)   


api.add_resource(MenuItems, '/Menu')

if __name__ == '__main__':
    app.run()
