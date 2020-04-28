export interface Summary {
    session_id: number,
    table_number: number,
    date_order: Date,
    price: number
}

export interface SummaryResponse {
    data: [Summary]
}

export interface SummaryPostResponse {
    data: Summary
}
