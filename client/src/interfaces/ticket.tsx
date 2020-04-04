export interface Ticket{
    ticket_id: number,
    session_id: number,
    ticket_timestamp: string,
    table_number: number 
}

export interface TicketResponse{
    data: [Ticket]
}

export interface TicketPostResponse{
    data: Ticket
}

export interface TicketItem{
	order_item_id: number,
    ticket_id: number,
    menu_id: number,
    ingredients_added: string,
    ingredients_removed: string,
    remark: string,
    item_status: string
}

export interface TicketItemResponse{
	data: [TicketItem]
}

export interface TicketItemPostResponse{
	data: TicketItem
}