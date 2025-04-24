export interface userData {
    id: string;
    name: string;
    email: string;
    banned: boolean;
    profileImage: string;
    phone: string;
    address:{
        label: string;
        area: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        isDefault: boolean;
    }[];
}