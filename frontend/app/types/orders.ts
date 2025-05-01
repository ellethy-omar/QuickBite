export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface TimelineEvent {
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  time: string;
}

export interface Driver {
  name: string;
  phone: string;
  photo: string;
}

export interface DeliveryAddress {
  label: string;
  area: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  isDefault: boolean;
}

export interface OrderSummary {
  id: string;
  restaurantName: string;
  restaurantLogo: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
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

export interface OrderDetailsMap {
  [key: string]: OrderDetails;
}

export interface RawOrder {
  status: string;
  userID: string;
  restaurantID: {
    _id: string;
    name: string;
    logo?: string;
  };
  deliveryDriverID: string | null;
  items: Array<{ productId: string; quantity: number }>;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
