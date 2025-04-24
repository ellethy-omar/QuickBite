import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import colors from "../styles/colors";
import { useEffect, useState, useRef } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useNotification } from "../context/notificationContext";
import { useNavigation } from "expo-router";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function UserDetailsScreen() {
    const {user} = useLocalSearchParams();
    const { showNotification } = useNotification();

    const [userData, setUserData] = useState(JSON.parse(user));
    const [pastOrders, setPastOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [fetching, setFetching] = useState(true);

    const navigation = useNavigation();
    const userActionModalRef = useRef<Modalize>(null);

    if(!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No restaurant data available.</Text>
            </View>
        )
    }

  const handleActionModal = () => {
    userActionModalRef.current?.open();
  }

  const handleUserBan = async () => {
    console.log("User banned/unbanned");
  }

  const handleSendNotification = async () => {
    console.log("Notification sent to user");
  }

  useEffect(() => {
      const fetchOrders = async () => {
          try {
            setActiveOrders([]);
            setPastOrders([]);                
          } catch {
              showNotification("an error occurred while loading orders, please try again", "error");
          } finally {
              setFetching(false);
          }
      }

      if(fetching)
        fetchOrders();
    }, [])

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
            <TouchableOpacity style={[styles.toolButton, { zIndex: 1 }]} onPress={() => navigation.goBack()}>
              <IconSymbol name="arrow.left" size={20} color={colors.primary} />
              <Text style={{fontSize: 18, fontWeight: '600', color: colors.primary}}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toolButton, { right: 0, backgroundColor: colors.primary, padding: 5, borderRadius: 20, zIndex: 1 }]} onPress={() => handleActionModal()}>
              <IconSymbol name="gear.badge" size={20} color='white' />
            </TouchableOpacity>

            <Text style={styles.title}>User Details</Text>
            <Image source={{ uri: userData.profileImage }} style={styles.image} />
            <View style={styles.section}>
                <Text style={styles.subtitle}>Personal Information</Text>
                <Text style={styles.infoText}>Username:  <Text style={{color:"gray"}}>{userData.name}</Text></Text>
                <Text style={styles.infoText}>Phone number:  <Text style={{color:"gray"}}>{userData.phone}</Text></Text>
                <Text style={styles.infoText}>Email:  <Text style={{color:"gray"}}>{userData.email}</Text></Text>
                <Text style={styles.infoText}>Status:  <Text style={{color:"gray"}}>{userData.banned ? "Banned" : "Active"}</Text></Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.subtitle}>User Addresses</Text>
                {userData.address.map((address, index) => (
                    <View key={index} style={styles.addressContainer}>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <IconSymbol name="tag.fill" size={18} color={colors.primary} />
                            <Text style={{fontSize: 18, color: colors.primary, fontWeight: '600'}}>{address.label}</Text>
                        </View>
                        <Text style={styles.infoText}>Area: <Text style={{color:"gray"}}>{address.area}</Text></Text>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'center'}}>
                            <Text style={styles.infoText}>Street: <Text style={{color:"gray"}}>{address.street}</Text></Text>
                            <Text style={styles.infoText}>Apartment: <Text style={{color:"gray"}}>{address.apartment}</Text></Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', gap: 37, alignItems: 'center'}}>
                            <Text style={styles.infoText}>Building: <Text style={{color:"gray"}}>{address.building}</Text></Text>
                            <Text style={styles.infoText}>Floor: <Text style={{color:"gray"}}>{address.floor}</Text></Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.subtitle}>Orders & Activity</Text>
                {fetching ? (
                    <Text style={styles.infoText}>Loading...</Text>
                ) : (
                    <>
                    <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                      <View>
                        <Text style={{fontSize: 19, marginBottom: 5, fontWeight: '600', color: colors.primary}}>Active Orders:</Text>
                        {activeOrders.length > 0 ? (
                          activeOrders.map((order, index) => (
                            <View key={index} style={styles.addressContainer}>
                              <Text style={styles.infoText}>Order ID: <Text style={{color:"gray"}}>{order.id}</Text></Text>
                              <Text style={styles.infoText}>Status: <Text style={{color:"gray"}}>{order.status}</Text></Text>
                              <Text style={styles.infoText}>Total: <Text style={{color:"gray"}}>{order.total}</Text></Text>
                            </View>
                          ))
                        ) : (
                          <Text style={styles.infoText}>No active orders</Text>
                        )}
                      </View>
                      <View>
                        <Text style={{fontSize: 19, marginBottom: 5, fontWeight: '600', color: colors.primary}}>Past Orders:</Text>
                        {pastOrders.length > 0 ? (
                          pastOrders.map((order, index) => (
                            <View key={index} style={styles.addressContainer}>
                              <Text style={styles.infoText}>Order ID: <Text style={{color:"gray"}}>{order.id}</Text></Text>
                              <Text style={styles.infoText}>Status: <Text style={{color:"gray"}}>{order.status}</Text></Text>
                              <Text style={styles.infoText}>Total: <Text style={{color:"gray"}}>{order.total}</Text></Text>
                            </View>
                          ))
                        ) : (
                          <Text style={styles.infoText}>No past orders</Text>
                        )}
                      </View>
                    </View>
                    </>
                )}
            </View>
            </ScrollView>

            <Modalize ref={userActionModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>User Actions</Text>
                <TouchableOpacity onPress={() => handleUserBan()} style={styles.sortOption}>
                  <Text>{userData.banned === true ? "Unban User" : "Ban User"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSendNotification()} style={styles.sortOption}>
                  <Text>Send Notification To User</Text>
                </TouchableOpacity>
              </View>
            </Modalize>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingBottom: 20,
      marginTop: 50,
      position: 'relative',
      paddingHorizontal: 10,
      backgroundColor: colors.background,
    },
    section: {
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 10,
      paddingBottom: 15,
      marginVertical: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      marginHorizontal: 'auto',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
    },
    addressContainer: {
        backgroundColor: colors.background,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 13,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        marginHorizontal: 'auto',
    },
    toolKit: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: colors.primary,
      marginTop: 5,
      paddingVertical: 10,
      alignItems: 'flex-end',
    },
    menuList: {
      paddingBottom: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    toolButton: {
      position: 'absolute',
      top: 3,
      flexDirection: 'row',
      backgroundColor: colors.background,
      alignItems: 'center',
      gap: 5,
    },
    actionButton: {
      padding: 10,
      paddingHorizontal: 15,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 120,
      width: 120,
      marginBottom: 10,
      marginHorizontal: 'auto',
      borderRadius: 200,
      objectFit: 'cover',
    },
    title: {
      fontSize: 25,
      marginBottom: 10,
      fontWeight: '700',
      color: colors.primary,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 21,
      fontWeight: '600',
      marginBottom: 8,
      color: colors.primary,
    },
    infoText: {
      fontSize: 14,
      fontWeight: '500',
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
    },
    modalStyle: {
      backgroundColor: '#f8f9fa',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalContent: {
      flex: 1,
      padding: 20,
      paddingBottom: 50,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 10,
    },
    sortOption: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
});