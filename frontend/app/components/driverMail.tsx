import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function DriverMail({driverData}) {
    return (
        <View style={styles.background}>
            <Text style={styles.titleText}>{driverData.title}</Text>
            <Text style={styles.infoText}>{driverData.content}</Text>
            <Text style={styles.infoText}>Driver Name: {driverData.name}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
            <TouchableOpacity onPress={() => console.log('Accept Request')}>
                <Text style={{color: '#373CD6', fontSize: 16, fontWeight: '700'}}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Reject Request')}>
                <Text style={{color: '#373CD6', fontSize: 16, fontWeight: '700'}}>Ignore</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#373CD6',
    },
    titleText: {
        fontSize: 24,
        color: '#373CD6',
        fontWeight: '800',
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        color: '#373CD6',
        marginBottom: 5,
    },
})

