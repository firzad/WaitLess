export interface Ingredients{
    ingredient_id : number,
    ingredient_name : string,
    price : number,
    calorie : number
}
export interface IngredientsResponse{
    data: [Ingredients]
}