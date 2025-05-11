export interface AdminData {
    id: string,
    name: string,
    email: string,
    handledRequests: number,
    profilePicture: string,
    phone: string,
}

export interface DriverMailData {
    id: string,
    senderId: string,
    name: string,
    status: string,
    senderModel: string,
    description: string,
    createdAt: string,
}