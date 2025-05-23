export interface UserFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    address: {
        label: string;
        area: string;
        street: string;
        building: string;
        floor: string;
        apartment: string;
        isDefault: boolean;
    };
}

export interface RestaurantFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    cuisines: string[];
    address: {
        area: string;
        street: string;
        city: string;
    };
    description: string;
    image: string;
    openingHours: {
        Monday: { open: string; close: string };
        Tuesday: { open: string; close: string };
        Wednesday: { open: string; close: string };
        Thursday: { open: string; close: string };
        Friday: { open: string; close: string };
        Saturday: { open: string; close: string };
        Sunday: { open: string; close: string };
    }
}

export interface DriverFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    vehicleType: string;
    vehicleModel: string;
    vehiclePlateNumber: string;
}