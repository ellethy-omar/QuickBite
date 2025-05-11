import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { DriverData } from '../types/driver';
import colors from '../styles/colors';
import { fetchDriverProfile, fetchDriverHistory } from '../endpoints/driverEndpoints';
import { OrderDriver } from "../types/orderDriver"
import { Modalize } from 'react-native-modalize';
import { MaterialIcons } from '@expo/vector-icons';
import ConfirmActionModal from '../components/modals/confirmActionModal';
import useHandleLogout from '@/hooks/useHandleLogout';

export default function ProfileView() {
    const [driverData, setDriverData] = useState<DriverData>(useSelector((state: any) => state.driver));
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [orderLog, setOrderLog] = useState<OrderDriver[]>([])
    const requestModalRef = useRef<Modalize>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const handleLogout = useHandleLogout();

    const openRequestModal = () => {
        requestModalRef.current?.open();
    };

    const fetchOrderLog = async () => {
        try {
            const response = await fetchDriverHistory();
            setOrderLog(response ? response : []);
        } catch (error) {
            console.error("Error fetching driver order history:", error);
        } finally {
            setFetching(false);
            setRefreshing(false);
        }
    }

    const fetchProfile = async () => {
        try {
        const response = await fetchDriverProfile();
        setDriverData(response);
        } catch (error) {
        console.error("Error fetching driver profile:", error);
        } finally {
            setFetching(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        if(!fetching) return;

        fetchOrderLog();
        fetchProfile()
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        fetchOrderLog();

    };

    return (
            <SafeAreaView style={styles.background}>
                <ConfirmActionModal visible={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} title="Logout" message="Are you sure you want to logout?"/>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10, width: "100%", position: "relative"}}>
                    <Image source={{uri: driverData.image || "https://fastly.picsum.photos/id/137/200/300.jpg?hmac=5vAnK2h9wYgvt2769Z9D1XYb8ory9_zB0bqDgVjgAnk"}} style={{width: 110, height: 110, borderRadius: 100}} resizeMode="cover" />
                    <View style={{paddingRight: 20, gap: 5}}>
                        <Text style={{fontSize: 28, fontWeight: '700', color: "white", marginBottom: 3}}>{driverData.name}</Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: "white"}}>Phone Number: <Text style={{fontWeight: '400'}}>{driverData.phone}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: "white"}}>Email Address: <Text style={{fontWeight: '400'}}>{driverData.email}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: "white"}}>Vehicle: <Text style={{fontWeight: '400'}}>{driverData.vehicle.type == "bike" ? "bike" : `${driverData.vehicle.model}, ${driverData.vehicle.plateNumber}`}</Text></Text>
                    </View>
                    <MaterialIcons onPress={() => setShowLogoutModal(true)} name="logout" size={24} color="white" style={{position: "absolute", top: 20, right: 15}}/>
                </View>
            <View style={styles.ordersListContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView} bounces={true} overScrollMode="never" showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}>
                {fetching ? (
                    <Text style={styles.noResultsText}>Loading...</Text>
                ) : (
                    <View style={{gap: 25}}>
                    <TouchableOpacity onPress={openRequestModal} style={styles.utilButton}>
                        <Text style={{color: "white", fontWeight: "500", fontSize: 12}}>Submit a Request</Text>
                    </TouchableOpacity>
                    <View style={{gap: 5}}>
                        <Text style={{fontSize: 24, marginBottom: 2, fontWeight: '700', color: colors.primary}}>Driver Statistics</Text>
                        <Text style={{fontSize: 13, fontWeight: '500'}}>Total Orders Delivered: <Text style={{color: colors.primary}}>{driverData.deliveryStats.completed}</Text></Text>
                        <Text style={{fontSize: 13, fontWeight: '500'}}>Average Delivery Time: <Text style={{color: colors.primary}}>{Math.round(driverData.deliveryStats.avgDeliveryTime)}</Text> minutes</Text>
                        <Text style={{fontSize: 13, fontWeight: '500'}}>Rating: <Text style={{color: colors.primary}}>{driverData.rating}</Text></Text>
                    </View>
                    <View style={{gap: 5}}>
                        <Text style={{fontSize: 24, marginBottom: 2, fontWeight: '700', color: colors.primary}}>Order History</Text>
                        {orderLog.length == 0 ? (
                            <Text style={{fontSize: 13, fontWeight: '500'}}>No orders delivered yet</Text>
                        ) : (
                            <View style={{gap: 15}}>
                            {orderLog.map((order, index) => (
                                <View key={index} style={{gap: 5, borderWidth: 0.8, borderColor: colors.primary, padding: 10, borderRadius: 15}}>
                                    <Text style={{fontSize: 13, fontWeight: '500'}}>Restaurant Name: <Text style={{color: colors.primary}}>{order.restaurantId.name}</Text></Text>
                                    <Text style={{fontSize: 13, fontWeight: '500'}}>Customer Name: <Text style={{color: colors.primary}}>{order.userId.name}</Text></Text>
                                    <Text style={{fontSize: 13, fontWeight: '500'}}>Delivery Address: <Text style={{color: colors.primary}}>{order.deliveryAddress.area}, {order.deliveryAddress.street}, {order.deliveryAddress.building}, {order.deliveryAddress.apartment}, {order.deliveryAddress.floor}</Text></Text>
                                    <Text style={{fontSize: 13, fontWeight: '500'}}>Total Amount: <Text style={{color: colors.primary}}>{order.totalAmount} EGP</Text></Text>
                                </View>
                            ))}
                            </View>
                        )}
                    </View>
                    </View>
                )}
                </ScrollView>
            </View>
            <Modalize ref={requestModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Submit Request</Text>
                    <Text style={{fontSize: 14, fontWeight: '500', color: colors.primary}}>Subject</Text>
                    <TextInput placeholder='Type your subject here...' style={{borderWidth: 1, borderColor: colors.secondary, borderRadius: 50, paddingHorizontal: 10, backgroundColor: colors.secondaryText, fontSize: 13}} />
                    <Text style={{marginTop: 15, fontSize: 14, fontWeight: '500', color: colors.primary}}>Please provide details about your request</Text>
                    <TextInput multiline numberOfLines={14} placeholder='Type your message here...' style={{borderWidth: 1, height: 140, borderColor: colors.secondary, borderRadius: 10, paddingHorizontal: 10, textAlignVertical: "top", backgroundColor: colors.secondaryText, fontSize: 13}} />
                </View>
                <View style={{flexDirection: "row", justifyContent: "center", gap: 10, paddingBottom: 20}}>
                    <TouchableOpacity onPress={() => requestModalRef.current?.close()} style={{backgroundColor: colors.primary, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 50}}>
                        <Text style={{color: "white", fontWeight: "500", fontSize: 12}}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => requestModalRef.current?.close()} style={{backgroundColor: colors.secondary, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 50}}>
                        <Text style={{fontWeight: "500", fontSize: 12}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modalize>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 10,
    },
    ordersListContainer: {
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 10,
        overflow: 'hidden',
        flex: 1,
    },
    modalStyle: {
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContent: {
        flex: 1,
        padding: 20,
        gap: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
        position: 'relative'
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    noResultsText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 50,
    },
    utilButton: {
        position: "absolute",
        top: 2,
        right: 0,
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingHorizontal: 12,
        padding: 5,
        zIndex: 20,
    }
})