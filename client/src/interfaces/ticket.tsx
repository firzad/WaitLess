export interface Ticket {
    ticket_id: number,
    session_id: number,
    ticket_timestamp: Date,
    table_number: number,
    ticket_status: string
}

export interface TicketResponse {
    data: [Ticket]
}

export interface TicketPostResponse {
    data: Ticket
}

export interface TicketItem {
    order_item_id: number,
    ticket_id: number,
    menu_id: number,
    ingredients_added: string,
    ingredients_removed: string,
    remark: string,
    item_status: string,
    quantity: number
}

export interface TicketItemResponse {
    data: [TicketItem]
}

export interface TicketItemPostResponse {
    data: TicketItem
}

export interface TicketMenuItem {
    ticket_id: number,
    session_id: number,
    ticket_timestamp: string,
    table_number: number,
    ticket_status: string,
    order_item_id: number,
    menu_id: number,
    ingredients_added: string,
    ingredients_removed: string,
    remark: string,
    quantity: number,
    item_status: string,
    category_id: number,
    item_name: string,
    description: string,
    price: number,
    visibility: boolean,
    position_in_menu: number,
    date_added: string,
    total_calories: number,
    discount: number
}

export interface TicketMenuItemResponse {
    data: [TicketMenuItem]
}

export interface TicketMenuItemPostResponse {
    data: TicketMenuItem
}