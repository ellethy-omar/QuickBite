import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import colors from "../styles/colors";
import { useEffect, useState, useRef } from "react";
import { useNotification } from "../context/notificationContext";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";
import SmartImage from "../components/smartImage";
import { sendMessageAdmin, banDriverAccess } from "../endpoints/adminEndpoints";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function DriverDetailsScreen() {
    const { driver } = useLocalSearchParams();
    const { showNotification } = useNotification();
    const [driverData, setDriverData] = useState(JSON.parse(driver));
    const [fetching, setFetching] = useState(true);
    const [userRequestStep, setUserRequestStep] = useState(0);
    const [editProfileConfirm, setEditProfileConfirm] = useState(0);
    const [messageText, setMessageText] = useState('');
    

    const navigation = useNavigation();
    const userActionModalRef = useRef<Modalize>(null);

    if(!driver) {
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
    try {
        await banDriverAccess(driverData._id, driverData.banned);
        setDriverData({...driverData, banned: !driverData.banned});
        showNotification(`Driver ${driverData.banned ? "unbanned" : "banned"} successfully!`, "success");
    } catch {
        showNotification(`An error occurred while ${driverData.banned ? "unbanning" : "banning"} Driver, please try again`, "error");
    } finally {
        userActionModalRef.current?.close();
    }
  }

  useEffect(() => {
    if(userRequestStep !== 2)
      return;

    const handleMessageSend = async () => {
      if(messageText === "") {
        showNotification("Can't send an empty message", "info");
        return;
      }
      try {
        await sendMessageAdmin(driverData._id, messageText, "Driver");
        showNotification("message sent successfully to driver!", "success");
        setDriverData({...driverData, banned: !driverData.banned})
      } catch {
        showNotification("an error occurred while sending message, please try again", "error");
      } finally {
        setUserRequestStep(0);
        userActionModalRef.current?.close();
      }
    }

    handleMessageSend();
  }, [userRequestStep]);

  useEffect(() => {
      const fetchOrders = async () => {
          try {

          } catch {
              showNotification("an error occurred while loading orders, please try again", "error");
          } finally {
              setFetching(false);
          }
      }

      if(fetching)
        fetchOrders();
    }, [])

    const handleImageUpload = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          console.log("Selected image:", result.assets[0].uri);
        } else {
          console.log("Image selection canceled");
        }
      } catch (error) {
        console.error("Error opening image picker:", error);
      }
    };

  return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setEditProfileConfirm(0);}}>
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity style={[styles.toolButton, { zIndex: 1 }]} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={20} />
                    <Text style={{ fontSize: 18, fontWeight: '600', color: colors.primary }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[ styles.toolButton, { right: 0, backgroundColor: colors.primary, padding: 5, borderRadius: 20, zIndex: 1 }, ]} onPress={() => handleActionModal()}>
                    <MaterialIcons name="mode-edit-outline" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Driver Details</Text>
                <View style={{ display: 'flex', position: 'relative', flexDirection: 'row', justifyContent: 'center', }}>
                    <SmartImage onPress={() => setEditProfileConfirm(1)} uri={driverData.profilePicture} style={styles.image} svgStyle={styles.image} />
                    <TouchableOpacity onPress={() => handleImageUpload()} style={[styles.image,{position: 'absolute',backgroundColor: 'black',opacity: 0.5,display: editProfileConfirm === 1 ? 'flex' : 'none',justifyContent: 'center',alignItems: 'center',},]}>
                    <MaterialIcons name="edit" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                    <ScrollView style={{flex: 1}}>
                    <View style={styles.section}>
                        <View style={{gap: 5}}>
                            <Text style={styles.subtitle}>Personal Information</Text>
                            <Text style={styles.infoText}>Username:  <Text style={{color:"gray"}}>{driverData.name}</Text></Text>
                            <Text style={styles.infoText}>Phone number:  <Text style={{color:"gray"}}>{driverData.phone}</Text></Text>
                            <Text style={styles.infoText}>Email:  <Text style={{color:"gray"}}>{driverData.email}</Text></Text>
                            <Text style={styles.infoText}>Status:  <Text style={{color:"gray"}}>{driverData.banned ? "Banned" : "Active"}</Text></Text>
                        </View>
                        <View style={{gap: 5}}>
                            <Text style={styles.subtitle}>Vehicle Information</Text>
                            <Text style={styles.infoText}>Vehicle Type:  <Text style={{color:"gray"}}>{driverData.vehicle.category}</Text></Text>
                            <Text style={styles.infoText}>Vehicle Model:  <Text style={{color:"gray"}}>{driverData.vehicle.model}</Text></Text>
                            <Text style={styles.infoText}>Vehicle Plate:  <Text style={{color:"gray"}}>{driverData.vehicle.plateNumber}</Text></Text>
                        </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            <Modalize ref={userActionModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
                <View style={styles.modalContent}>
                {userRequestStep == 0 ? (
                    <>
                    <Text style={styles.modalTitle}>Driver Actions</Text>
                    <TouchableOpacity onPress={() => handleUserBan()} style={styles.sortOption}>
                        <Text>{driverData.banned === true ? "Unban Driver" : "Ban Driver"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setUserRequestStep(1)} style={styles.sortOption}>
                        <Text>Send Notification To Driver</Text>
                    </TouchableOpacity>
                    </>
                ) : (
                    <>
                    <Text style={styles.modalTitle}>Send Message To Driver</Text>
                    <TextInput multiline numberOfLines={14} value={messageText} onChangeText={setMessageText} placeholder='Type your message here...' style={{borderWidth: 1, height: 140, borderColor: colors.secondary, borderRadius: 10, paddingHorizontal: 10, textAlignVertical: "top", backgroundColor: colors.secondaryText, fontSize: 13}} />
                    <View style={{flexDirection: "row", marginTop: 20, justifyContent: "center", gap: 10}}>
                        <TouchableOpacity onPress={() => setUserRequestStep(2)} style={{backgroundColor: colors.primary, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 50}}>
                            <Text style={{color: "white", fontWeight: "500", fontSize: 12}}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setUserRequestStep(0)} style={{backgroundColor: colors.secondary, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 50}}>
                            <Text style={{fontWeight: "500", fontSize: 12}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                )}
                </View>
                </Modalize>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>
    );
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
    },
    section: {
      backgroundColor: colors.background,
      borderRadius: 10,
      marginTop: 20,
      padding: 10,
      paddingBottom: 15,
      marginVertical: 10,
      gap: 20,
      width: '100%',
      marginHorizontal: 'auto',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      borderColor: colors.primary,
      borderWidth: 0.6
    },
    addressContainer: {
        backgroundColor: colors.background,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingBottom: 13,
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
      height: 140,
      width: 140,
      borderRadius: 200,
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