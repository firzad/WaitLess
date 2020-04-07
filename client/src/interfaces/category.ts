export interface Category{
	category_id: number,
	category_name: string,
	visibility: boolean,
	position_in_menu: number,
}

export interface CategoryResponse{
    data: [Category]
}

export interface CategoryPostResponse{
    data: Category
}