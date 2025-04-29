// Define interfaces for order data
export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface TimelineEvent {
    status: string;
    time: string;
  }
  
  export interface Driver {
    name: string;
    phone: string;
    photo: string;
  }
  
  export interface DeliveryAddress {
    label: string;
    full: string;
  }
  
  export interface OrderSummary {
    id: string;
    restaurantName: string;
    restaurantLogo: string;
    date: string;
    total: number;
    status: string;
    items: number;
  }
  
  export interface OrderDetails extends OrderSummary {
    subtotal: number;
    deliveryFee: number;
    tax: number;
    paymentMethod: string;
    driver: Driver | null;
    deliveryAddress: DeliveryAddress;
    items: OrderItem[];
    timeline: TimelineEvent[];
  }
  
  // Map of order IDs to order details
  export interface OrderDetailsMap {
    [key: string]: OrderDetails;
  }