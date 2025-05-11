import { OrderDriver } from '../types/orderDriver';
import apiClient from '../apiclient';
import { DriverData } from '../types/driver';

export const fetchUserOrders = async () => {
  try {      
      const response = await apiClient.get('/api/driver/getAllAvailableOrders');
      const orders: OrderDriver[] = response.data.data.map((order: any) => ({
        orderId: order._id,
        deliveryAddress: order.userID.addresses.find((address: any) => address.isDefault == true),
        userId: order.userID == null ? {name: "Guest", phone: "333", email: "none", _id: "fmfnjnwdoi"} : order.userID,
        totalAmount: order.totalAmount,
        restaurantId: {...order.restaurantID, logo: order.restaurantID.logo, phone: order.restaurantID.contact.phone},
        items: order.items.map((item: any) => ({
          itemId: item.productId._id,
          itemPrice: item.productId.price,
          itemName: item.productId.name,
          itemQuantity: item.quantity,
          itemDescription: item.productId.description,
        })),
        createdOn: order.createdAt,
      }));
      
      return orders;
    } catch (error: any) {
      console.error("error fetching orders", error.response?.data || error.message);
      throw error;
    }
  };

export const acceptOrder = async (orderId: string) => {
  try {
    const response = await apiClient.put(`/api/driver/acceptOrder?orderId=${orderId}`, {});
    

    return response.data;
  } catch (error: any) {
    console.error("error accepting order", error.response?.data || error.message);
    throw error;
  }
}

export const fetchDriverProfile = async ()  => {
  try {
      const response = await apiClient.get('/api/driver/getDriverProfile')

    return response.data.driver;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const editDriverProfile = async (driverData: DriverData) => {
  const body = {
    name: "kanye west",
    email: driverData.email,
    phone: driverData.phone,
    vehicle: {
      plateNumber: driverData.vehicle.plateNumber,
      category: driverData.vehicle.category,
      model: driverData.vehicle.model
    }
  }

  try {
    const response = await apiClient.put('/api/driver/updateDriverProfile', body);

    return response.data;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const fetchCurrentOrder = async () => {
  try {
    const response = await apiClient.get('/api/driver/getTheOrderIneedToDeliver');
    const orderData = response.data.existingOrder;
    if(!orderData) {
      return null;
    }
    const order: OrderDriver = {
        orderId: orderData._id,
        deliveryAddress: orderData.userID.addresses.find((address: any) => address.isDefault == true),
        userId: orderData.userID == null ? {name: "Guest", phone: "333", email: "none", _id: "fmfnjnwdoi"} : orderData.userID,
        totalAmount: orderData.totalAmount,
        restaurantId: {...orderData.restaurantID, logo: orderData.restaurantLogo, phone: orderData.restaurantID.contact.phone},
        items: orderData.items.map((item: any) => ({
          itemId: item.productId._id,
          itemPrice: item.productId.price,
          itemName: item.productId.name,
          itemQuantity: item.quantity,
          itemDescription: item.productId.description,
        })),
        createdOn: orderData.createdAt,
      }
    
  return order;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const fetchDriverHistory = async () => {
  try {
    const response = await apiClient.get('/api/driver/getMyOrdersHistory');
    const orderData = response.data.existingOrder;
    if(!orderData) {
      return null;
    }

    const orders: OrderDriver[] = orderData.map((order: any) => ({
      orderId: order._id,
      deliveryAddress: order.userID.addresses.find((address: any) => address.isDefault == true),
      userId: order.userID == null ? {name: "Guest", phone: "333", email: "none", _id: "fmfnjnwdoi"} : order.userID,
      totalAmount: order.totalAmount,
      restaurantId: {...order.restaurantID, logo: order.restaurantLogo, phone: order.restaurantID.contact.phone},
      items: order.items.map((item: any) => ({
        itemId: item.productId._id,
        itemPrice: item.productId.price,
        itemName: item.productId.name,
        itemQuantity: item.quantity,
        itemDescription: item.productId.description,
      })),
      createdOn: order.createdAt,
    }));
    
  return orders;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await apiClient.put(`/api/driver/leaveOrder?orderId=${orderId}`, {});
    return response.data;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const markOrderAsDelivered = async () => {
  try {
    const response = await apiClient.put(`/api/driver/markDeliveryAsDone`, {});
    return response.data;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const sendAdminRequest = async (request: string) => {
  try {
    const response = await apiClient.post('/api/driver/sendRequest', {
      description: request,
      data: {}
    });
    return response.data;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

export const fetchAllNotifications = async () => {
  try {
    const response = await apiClient.get('/api/driver/getNotifications');
    console.log("response", JSON.stringify(response.data.notifications));
    const notifications = response.data.notifications.map((notification: any) => ({
      id: notification._id,
      description: notification.description,
      adminName: "QuickBite Admin",
    }));

    return notifications;
  } catch (error: any) {
    console.error("error", error.response?.data || error.message);
    throw error;
  }
}

