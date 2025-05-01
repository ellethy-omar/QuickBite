export interface DriverData {
    name: string;
    email: string;
    _id: string;
    phone: string;
    image: string;
    vehicle: {
        type: string;
        model: string;
        plateNumber: string;
    };
    rating: number;
    deliveryStats: {
        completed: number;
        avgDeliveryTime: number;
    };
    isBanned: boolean;
}