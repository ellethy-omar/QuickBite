

export interface OrderDriver {
    orderId: string;
    userId: {
        _id: string;
        name: string;
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
    };
    restaurantId: {
        _id: string;
        name: string;
        phone: string;
        logo: string;
        address:{
            area: string;
            street: string;
            city: string;
            id?: string;
        };
    };
    createdOn: string;
    deliveryAddress: {
        label: string;
        area: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        isDefault: boolean;
        _id?: string;
    } 
    items: {
        itemId: string;
        itemPrice: number;
        itemName: string;
        itemQuantity: number;
        itemDescription?: string;
    }[];
    totalAmount: number;
}