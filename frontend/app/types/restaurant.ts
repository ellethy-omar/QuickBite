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
    address: string;
    cuisines: string[];
    menu: MenuItem[];
    openingHours?: {
        [key: string]: { open: string; close: string };
      };
  }  

export interface MenuItem {
    id: string,
    name: string,
    price: number,
    description: string,
    image: string,
}