import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image } from 'react-native';
import { AdminData } from '@/app/types/admin';
import DriverMail from '@/app/components/driverMail';
import colors from '@/app/styles/colors';

export default function DashboardScreen() {
    const [user, setUser] = useState<AdminData|null>({
        id: '1',
        name: 'John Doe',
        email: 'mkdfsio',
        image: 'https://example.com/image.jpg',
        phone: '1234567890',
    });
    const [driverMails, setDriverMails] = useState([
        {
            id: '1',
            title: 'Driver Request',
            content: 'Driver John Doe has requested a ride.',
            name: 'John Doe',
        },
        {
            id: '2',
            title: 'Driver Request',
            content: 'Driver Jane Smith has requested a ride.',
            name: 'Jane Smith',
        },
    ]);

    return (
        <View style={styles.background}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Dashboard</Text>
            </View>
            <View style={styles.infoSection}>
                <View style={styles.credentialsSection}>
                    <Text style={{fontSize:16, fontWeight: '700'}}>{user?.name}</Text>
                    <Text style={styles.infoText}>Email: {user?.email}</Text>
                    <Text style={styles.infoText}>Phone: {user?.phone}</Text>
                </View>
                <Image source={{ uri: user?.image }} style={{ width: 120, height: 80, borderRadius: 120, backgroundColor: 'black' }} />
            </View>
            <Text style={styles.titleText}>Driver Mail</Text>
            {driverMails.map((mail) => (
                <DriverMail key={mail.id} driverData={mail} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: colors.background,
    },
    header: {
        height: 94,
        backgroundColor: colors.primary,
        display: 'flex',
        paddingBottom: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '800',
        marginBottom: 5,
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        height: 120,
        padding: 10,
    },
    credentialsSection: {
        display: 'flex',
        gap: 6,
        flexDirection: 'column',
        height: '100%',
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});