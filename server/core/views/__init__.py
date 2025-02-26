from flask_restful import Api

from core import app, socketio
from .ingredients import Ingredients
from .itemDetails import ItemDetails
from .ticket import Ticket, SessionTicket
from .summary import SummaryTable, SummaryById
from .category import Categories, CategoryById
from .menu import MenuItems, MenuItemById, MenuItemByCategory
from .table import TableDetail, TableDetailById, FreeTables, ActiveTables, TableStatus, SwitchTableAssistance
from .ticket_item import TicketItemByTicket, TicketItem, TicketItemsBySession, TicketPriceTotal, ActiveTicketMenuItems, UpdateTicketItems
from .chatbot import Chat

api = Api(app)

api.add_resource(MenuItems, '/Menu')
api.add_resource(MenuItemById, '/Menu/<menu_id>')
api.add_resource(MenuItemByCategory, '/Menu/Category/<category_id>')
api.add_resource(Ingredients, '/Ingredients')
api.add_resource(SummaryTable, '/Summary')
api.add_resource(SummaryById, '/Summary/<session_id>')
api.add_resource(TableDetail, '/Tables')
api.add_resource(FreeTables, '/Tables/free')
api.add_resource(TableStatus, '/Tables/status/<table_number>')
api.add_resource(ActiveTables, '/Tables/active')
api.add_resource(TableDetailById, '/Tables/<table_number>')
api.add_resource(Categories, '/Categories')
api.add_resource(ItemDetails, '/ItemDetails/<menu_id>')
api.add_resource(CategoryById, '/Categories/<category_id>')
api.add_resource(SessionTicket, '/Ticket/<session_id>')
api.add_resource(Ticket, '/Ticket')
api.add_resource(TicketItem, '/TicketItem')
api.add_resource(UpdateTicketItems, '/TicketItem/Update')
api.add_resource(ActiveTicketMenuItems, '/Ticket/active')
api.add_resource(TicketItemByTicket, '/Ticket/OrderItems/<ticket_id>')
api.add_resource(TicketItemsBySession, '/Ticket/Session/<session_id>')
api.add_resource(TicketPriceTotal, '/Ticket/Session/Price/<session_id>')
api.add_resource(SwitchTableAssistance, '/Tables/Assistance/<table_number>')
api.add_resource(Chat, '/Chat')

if __name__ == '__main__':
    # app.run()
    socketio.run(app)
