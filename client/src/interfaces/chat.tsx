export interface Chat{
    message: string
}

export interface ChatResponse{
    data: [Chat]
}

export interface ChatPostResponse{
    data: Chat
}
