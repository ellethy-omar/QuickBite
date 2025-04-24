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
    } 
    restaurantName: string;
    restaurantAddress: {
        area: string;
        street: string;
        city: string;
    };
    restaurantPhone: string;
    restaurantLogo: string;
    totalAmount: number;
}