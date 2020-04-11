from flask_restful import Api

from core import app
from .menu import MenuItems, MenuItemById, MenuItemByCategory
from .table import TableDetail, TableDetailById, FreeTables, ActiveTables, ClearTable, SwitchTableAssistance
from .category import Categories, CategoryById
from .ticket import Ticket
from .ticket_item import TicketItem, TicketsBySession, TicketPriceTotal
from .ingredients import Ingredients
from .itemDetails import ItemDetails
from .summary import SummaryTable, SummaryById

api = Api(app)   


api.add_resource(MenuItems, '/Menu')
api.add_resource(MenuItemById, '/Menu/<menu_id>')
api.add_resource(MenuItemByCategory, '/Menu/Category/<category_id>')
api.add_resource(Ingredients, '/Ingredients')
api.add_resource(SummaryTable, '/Summary')
api.add_resource(SummaryById, '/Summary/<session_id>')
api.add_resource(TableDetail, '/Tables')
api.add_resource(FreeTables, '/Tables/free')
api.add_resource(ClearTable, '/Tables/clear/<table_number>')
api.add_resource(ActiveTables, '/Tables/active')
api.add_resource(TableDetailById, '/Tables/<table_number>')
api.add_resource(Categories, '/Categories')
api.add_resource(ItemDetails, '/ItemDetails/<menu_id>')
api.add_resource(CategoryById, '/Categories/<category_id>')
api.add_resource(Ticket, '/Ticket/<session_id>')
api.add_resource(TicketItem, '/Ticket/OrderItems/<ticket_id>')
api.add_resource(TicketsBySession, '/Ticket/Session/<session_id>')
api.add_resource(TicketPriceTotal, '/Ticket/Session/Price/<session_id>')
api.add_resource(SwitchTableAssistance, '/Tables/Assistance/<table_number>')

if __name__ == '__main__':
    app.run()
