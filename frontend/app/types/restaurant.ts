export interface OpeningHourRange {
    open: string;
    close: string;
  }
  
  export interface OpeningHours {
    sunday: OpeningHourRange;
    monday: OpeningHourRange;
    tuesday: OpeningHourRange;
    wednesday: OpeningHourRange;
    thursday: OpeningHourRange;
    friday: OpeningHourRange;
    saturday: OpeningHourRange;
  }
  
  export interface RestaurantData {
    id: string;
    name: string;
    email: string;
    ordersDone: number;
    image: string;
    banner: string;
    phone: string;
    bio: string;
    rating: number;
    ratingCount: number;
    address: {
        street: string,
        city: string,
        area: string,
        _id: string
    },
    cuisines: string[];
    menu: MenuItem[];
    openingHours?: {
        [day: string]: { open: string; close: string };
      };
    isActive: boolean;
    isBanned: boolean;
  }  

export interface MenuItem {
    name: string,
    price: number,
    description: string,
    image: string,
}