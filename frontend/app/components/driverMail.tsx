import React, {useRef, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import { DriverMailData } from '../types/admin';

export default function DriverMail({driverData, setMailData}: {driverData: DriverMailData, setMailData: React.Dispatch<React.SetStateAction<DriverMailData | null>>}) {

    return (
        <View style={styles.background}>
            <Text style={styles.titleText}>{driverData.title}</Text>
            <Text style={styles.infoText}>{driverData.content}</Text>
            <Text style={styles.infoText}>{driverData.name}</Text>
            <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginTop: 10}}>
            <TouchableOpacity style={{paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.secondary, borderRadius: 50}} onPress={() => console.log('Accept Request')}>
                <Text style={{fontSize: 14, fontWeight: '600'}}>Ignore</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMailData(driverData)} style={{paddingHorizontal: 15, paddingVertical: 6, backgroundColor: colors.primary, borderRadius: 50}}>
                <Text style={{color: "#fff", fontSize: 14, fontWeight: '600'}}>Reply</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        borderRadius: 8,
        backgroundColor: colors.offset,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    },
    titleText: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 13,
        marginBottom: 5,
    },
})

