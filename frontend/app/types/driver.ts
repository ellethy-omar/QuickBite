export interface DriverData {
    name: string;
    email: string;
    _id: string;
    phone: string;
    profilePicture: string;
    vehicle: {
        category: string;
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