from flask_restful import Api

from core import app
from .menu import MenuItems, MenuItemById
from .table import TableDetail, TableDetailById, FreeTables, ActiveTables
from .category import Categories, CategoryById
from .ticket import Ticket
from .ticket_item import TicketItem, TicketsBySession

api = Api(app)   


api.add_resource(MenuItems, '/Menu')
api.add_resource(MenuItemById, '/Menu/<menu_id>')
api.add_resource(TableDetail, '/Tables')
api.add_resource(FreeTables, '/Tables/free')
api.add_resource(ActiveTables, '/Tables/active')
api.add_resource(TableDetailById, '/Tables/<table_number>')
api.add_resource(Categories, '/Categories')
api.add_resource(CategoryById, '/Categories/<category_id>')
api.add_resource(Ticket, '/Ticket/<session_id>')
api.add_resource(TicketItem, '/Ticket/OrderItems/<ticket_id>')
api.add_resource(TicketsBySession, '/Ticket/Session/<session_id>')

if __name__ == '__main__':
    app.run()
