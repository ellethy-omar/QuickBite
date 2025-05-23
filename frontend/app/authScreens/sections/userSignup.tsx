import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { UserFormData } from '@/app/types/authTypes';
import colors from '@/app/styles/colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserSignup ({userFormData, setUserFormData}: {userFormData: UserFormData, setUserFormData: React.Dispatch<React.SetStateAction<UserFormData>>}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} keyboardVerticalOffset={20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <Text style={styles.subText}>Create your account</Text>
            {currentStep === 0 && (
            <>
            <Text style={styles.stepTitle}>Step 1: Enter your credentials</Text>
            <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={16} color={colors.primary}/>
                <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Full Name" value={userFormData.name} onChangeText={(text) => setUserFormData({...userFormData, name: text})} />
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={16} color={colors.primary}  />
                <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Password" secureTextEntry={!showPassword} value={userFormData.password} onChangeText={(text) => setUserFormData({...userFormData, password: text})} />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={!showPassword ? "lock-open" : "lock"} size={18} color={colors.primary}/>
                </TouchableOpacity>            
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={16} color={colors.primary}  />
                <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Confirm Password" secureTextEntry={!showConfirmPassword} value={userFormData.confirmPassword} onChangeText={(text) =>setUserFormData({...userFormData, confirmPassword: text})} />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialIcons name={!showConfirmPassword ? "lock-open" : "lock"} size={18} color={colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons name="mail" size={16} color={colors.primary}  />
                <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Email" value={userFormData.email} onChangeText={(text) => setUserFormData({...userFormData, email: text})} />
            </View>
            </>
            )}
            {currentStep === 1 && (
                <>
                <Text style={styles.stepTitle}>Step 2: Enter your Contact details</Text>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="phone" size={16} color={colors.primary}  />
                    <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Phone Number" value={userFormData.phone} onChangeText={(text) => setUserFormData({...userFormData, phone: text})} />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="location-pin" size={16} color={colors.primary}  />
                    <TextInput style={{width: '90%'}} placeholderTextColor="gray" placeholder="Governorate/state" value={userFormData.address.area} onChangeText={(text) => setUserFormData({...userFormData, address: {...userFormData.address, area: text}})} />
                </View>
                <View style={{width: '80%', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={styles.inputContainerMinor}>
                        <MaterialIcons name="streetview" size={16} color={colors.primary} />
                        <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Street" value={userFormData.address.street} onChangeText={(text) => setUserFormData({...userFormData, address: {...userFormData.address, street: text}})} />
                    </View>
                    <View style={styles.inputContainerMinor}>
                        <MaterialIcons name="house" size={16} color={colors.primary} />
                        <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Building" value={userFormData.address.building} onChangeText={(text) => setUserFormData({...userFormData, address: {...userFormData.address, building: text}})} />
                    </View>
                </View>
                <View style={{width: '80%', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={styles.inputContainerMinor}>
                        <MaterialIcons name="fax" size={16} color={colors.primary} />
                        <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Floor" value={userFormData.address.floor} onChangeText={(text) => setUserFormData({...userFormData, address: {...userFormData.address, floor: text}})} />
                    </View>
                    <View style={styles.inputContainerMinor}>
                        <MaterialIcons name="numbers" size={16} color={colors.primary} />
                        <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Apartment No." value={userFormData.address.apartment} onChangeText={(text) => setUserFormData({...userFormData, address: {...userFormData.address, apartment: text}})} />
                    </View>
                </View>
                </>)}
                <View style={{marginTop: 30, display: 'flex', flexDirection: "row", justifyContent: 'center', gap: 20, alignItems: 'center' }}>
                    <TouchableOpacity style={{display: 'flex', gap: 4, flexDirection: "row", alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 100}} onPress={() => setCurrentStep(0)}>
                        <MaterialIcons name="chevron-left" size={15} color='white'/>
                        <Text style={{color: 'white', fontSize: 14}}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{display: 'flex', flexDirection: "row", gap: 4, alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 100}} onPress={() => setCurrentStep(1)}>
                        <Text style={{color: 'white', fontSize: 14}}>Next</Text>
                        <MaterialIcons name="chevron-right" size={15} color='white'/>
                    </TouchableOpacity>
                </View>
            </>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        borderWidth: 0.5,
        borderColor: colors.primary,
        backgroundColor: '#fff',
        borderRadius: 50,
        alignItems: 'center',
        width: '80%',
        paddingHorizontal: 10,        
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    inputContainerMinor: {
        height: 40,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: colors.primary,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: '48%',
        paddingHorizontal: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    stepTitle: {
        fontWeight: '600',
        color: colors.primary,
        fontSize: 15,
        marginTop: 10,
        width: '80%',
    },
    subText: {
        fontSize: 14,
        color: colors.primary,
        marginVertical: 12,
        textAlign: 'center',
    },
    input: {
        width: '90%',
    },
});