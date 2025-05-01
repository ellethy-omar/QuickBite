import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native";
import colors from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useRef, useEffect, useState } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { acceptOrder } from "../endpoints/driverEndpoints";
import { useNotification } from "../context/notificationContext";

export default function OrderConfirm() {
    const {order} = useLocalSearchParams();
    const { showNotification } = useNotification();
    const navigation = useNavigation();
    const [orderData] = useState(JSON.parse(order));
    const shineAnim = useRef(new Animated.Value(-1)).current;
    const [submitting, setSubmitting] = useState(false)
    
    useEffect(() => {
      Animated.loop(
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }, [shineAnim]);

    const shineTranslate = shineAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-200, 200],
    });

    useEffect(() => {
        if(!submitting) return;

        const handleAcceptOrder = async () => {
            try {
                await acceptOrder(orderData.orderId);
                showNotification('Order Accepted', 'success')
                setTimeout(() => {
                    navigation.navigate('_driverutils/orderAcceptedView');
                }, 1000);
            } catch (error) {
                console.error("Error accepting order:", error);
            } finally {
                setSubmitting(false);
            }
        }

    handleAcceptOrder();
    }, [submitting]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="arrow-back" size={24} style={{height: "100%"}} color="white" onPress={() => navigation.goBack()} />
                <Text style={styles.titleText}>Order Confirmation</Text>
                <MaterialIcons name="arrow-back" size={24} style={{height: "100%", opacity: 0}} color="white"/>
            </View>
            <ScrollView style={{width: '100%'}} contentContainerStyle={{alignItems: 'center', paddingBottom: 20, position: 'relative'}}>
            <View style={styles.section}>
                    <Text style={{fontSize: 24, fontWeight: '700', color: colors.primary}}>Order Info</Text>
                    {orderData.items.map((item, index: number) => (
                        <View key={index} style={{paddingVertical: 5}}>
                            <Text style={{fontSize: 14, fontWeight: '600', marginBottom: 5}}>{item.itemName}</Text>
                            <Text style={{fontSize: 14, fontWeight: '500', color: 'gray'}}>{item.itemPrice} EGP</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={{fontSize: 24, marginBottom: 5, fontWeight: '700', color: colors.primary}}>Customer Info</Text>
                    <Text style={{fontWeight: '500', color: colors.primary}}>Name: <Text style={styles.infoText}>{orderData.userId.name}</Text></Text>
                    <Text style={{fontWeight: '500', color: colors.primary}}>Phone: <Text style={styles.infoText}>{orderData.userId.phone}</Text></Text>
                    <Text style={{fontWeight: '500', color: colors.primary}}>Delivery Address: <Text style={styles.infoText}>{orderData.deliveryAddress.area}, {orderData.deliveryAddress.street}, {orderData.deliveryAddress.building}, Floor: {orderData.deliveryAddress.floor}, Apartment: {orderData.deliveryAddress.apartment}</Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={{fontSize: 24, marginBottom: 5, fontWeight: '700', color: colors.primary}}>Restaurant Info</Text>
                    <Text style={{fontWeight: '500', color: colors.primary}}>Name: <Text style={styles.infoText}>{orderData.restaurantId.name}</Text></Text>
                    <Text style={{fontWeight: '500', color: colors.primary}}>Phone: <Text style={styles.infoText}>{orderData.restaurantId.phone}</Text></Text>
                    <Text style={{fontWeight: '500', color: colors.primary}}>Address: <Text style={styles.infoText}>{orderData.restaurantId.address.area}, {orderData.restaurantId.address.street}, {orderData.restaurantId.address.city}</Text></Text>
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignItems: 'center', paddingBottom: 10, position: 'absolute', bottom: 30}}>
                <Text style={{fontSize: 20, marginBottom: 5, fontWeight: '700', color: colors.primary}}>Total Amount: {orderData.totalAmount}</Text>
                <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: submitting ? "gray" : colors.primary, padding: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center', overflow: 'hidden',}} onPress={() => setSubmitting(true)}>
                        <Text style={styles.text}>{submitting ? "loading..." : "Accept Order"}</Text>
                        <Animated.View style={[styles.shine,{transform: [{ translateX: shineTranslate }], height:60}]}/>
                    </TouchableOpacity>
                    </View>
            </View>
        </View>
        </GestureHandlerRootView>           
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    titleText: {
        fontSize: 24,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '700',
        textAlign: 'center',
        color: "white",
    },
    infoText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
    },
    header: {
        backgroundColor: colors.primary,
        paddingTop: 60,
        paddingBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        backgroundColor: colors.background,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        marginHorizontal: 'auto',
        position: 'relative',
        marginBottom: 10,
    },
    button: {

    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        zIndex: 1,
    },
    shine: {
        position: 'absolute',
        width: 60,
        height: '200%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        top: '-50%',
        transform: [{ rotate: '20deg' }],
    }
});