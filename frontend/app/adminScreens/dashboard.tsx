import React, { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, TextInput, SafeAreaView } from 'react-native';
import { AdminData, DriverMailData } from '@/app/types/admin';
import DriverMail from '@/app/components/driverMail';
import colors from '@/app/styles/colors';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import useHandleLogout from '@/hooks/useHandleLogout';
import ConfirmActionModal from '../components/modals/confirmActionModal';
import { fetchAdminMail, replyToMail, updateProfileInformation, updateProfilePicture } from '../endpoints/adminEndpoints';
import { useNotification } from '../context/notificationContext';
import * as ImagePicker from 'expo-image-picker';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';

export default function DashboardScreen() {
    const adminData = useSelector((state: { admin: AdminData }) => state.admin);
    const [user, setUser] = useState<AdminData>(adminData);
    const [driverMails, setDriverMails] = useState<DriverMailData[]>([
        {
            id: '1',
            title: 'Driver Request',
            content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio quibusdam molestias assumenda. Iusto voluptatum quis, consequuntur dolorum officiis tempora nisi porro quia optio facere, repellat, beatae ducimus. Quos, veniam hic.',
            name: 'John Doe',
        },
        {
            id: '2',
            title: 'Driver Request',
            content: 'Driver Jane Smith has requested a ride.',
            name: 'Jane Smith',
        },
        {
            id: '3',
            title: 'Driver Request',
            content: 'Driver Mark Johnson has requested a ride.',
            name: 'Mark Johnson',
        },
        {
            id: '4',
            title: 'Driver Request',
            content: 'Driver Emily Davis has requested a ride.',
            name: 'Emily Davis',
        },
        {
            id: '5',
            title: 'Driver Request',
            content: 'Driver Michael Brown has requested a ride.',
            name: 'Michael Brown',
        },
        {
            id: '6',
            title: 'Driver Request',
            content: 'Driver Sarah Wilson has requested a ride.',
            name: 'Sarah Wilson',
        },
        {
            id: '7',
            title: 'Driver Request',
            content: 'Driver David Lee has requested a ride.',
            name: 'David Lee',
        },
        {
            id: '8',
            title: 'Driver Request',
            content: 'Driver Jessica Taylor has requested a ride.',
            name: 'Jessica Taylor',
        },
        {
            id: '9',
            title: 'Driver Request',
            content: 'Driver Daniel Anderson has requested a ride.',
            name: 'Daniel Anderson',
        },
        {
            id: '10',
            title: 'Driver Request',
            content: 'Driver Olivia Martinez has requested a ride.',
            name: 'Olivia Martinez',
        }
    ]);
    const [filteredMails, setFilteredMails] = useState(driverMails);
    const mailReplyModalRef = useRef<Modalize>(null);
    const profileEditModalRef = useRef<Modalize>(null);
    const [profileEditStep, setProfileEditStep] = useState(0);
    const [profileEditData, setProfileEditData] = useState({name: "", email: "", phone: ""});
    const [modalData, setModalData] = useState<DriverMailData| null>(null);
    const handleLogout = useHandleLogout();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [replyMessage, setReplyMessage] = useState("");
    const { showNotification } = useNotification();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const mails = await fetchAdminMail("Driver", "pending");
                setDriverMails(mails);
                setFilteredMails(mails);
            } catch (error) {
                console.error("Error fetching mails:", error);
            }
        };
        fetchMails();
    }, []);

    useEffect(() => {
        if (modalData) {
            if (mailReplyModalRef.current) {
                mailReplyModalRef.current.open();
            }
        } else {
            mailReplyModalRef.current?.close();
        }
    }, [modalData]);

    const handleMailIgnore = async (toIgnoreData) => {
        try {
            await replyToMail(toIgnoreData?.id, "ignored", "declined");
            setModalData(null);
            onRefresh();
            showNotification("Mail ignored successfully!", "success");
        } catch (error) {
            console.error("Error ignoring mail:", error);
            showNotification("An error occurred while ignoring the mail, please try again", "error");
        } finally {
            setReplyMessage("");
            setModalData(null);
        }
    }

    const handleMailReply = async () => {
        if (replyMessage === "") {
            showNotification("Can't send an empty message", "info");
            return;
        }
        try {
            await replyToMail(modalData?.id, replyMessage, "accepted");
            showNotification("Mail sent successfully!", "success");
            setModalData(null);
            onRefresh();
            setReplyMessage("");
        } catch (error) {
            console.error("Error sending reply:", error);
            showNotification("An error occurred while sending the reply, please try again", "error");
        }
    };

    const handleFilterMails = (text: string) => {
        if(text === "") {
            setFilteredMails(driverMails);
            return;
        }
        const filtered = driverMails.filter(mail => mail.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredMails(filtered);
    }

    const handleOpenProfileModal = () => {
        if (profileEditModalRef.current) {
            profileEditModalRef.current.open();
        }
    };

    const handleUpdateProfile = async () => {
        try {
            if(profileEditData.name === "" && profileEditData.email === "" && profileEditData.phone === "") {
                showNotification("No changes made to the profile", "info");
                return;
            }

            const dataToSend = {
                name: profileEditData.name === "" ? user.name : profileEditData.name,
                phone: profileEditData.phone === "" ? user.phone : profileEditData.phone,
                email: profileEditData.email === "" ? user.email : profileEditData.email,
            }

            await updateProfileInformation(dataToSend);
            setUser({...user, ...dataToSend});
            showNotification("Profile updated successfully!", "success");
        } catch (error) {
            console.error("Error updating profile:", error);
            showNotification("An error occurred while updating the profile, please try again", "error");
        } finally {
            setProfileEditStep(0);
            setProfileEditData({name: "", email: "", phone: ""});
        }
    }

    const handleImagePicker = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                alert('Permission to access the gallery is required!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                base64: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const base64Image = result.assets[0].base64;
                await updateProfilePicture(base64Image || "");
                showNotification("profile image updated successfully!", "success");
            }
        } catch (error) {
            showNotification("an error occurred while uploading image, please try again", "error");
            console.error('Error picking image:', error);
        } finally {
            setProfileEditStep(0);
        }
    };

    const onRefresh = async () => {
        try {
            const mails = await fetchAdminMail("Driver", "pending");
            setDriverMails(mails);
            setFilteredMails(mails);
        } catch (error) {
            console.error("Error fetching mails:", error);
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <ConfirmActionModal visible={showLogoutModal} onClose={() => setShowLogoutModal(false)} onConfirm={handleLogout} title="Logout" message="Are you sure you want to logout?"/>
            <MaterialIcons onPress={() => setShowLogoutModal(true)} name="logout" size={24} color="white" style={{position: "absolute", top: 15, right: 15, zIndex: 100}}/>
            <MaterialIcons onPress={() => handleOpenProfileModal()} name="settings" size={24} color="white" style={{position: "absolute", top: 15, left: 15, zIndex: 100}}/>
            <Text style={styles.titleText}>Dashboard</Text>
            <View style={styles.infoSection}>
                <View style={styles.credentialsSection}>
                    <Text style={{fontSize:24, fontWeight: '700', marginBottom: 4, color: colors.primaryText}}>{user?.name}</Text>
                    <Text style={styles.infoText}>{user?.email}</Text>
                    <Text style={styles.infoText}>{user?.phone}</Text>
                    <Text style={styles.infoText}><Text style={{fontSize: 14, color: colors.secondaryText, fontWeight: '700',}}>handled requests</Text>: {user?.handledRequests}</Text>
                </View>
                <Image source={{ uri: user?.profilePicture }} style={{ width: 110, height: 110, borderRadius: 120, objectFit: 'cover' }} />
            </View>
            <TouchableOpacity onPress={() => console.log('Edit Profile')} style={{ marginHorizontal: 'auto', width: '94%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.offset, marginBottom: 20 }}>
                <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                    <Text style={{ fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Edit Profile</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.mailContainer}>
                    <Text style={{fontSize: 22, fontWeight: '700'}}>Driver Mail</Text>
                    <TextInput placeholder='Search' style={styles.searchBox} placeholderTextColor={colors.primary}   onChangeText={(text) => handleFilterMails(text)}/>
            {filteredMails.length == 0 ? (
                <Text style={{color: colors.primary, fontSize: 16, fontWeight: '700', textAlign: 'center', marginTop: 50}}>No Mails Found</Text>
            ) : (
                <ScrollView style={{flex: 1}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />} contentContainerStyle={{ gap: 10 }}>
                    {filteredMails.map((item) => (
                        <DriverMail key={item.id} onIgnore={handleMailIgnore} driverData={item} setMailData={setModalData} />
                    ))}
                </ScrollView>
            )}
            </View>
            <Modalize ref={mailReplyModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Reply to {modalData?.name}'s Mail</Text>
                    <Text style={styles.modalText}>{modalData?.description}</Text>
                    <TextInput placeholder='Type your reply here...' value={replyMessage} onChangeText={setReplyMessage} style={{borderWidth: 1, fontSize: 13, height: 100, borderColor: colors.secondary, borderRadius: 10, padding: 10, backgroundColor: colors.secondaryText, textAlignVertical: "top"}} multiline={true} numberOfLines={10} />
                    <View style={{display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10}}>
                        <TouchableOpacity onPress={() => setModalData(null)} style={{paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.secondary, borderRadius: 50 }}>
                            <Text style={{fontSize: 14, fontWeight: '600', color: colors.primary }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMailReply()} style={{paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.primary, borderRadius: 50 }}>
                            <Text style={{ color: colors.secondaryText, fontSize: 14, fontWeight: '600' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
            <Modalize ref={profileEditModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
                {profileEditStep == 0 ? (
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Profile Information Settings</Text>
                        <View style={{marginTop: 10}}>
                            <TouchableOpacity onPress={() => setProfileEditStep(1)} style={{paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray'}}>
                                <Text style={{fontSize: 14, fontWeight: '400' }}>Edit Profile Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setProfileEditStep(2)} style={{paddingVertical: 10, borderBottomWidth: 1, borderColor: 'gray'}}>
                                <Text style={{fontSize: 14, fontWeight: '400' }}>Edit Profile Information</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    ) : (
                    profileEditStep == 1 ? (
                        <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Change Profile Picture</Text>
                        <Text style={styles.modalText}>
                            Choose a new profile picture from your gallery or take a new one.
                        </Text>
                        <View style={{gap: 10}}>
                            <TouchableOpacity onPress={handleImagePicker} style={{ paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.primary, borderRadius: 50, marginTop: 10, }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.secondaryText }}>
                                Open Gallery
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setProfileEditStep(0)} style={{ paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.secondary, borderRadius: 50, }}>
                                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    ) : (
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Profile Information</Text>
                            <Text style={styles.modalText}>Update your profile information here.</Text>
                            <View style={{marginTop: 10, gap: 7}}>
                                <Text style={{fontSize: 14, fontWeight: '500', color: colors.primary}}>Name</Text>
                                <TextInput value={profileEditData.name} onChangeText={(text) => setProfileEditData({...profileEditData, name: text})} placeholder={user.name} style={{borderWidth: 1, fontSize: 13, height: 35, borderColor: colors.secondary, borderRadius: 20, padding: 10, backgroundColor: colors.secondaryText, marginBottom: 4}}/>
                                <Text style={{fontSize: 14, fontWeight: '500', color: colors.primary}}>Email</Text>
                                <TextInput value={profileEditData.email} onChangeText={(text) => setProfileEditData({...profileEditData, email: text})} placeholder={user.email} style={{borderWidth: 1, fontSize: 13, height: 35, borderColor: colors.secondary, borderRadius: 20, padding: 10, backgroundColor: colors.secondaryText, marginBottom: 4}}/>
                                <Text style={{fontSize: 14, fontWeight: '500', color: colors.primary}}>Phone Number</Text>
                                <TextInput value={profileEditData.phone} onChangeText={(text) => setProfileEditData({...profileEditData, phone: text})} placeholder={user.phone} style={{borderWidth: 1, fontSize: 13, height: 35, borderColor: colors.secondary, borderRadius: 20, padding: 10, backgroundColor: colors.secondaryText, marginBottom: 4}}/>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10}}>
                                <TouchableOpacity onPress={() => setProfileEditStep(0)} style={{paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.secondary, borderRadius: 50 }}>
                                    <Text style={{fontSize: 14, fontWeight: '600', color: colors.primary }}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleUpdateProfile} style={{paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.primary, borderRadius: 50 }}>
                                    <Text style={{ color: colors.secondaryText, fontSize: 14, fontWeight: '600' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                )}
            </Modalize>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 10,
        alignItems: 'stretch',
        backgroundColor: colors.primary,
        position: 'relative'
    },
    titleText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        paddingVertical: 10,
        marginBottom: 7,
        height: "18%",
    },
    credentialsSection: {
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        flexDirection: 'column',
    },
    infoText: {
        fontSize: 14,
        color: colors.secondaryText,
        fontWeight: '400',
    },
    searchBox: {
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 30,
        padding: 10,
        fontWeight: '500',
    },
    mailContainer: {
        flex: 1,
        width: '100%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        marginHorizontal: 'auto',
        padding: 10,
        paddingTop: 20,
        gap: 10,
        backgroundColor: colors.background,
        overflow: 'hidden',
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
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 13,
        marginBottom: 10,
        color: colors.primary,
    },
    sortOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});