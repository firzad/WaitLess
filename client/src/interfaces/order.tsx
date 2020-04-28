export interface Order {
    item_name: string,
    menu_id: number,
    ingredients_added: string,
    ingredients_removed: string,
    remark: string,
    order_item_id: number
};
export interface OrderResponse {
    data: [Order]
};
export interface OrderPostResponse {
    data: Order
};