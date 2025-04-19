export interface UserFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface RestaurantFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    cuisines: string[];
    address: string;
    description: string;
    image: string;
}