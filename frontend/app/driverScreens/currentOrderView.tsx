import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { fetchCurrentOrder, cancelOrder, markOrderAsDelivered } from '../endpoints/driverEndpoints';
import { OrderDriver } from '../types/orderDriver';
import { ScrollView } from 'react-native-gesture-handler';
import ConfirmActionModal from '../components/modals/confirmActionModal';
import { useNotification } from '../context/notificationContext';
import { useNavigation } from 'expo-router';
import { ChatDriver } from '../types/chat';
import { DriverData } from '../types/driver';
import { useSelector } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';

export default function CurrentOrderView() {
    const [orderData, setOrderData] = useState<OrderDriver| null>(null);
    const [driverData, setDriverData] = useState<DriverData>(useSelector((state: any) => state.driver));
    const { showNotification } = useNotification();
    const [fetching, setFetching] = useState(true);
    const [submitting, setSubmitting] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const navigator = useNavigation();
    const [modalData, setModalData] = useState({
        title: "",
        message: "",
        onConfirm: () => {},
        onClose: () => {},
        visible: false,
    });

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const response = await fetchCurrentOrder();
            setOrderData(response);
        } catch (error) {
            console.error("Error refreshing order:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleCancelModal = async () => {
        setModalData({
            title: "Cancel Order Delivery",
            message: "Are you sure you want to cancel the order delivery? This action cannot be undone.",
            onConfirm: async () => {
                try {
                    await cancelOrder(orderData?.orderId ?? "")
                    showNotification("Order delivery cancelled successfully", "success");
                    setTimeout(() => {
                        onRefresh();
                    }, 1000);
                } catch (error) {
                    console.error("Error cancelling order:", error);
                    showNotification("Failed to cancel order delivery", "error");
                } finally {
                    setSubmitting(0);
                    setModalData({...modalData, visible: false});
                }
            },
            onClose: () => {
                setSubmitting(0);
                setModalData({
                    ...modalData,
                    visible: false,
                });
            },
            visible: true,
        });
    };

    const handleDeliverOrder = async () => {
        setModalData({
            title: "Finish Order Delivery",
            message: "Mark delivery as done, customer must have the order delivered before marking, are you sure you want to proceed?",
            onConfirm: async () => {
                try {
                    await markOrderAsDelivered()
                    showNotification("Order delivery Done successfully", "success");
                    setTimeout(() => {
                        onRefresh();
                    }, 1000);                 
                } catch (error) {
                    console.error("Error Finishing order:", error);
                    showNotification("Failed to mark order delivery", "error");
                } finally {
                    setSubmitting(0);
                    setModalData({...modalData, visible: false});
                }
            },
            onClose: () => {
                setSubmitting(0);
                setModalData({
                    ...modalData,
                    visible: false,
                });
            },
            visible: true,
        });
    }
    useEffect(() => {
    if(submitting == 3) {
        handleCancelModal();
    } else if (submitting == 1) {
        handleDeliverOrder();
    }
    }, [submitting]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetchCurrentOrder();
                setOrderData(response);
            } catch (error) {
                console.error("Error fetching current order:", error);
            } finally {
                setFetching(false);
            }
        };
        fetchOrder();
    }, []);

    const handleNavigateToChat = () => {
            const chatData : ChatDriver = {
                receiverId: orderData?.userId?._id ?? "",
                senderId: driverData?._id ?? "",
                orderId: orderData?.orderId ?? "",
                id: "1",
                messages: []
            };
        navigator.navigate("_chatutils/userDriverChat", {chat: JSON.stringify(chatData)});
    }

    return (
        <View style={styles.container}>
            <ConfirmActionModal
                visible={modalData.visible}
                onClose={modalData.onClose}
                onConfirm={modalData.onConfirm}
                title={modalData.title}
                message={modalData.message}/>
            <Text style={styles.title}>Order Tracker</Text>
            <Text style={styles.subTitle}>
                This is where you can track your current order.
            </Text>
            <ScrollView style={{flex: 1, width: "95%"}} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}>
            {fetching ? (
                <Text style={{ fontSize: 16, color: colors.primary }}>Loading...</Text>
            ) : orderData != null ? (
                <>
                <View style={styles.sectionContainer}>
                    <View >
                        <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '700', color: colors.primary }}>Order Pickup At {orderData.restaurantId.name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Located at: <Text style={styles.infoText}>{orderData.restaurantId.address.area}, {orderData.restaurantId.address.street}, {orderData.restaurantId.address.city}</Text></Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Contact with: <Text style={styles.infoText}>{orderData.restaurantId.phone}</Text></Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '700', color: colors.primary }}>Order Delivery To {orderData.userId.name}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Located at: <Text style={styles.infoText}>{orderData.deliveryAddress.area}, {orderData.deliveryAddress.street}, {orderData.deliveryAddress.building}, {orderData.deliveryAddress.apartment}, {orderData.deliveryAddress.floor}</Text></Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Contact with: <Text style={styles.infoText}>{orderData.userId.phone}</Text></Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>Order Details</Text>
                        {orderData.items.map((item, index: number) => (
                            <View key={index} style={{paddingVertical: 5}}>
                                <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 5}}>{item.itemName}</Text>
                                <Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>{item.itemDescription}</Text>  
                                <Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>{item.itemPrice} EGP</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>Summary</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 10 }}>Total Amount: <Text style={{fontSize: 15, fontWeight: '700', color: colors.primary}}>{orderData.totalAmount}</Text> EGP</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 5 }}>Delay on order: <Text style={{fontSize: 15, fontWeight: '700', color: colors.primary}}>{Math.floor((Date.now() - new Date(orderData.createdOn).getTime()) / (1000 * 60))}</Text> minutes</Text>
                    </View>
                </View>
                <View style={{display: "flex", gap:10, marginVertical: 20}}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>Actions</Text>
                    <Text style={{ fontSize: 13, fontWeight: '500', marginBottom: 5 }}>Please refrain from violating our terms of service in the customer chat and remember to be precise</Text>
                    <TouchableOpacity style={{ backgroundColor: submitting == 1 ? "gray" : colors.primary, padding: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',}} onPress={() => setSubmitting(1)}>
                        <Text style={styles.buttonText}>{submitting == 1 ? "loading..." : "Finish Order Delivery"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: submitting == 2 ? "gray" : colors.primary, padding: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',}} onPress={() => handleNavigateToChat()}>
                        <Text style={styles.buttonText}>{submitting == 2 ? "loading..." : "Chat With Customer"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: submitting == 3 ? "gray" : "lightgray", padding: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',}} onPress={() => setSubmitting(3)}>
                        <Text style={styles.buttonText}>{submitting == 3 ? "loading..." : "Cancel Delivery"}</Text>
                    </TouchableOpacity>
                </View>
                </>
            ) : (
                <Text style={{ fontSize: 20, fontWeight: "500", color: colors.primary, textAlign: 'center', marginTop: 100 }}>
                    No current orders available
                </Text>
            )}
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: colors.background,
    },
    sectionContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
        backgroundColor: colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: colors.primary,
        elevation: 5,
        gap: 30
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: colors.primary,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 13,
        fontWeight: '500',
        color: 'gray',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
    },
    button: {
        position: 'absolute',
        bottom: 80,
        borderRadius: 100,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: colors.primary,
    },
});