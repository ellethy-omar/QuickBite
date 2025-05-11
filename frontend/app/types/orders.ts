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
  _id: string;
  status: string;
  userID: string;
  restaurantID: {
    _id: string;
    name: string;
    logo?: string;
    contact: {
      phone: string;
    };
  };
  deliveryDriverID: {
    _id: string;
    name: string;
    phone: string;
    profilePicture: string;
    rating: number;
    vehicle: {
      model: string;
      plateNumber: string;
    };
  } | null;
  items: Array<{
    _id: string;
    productId: {
      _id: string;
      name: string;
    };
    quantity: number;
  }>;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  processingStartedAt?: string;
  deliveredAt?: string;
}
