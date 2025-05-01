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
    address: {
        street: string,
        city: string,
        area: string,
        _id: string
    },
    cuisines: string[],
    menu: MenuItem[],
    description: string,
    isActive: boolean
    isBanned: boolean,
}

export interface MenuItem {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
}