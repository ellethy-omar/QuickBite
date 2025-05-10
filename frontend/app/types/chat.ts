export interface ChatDriver {
    id: string;
    senderId: string;
    receiverId: string;
    orderId: string;
    messages: ChatMessage[];
}

export interface ChatMessage {
    id: string;
    ownerId: string;
    message: string;
    timestamp: string;
    isRead: boolean;
}