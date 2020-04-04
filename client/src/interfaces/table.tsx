export interface Tables{
    table_number: number,
    table_size: number,
    table_status: string,
    current_session: number 
}

export interface ServerResponse{
    data: [Tables]
}

export interface ServerPostResponse{
    data: Tables
}