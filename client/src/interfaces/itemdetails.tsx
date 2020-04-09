export interface ItemDetailsJson{
	menu_id: number,
	ingredient_id: number,
	modifiable: boolean,
	quantity: number,
	default_ingredient: boolean,
	ingregient:string
}

export interface ItemDetailsJsonResponse{
    data: [ItemDetailsJson]
}

export interface ItemDetailsJsonPostResponse{
    data: ItemDetailsJson
}