import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';
import { ScrollView } from 'react-native-gesture-handler';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function OrdersDetailsScreen() {
    const { order } = useLocalSearchParams();
    const [orderData, setOrderData] = useState<OrderDriver| null>(order ? JSON.parse(order as string) : null);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                    <Text style={styles.title}>Order Tracker</Text>
                    <ScrollView style={{flex: 1, width: "95%"}} showsVerticalScrollIndicator={false}>
                    {orderData != null ? (
                        <>
                        <View style={styles.sectionContainer}>
                            <View >
                                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '700', color: colors.primary }}>Order Being delivered By {orderData.driverId.name}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Located at: <Text style={styles.infoText}>{orderData.driverId.vehicle.category}, {orderData.driverId.vehicle.model}, {orderData.driverId.vehicle.plateNumber}</Text></Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Contact with: <Text style={styles.infoText}>{orderData.driverId.phone}</Text></Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '700', color: colors.primary }}>Order Delivery To {orderData.userId.name}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Located at: <Text style={styles.infoText}>{orderData.deliveryAddress.area}, {orderData.deliveryAddress.street}, {orderData.deliveryAddress.building}, {orderData.deliveryAddress.apartment}, {orderData.deliveryAddress.floor}</Text></Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Contact with: <Text style={styles.infoText}>{orderData.userId.phone}</Text></Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: '700', color: colors.primary }}>Ordered Restaurant {orderData.restaurantId.name}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Located at: <Text style={styles.infoText}>{orderData.restaurantId.address.area}, {orderData.restaurantId.address.city}, {orderData.restaurantId.address.street}</Text></Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>Contact with: <Text style={styles.infoText}>{orderData.userId.phone}</Text></Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>Order Details</Text>
                                {orderData.items.map((item, index: number) => (
                                <>
                                    <View key={index}>
                                        <Text style={{fontSize: 14, fontWeight: '600', marginBottom: 5}}>{item.itemName}</Text>
                                        <Text style={{fontSize: 12, color: 'gray', fontWeight: '500', marginBottom: 5}}>{item.itemDescription}</Text>
                                        <Text style={{fontSize: 12, fontWeight: '500', color: 'gray'}}>{item.itemPrice} EGP</Text>
                                    </View>
                                    <View style={{width: "80%", height: 1, backgroundColor: "gray", marginVertical: 10, marginHorizontal: "auto"}} />
                                </>
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
                            <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 5, textAlign:"center" }}>Coming soon</Text>
                        </View>
                        </>
                    ) : (
                        <Text style={{ fontSize: 20, fontWeight: "500", color: colors.primary, textAlign: 'center', marginTop: 100 }}>
                            No current orders available
                        </Text>
                    )}
                </ScrollView>
            </View>
        </GestureHandlerRootView>
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