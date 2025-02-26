export interface MenuJson{
	menu_id: number,
	category_id: number,
	item_name: string,
	description: string,
	price: number,
	visibility: boolean,
	position_in_menu: number,
	date_added: string,
	total_calories: number,
	discount: number,
	category: string
}

export interface MenuResponse{
    data: [MenuJson]
}

export interface MenuPostResponse{
    data: MenuJson
}