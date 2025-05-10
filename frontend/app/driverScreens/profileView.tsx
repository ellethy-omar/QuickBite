import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { DriverData } from '../types/driver';
import colors from '../styles/colors';
import { fetchDriverProfile } from '../endpoints/driverEndpoints';
import { OrderDriver } from "../types/orderDriver"

export default function ProfileView() {
    const [driverData, setDriverData] = useState<DriverData>(useSelector((state: any) => state.driver));
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [orderLog, setOrderLog] = useState<OrderDriver[]>([])

    useEffect(() => {
        if(!fetching) return;
        const fetchProfile = async () => {
            try {
            const response = await fetchDriverProfile();
            console.log(response);
            setDriverData(response);
            } catch (error) {
            console.error("Error fetching driver profile:", error);
            } finally {
                setFetching(false);
                setRefreshing(false);
            }
        }
        fetchProfile()
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
    };

    return (
            <SafeAreaView style={styles.background}>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10, width: "100%", alignItems: "center"}}>
                    <Image source={{uri: driverData.image || "https://fastly.picsum.photos/id/137/200/300.jpg?hmac=5vAnK2h9wYgvt2769Z9D1XYb8ory9_zB0bqDgVjgAnk"}} style={{width: 100, height: 100, borderRadius: 100}} resizeMode="cover" />
                    <View style={{paddingRight: 20, gap: 5}}>
                        <Text style={{fontSize: 30, fontWeight: '700', color: "white", marginBottom: 5}}>{driverData.name}</Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: "white"}}>Phone Number: <Text style={{fontWeight: '500'}}>{driverData.phone}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: "white"}}>Email Address: <Text style={{fontWeight: '500'}}>{driverData.email}</Text></Text>
                    </View>
                </View>

            <View style={styles.ordersListContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView} bounces={true} overScrollMode="never" showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}>
                {fetching ? (
                    <Text style={styles.noResultsText}>Loading...</Text>
                ) : (
                    <View style={{padding: 10, paddingBottom: 0, gap: 5, height: 100, borderWidth: 1, borderColor: colors.primary, borderRadius: 10, backgroundColor: colors.offset}}>
                        <Text style={{fontSize: 24, marginBottom: 5, fontWeight: '700', color: colors.primary}}>Driver Statistics</Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: colors.primary}}>Total Orders Delivered: <Text style={{fontWeight: '500'}}>{driverData.deliveryStats.completed}</Text></Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: colors.primary}}>Average Delivery Time: <Text style={{fontWeight: '500'}}>{driverData.deliveryStats.avgDeliveryTime}</Text></Text>
                    </View>
                )}
                </ScrollView>
            </View>
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
    scrollView: {
        flex: 1,
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
})