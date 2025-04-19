export interface RestaurantData {
    id: string,
    name: string,
    email: string,
    ordersDone: number,
    image: string,
    banner: string,
    phone: string,
    bio: string,
    rating: number,
    ratingCount: number,
    address: string,
    cuisines: string[],
    menu: MenuItem[],
}

export interface MenuItem {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
}