import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DriverFormData } from '@/app/types/authTypes';
import colors from '@/app/styles/colors';
import { Modal } from 'react-native';

export default function DriverSignup ({driverFormData, setDriverFormData}: {driverFormData: DriverFormData, setDriverFormData: React.Dispatch<React.SetStateAction<DriverFormData>>}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} keyboardVerticalOffset={20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <Text style={styles.subText}>Become part of our riders' crew</Text>
            {currentStep === 0 && (
            <>
            <Text style={styles.stepTitle}>Step 1: Enter your credentials</Text>
            <View style={styles.inputContainer}>
                <IconSymbol name="person.fill" size={16} color={colors.primary} />
                <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Full Name" value={driverFormData.name} onChangeText={(text) => setDriverFormData({...driverFormData, name: text})} />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="lock.fill" size={16} color={colors.primary} />
                <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Password" secureTextEntry={!showPassword} value={driverFormData.password} onChangeText={(text) => setDriverFormData({...driverFormData, password: text})} />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <IconSymbol name={!showPassword ? "eye.fill" : "eye.slash.fill"} size={18} color={colors.primary}/>
                </TouchableOpacity>            
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="lock.fill" size={16} color={colors.primary} />
                <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Confirm Password" secureTextEntry={!showConfirmPassword} value={driverFormData.confirmPassword} onChangeText={(text) =>setDriverFormData({...driverFormData, confirmPassword: text})} />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <IconSymbol name={!showConfirmPassword ? "eye.fill" : "eye.slash.fill"} size={18} color={colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="mail.fill" size={16} color={colors.primary} />
                <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Email" value={driverFormData.email} onChangeText={(text) => setDriverFormData({...driverFormData, email: text})} />
            </View>
            <View style={styles.inputContainer}>
                <IconSymbol name="phone.fill" size={16} color={colors.primary} />
                <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Phone Number" value={driverFormData.phone} onChangeText={(text) => setDriverFormData({...driverFormData, phone: text})} />
            </View>
            </>
            )}
            {currentStep === 1 && (
                <>
                <Text style={styles.stepTitle}>Step 2: Enter your Vehicle data</Text>
                <View style={styles.inputContainer}>
                    <IconSymbol name="car.fill" size={16} color={colors.primary} />
                    <TouchableOpacity style={{ width: '90%' }} onPress={() => setShowDropdown(true)}>
                        <Text style={{ color: driverFormData.vehicleType ? 'black' : 'gray' }}>
                            {driverFormData.vehicleType || 'Select Vehicle Type'}
                        </Text>
                    </TouchableOpacity>
                </View>
                    {showDropdown && (
                    <Modal transparent visible={showDropdown} animationType="fade" onRequestClose={() => setShowDropdown(false)}>
                        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
                            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, paddingVertical: 10, elevation: 5 }}>
                                    {['Bike', 'Motorcycle', 'Car'].map((option, i) => (
                                    <TouchableOpacity key={option} style={{ paddingVertical: 12, paddingHorizontal: 20, borderBottomWidth: i !== 2 ? 0.5 : 0, borderBottomColor: '#ccc' }} onPress={() => { setDriverFormData({ ...driverFormData, vehicleType: option }); setShowDropdown(false); }}>
                                    <Text style={{ fontSize: 16, color: '#333' }}>{option}</Text>
                                    </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )}
                <View style={styles.inputContainer}>
                    <IconSymbol name="car.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
                    <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Vehicle Model" value={driverFormData.vehicleModel} onChangeText={(text) => setDriverFormData({...driverFormData, vehicleModel: text})} />
                </View>
                <View style={styles.inputContainer}>
                    <IconSymbol name="car.fill" size={16} color={colors.primary} style={{ marginTop: 5 }} />
                    <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Vehicle Plate Number (if bike leave empty)" value={driverFormData.vehiclePlateNumber} onChangeText={(text) => setDriverFormData({...driverFormData, vehiclePlateNumber: text})} />
                </View>
                </>)}
                <View style={{marginTop: 30, display: 'flex', flexDirection: "row", justifyContent: 'center', gap: 20, alignItems: 'center' }}>
                    <TouchableOpacity style={{display: 'flex', gap: 4, flexDirection: "row", alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 100}} onPress={() => setCurrentStep(0)}>
                        <IconSymbol name="chevron.left" size={15} color='white'/>
                        <Text style={{color: 'white', fontSize: 14}}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{display: 'flex', flexDirection: "row", gap: 4, alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 100}} onPress={() => setCurrentStep(1)}>
                        <Text style={{color: 'white', fontSize: 14}}>Next</Text>
                        <IconSymbol name="chevron.right" size={15} color='white'/>
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
        alignItems: 'center',
        gap: 10,
        borderWidth: 0.5,
        borderColor: colors.primary,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 5,
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