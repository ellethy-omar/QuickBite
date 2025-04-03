import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { AdminData } from '@/app/types/admin';
import DriverMail from '@/app/components/driverMail';
import colors from '@/app/styles/colors';

export default function DashboardScreen() {
    const [user, setUser] = useState<AdminData|null>({
        id: '1',
        name: 'John Doe',
        email: 'annasalaa597@gmail.com',
        image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
        phone: '1234567890',
        handledRequests: 43
    });
    const [driverMails, setDriverMails] = useState([
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

    const handleFilterMails = (text: string) => {
        if(text === "") {
            setFilteredMails(driverMails);
            return;
        }
        const filtered = driverMails.filter(mail => mail.title.toLowerCase().includes(text.toLowerCase()));
        setFilteredMails(filtered);
    }

    return (
        <View style={styles.background}>
            <Text style={styles.titleText}>Dashboard</Text>
            <View style={styles.infoSection}>
                <View style={styles.credentialsSection}>
                    <Text style={{fontSize:24, fontWeight: '700', marginBottom: 4, color: colors.primaryText}}>{user?.name}</Text>
                    <Text style={styles.infoText}>{user?.email}</Text>
                    <Text style={styles.infoText}>{user?.phone}</Text>
                    <Text style={styles.infoText}><Text style={{fontSize: 14, color: colors.secondaryText, fontWeight: '700',}}>handled requests</Text>: {user?.handledRequests}</Text>
                </View>
                <Image source={{ uri: user?.image }} style={{ width: 110, height: 110, borderRadius: 120, objectFit: 'cover' }} />
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
            ):(
            <FlatList
                data={filteredMails}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DriverMail driverData={item} />}
                contentContainerStyle={{ gap: 10 }} // Add spacing between items
            />)}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 50,
        alignItems: 'stretch',
        backgroundColor: colors.primary,
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
        borderRadius: 10,
        padding: 10,
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
});