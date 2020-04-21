from flask_restful import Api

from core import app, socketio
from .menu import MenuItems, MenuItemById, MenuItemByCategory
from .table import TableItemDelivered, TableDetail, TableDetailById, FreeTables, ActiveTables, TableStatus, SwitchTableAssistance
from .category import Categories, CategoryById
from .ticket import Ticket, SessionTicket
from .ticket_item import TicketItemByTicket, TicketItem, TicketItemsBySession, TicketPriceTotal, ActiveTicketMenuItems, UpdateTicketItems, TicketSummary
# from .chatbot import Chat
from .ingredients import Ingredients
from .itemDetails import ItemDetails
from .summary import SummaryTable, SummaryById, SummaryForDay
from .image import Image

api = Api(app)   


api.add_resource(MenuItems, '/Menu')
api.add_resource(MenuItemById, '/Menu/<menu_id>')
api.add_resource(MenuItemByCategory, '/Menu/Category/<category_id>')
api.add_resource(Ingredients, '/Ingredients')
api.add_resource(SummaryTable, '/Summary')
api.add_resource(SummaryForDay, '/Summary/Day')
api.add_resource(SummaryById, '/Summary/<session_id>')
api.add_resource(TableDetail, '/Tables')
api.add_resource(FreeTables, '/Tables/free')
api.add_resource(TableStatus, '/Tables/status/<table_number>')
api.add_resource(ActiveTables, '/Tables/active')
api.add_resource(TableItemDelivered, '/Tables/Delivered/<table_number>')
api.add_resource(TableDetailById, '/Tables/<table_number>')
api.add_resource(Categories, '/Categories')
api.add_resource(ItemDetails, '/ItemDetails/<menu_id>')
api.add_resource(CategoryById, '/Categories/<category_id>')
api.add_resource(SessionTicket, '/Ticket/<session_id>')
api.add_resource(Ticket, '/Ticket')
api.add_resource(TicketItem, '/TicketItem')
api.add_resource(TicketSummary, '/DishSummary')
api.add_resource(UpdateTicketItems, '/TicketItem/Update')
api.add_resource(ActiveTicketMenuItems, '/Ticket/active')
api.add_resource(TicketItemByTicket, '/Ticket/OrderItems/<ticket_id>')
api.add_resource(TicketItemsBySession, '/Ticket/Session/<session_id>')
api.add_resource(TicketPriceTotal, '/Ticket/Session/Price/<session_id>')
api.add_resource(SwitchTableAssistance, '/Tables/Assistance/<table_number>')
api.add_resource(Image, '/Image/<file_name>')
# api.add_resource(Chat, '/Chat')

if __name__ == '__main__':
    # app.run()
    socketio.run(app)
