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
        description: string;
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
        coverImage: string;

  }  

export interface MenuItem {
  id: string; // Maps to _id from API
  name: string;
  price: number;
  description: string;
  image: string;
  stockAvailable?: number;
  restraurantId?: string;
  category?: string;
  isAvailable: boolean; // Default to true
}