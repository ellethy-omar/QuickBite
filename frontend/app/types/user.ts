export interface userData {
    _id: string;
    name: string;
    email: string;
    isBanned: boolean;
    profileImage: string;
    phone: string;
    addresses: Array<{
        label: string;
        area: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        isDefault: boolean;
    }>;
    createdAt: string;
}