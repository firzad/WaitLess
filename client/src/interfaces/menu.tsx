export interface Menu{
    menu_id: number,
    category_id: number,
    item_name: string,
    description: string,
    price: number,
    total_calories: number,
    visibility : boolean,
    position_in_menu : number
    date_added : Date,
    discount: number
};

export interface MenuResponse{
    data: [Menu]
}

export interface MenuPostResponse{
    data: Menu
}

export interface Category{
    category_id : number,
    category_name : string,
    position_in_menu : number,
    visibility : boolean 
};
export interface CategoryResponse{
    data: [Category]
}