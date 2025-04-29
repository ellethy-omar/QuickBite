export interface OrderDriver {
    orderId: string;
    userId: string;
    restaurantId: string;
    userName: string;
    createdOn: string;
    deliveryAddress: {
        label: string;
        area: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        isDefault: boolean;
        id?: string;
    } 
    restaurantName: string;
    items: {
        itemId: string;
        itemDescription: string;
        itemPrice: number;
        itemName: string;
        itemQuantity: number;
    }[];
    restaurantAddress: {
        area: string;
        street: string;
        city: string;
        id?: string;
    };
    restaurantPhone: string;
    restaurantLogo: string;
    totalAmount: number;
}