import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { UserFormData } from '@/app/types/authTypes';

export default function UserSignup ({userFormData, setUserFormData}: {userFormData: UserFormData, setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>}) {
    return (
        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.subText}>Create your account</Text>
            <View style={styles.inputContainer}>
                <IconSymbol name="person.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Name" value={userFormData.name} onChangeText={(text) => setUserFormData({...userFormData, name: text})} />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="person.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Email" value={userFormData.email} onChangeText={(text) => setUserFormData({...userFormData, email: text})} />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="lock.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Password" secureTextEntry value={userFormData.password} onChangeText={(text) => setUserFormData({...userFormData, password: text})} />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="lock.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Confirm Password" secureTextEntry value={userFormData.confirmPassword} onChangeText={(text) =>setUserFormData({...userFormData, confirmPassword: text})} />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="phone.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Phone Number" value={userFormData.phone} onChangeText={(text) => setUserFormData({...userFormData, phone: text})} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        height: 40,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#F1FAEE',
        borderRadius: 10,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    subText: {
        fontSize: 14,
        color: '#F1FAEE',
        marginVertical: 12,
        textAlign: 'center',
    },
    input: {
        width: '90%',
    },
});