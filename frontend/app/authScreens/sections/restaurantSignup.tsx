import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RestaurantFormData } from '@/app/types/authTypes';
import colors from '../../styles/colors';
import cuisineList from '@/constants/cuisineList';


export default function RestaurantSignup ({restaurantFormData, setRestaurantFormData}: {restaurantFormData: RestaurantFormData, setRestaurantFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>}) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.subText}>Register your business</Text>
            {currentStep === 0 && (
            <View>
                <Text style={{fontWeight: 600, color: "white", fontSize: 17, marginTop: 10}}>Step 1: Enter your restaurant's credentials</Text>
                <View style={styles.inputContainer}>
                    <IconSymbol name="person.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                    <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Restaurant Name" value={restaurantFormData.name} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, name: text})} />
                </View>
                <View style={styles.inputContainer}>
                    <IconSymbol name="person.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                    <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Business Email" value={restaurantFormData.email} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, email: text})} />
                </View>
                <View style={styles.inputContainer}>
                    <IconSymbol name="lock.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                    <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Password" secureTextEntry value={restaurantFormData.password} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, password: text})} />
                </View>
                <View style={styles.inputContainer}>
                    <IconSymbol name="lock.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                    <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Confirm Password" secureTextEntry value={restaurantFormData.confirmPassword} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, confirmPassword: text})} />
                </View>
            </View>
            )}
            {currentStep === 1 && (
            <View>
                <Text style={{fontWeight: 600, color: "white", fontSize: 17, marginTop: 10}}>Step 2: Enter your restaurant's data</Text>
                <View style={styles.inputContainer}>
                    <IconSymbol name="phone.fill" size={22} color="#576CD6" style={{ marginTop: 2 }} />
                    <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Phone Number" value={restaurantFormData.phone} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, phone: text})} />
                </View>
                <View style={styles.inputContainer}>
                    <IconSymbol name="location.fill" size={22} color="#576CD6" style={{ marginTop: 4 }} />
                    <TextInput style={styles.input} placeholderTextColor="#222222" placeholder="Address" value={restaurantFormData.address} onChangeText={(text) => setRestaurantFormData({...restaurantFormData, address: text})} />
                </View>
                <View style={[styles.inputContainer, { height: 100, alignItems: 'flex-start' }]}>
                    <IconSymbol name="info.circle.fill" size={22} color="#576CD6" style={{ marginTop: 3 }} />
                    <TextInput
                        style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                        placeholderTextColor="#222222"
                        placeholder="Description"
                        value={restaurantFormData.description}
                        onChangeText={(text) => setRestaurantFormData({ ...restaurantFormData, description: text })}
                        multiline={true}
                    />
                </View>
                <Text style={{fontWeight: 500, color: "white", fontSize: 13, marginTop: 20}}>Select Cuisine Types</Text>
                <View style={{ width: '80%', marginTop: 10 }}>
                    <FlatList
                        data={cuisineList}
                        keyExtractor={(item) => item}
                        renderItem={({ item: cuisine }) => (
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: restaurantFormData.cuisines?.includes(cuisine) ? '#576CD6' : '#F1FAEE', padding: 8, borderRadius: 10, flexGrow: 0, flexShrink: 0, marginHorizontal: 5, minWidth: 92 }}
                                onPress={() => { const cuisines = restaurantFormData.cuisines || []; setRestaurantFormData({ ...restaurantFormData, cuisines: cuisines.includes(cuisine) ? cuisines.filter((item) => item !== cuisine) : [...cuisines, cuisine] }); }}>
                                <IconSymbol name={restaurantFormData.cuisines?.includes(cuisine) ? 'checkmark.circle.fill' : 'circle'} size={18} color={restaurantFormData.cuisines?.includes(cuisine) ? 'white' : '#576CD6'} style={{ marginRight: 6 }} />
                                <Text style={{ color: restaurantFormData.cuisines?.includes(cuisine) ? 'white' : '#222222' }}>{cuisine}</Text>
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{flexDirection: 'row',alignItems: 'center'}}/>
                </View>
            </View>
            )}
            {currentStep === 2 && null}
            <View style={{ width: '100%', marginTop: 30, display: 'flex', flexDirection: "row", justifyContent: 'center', gap: 20, alignItems: 'center' }}>
                <TouchableOpacity style={{display: 'flex', gap: 4, flexDirection: "row", alignItems: 'center', backgroundColor: '#293956', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 100}} onPress={() => setCurrentStep(currentStep - 1)}>
                    <IconSymbol name="chevron.left" size={15} color='white'/>
                    <Text style={{color: 'white', fontSize: 14}} onPress={() => setCurrentStep(currentStep - 1)}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{display: 'flex', flexDirection: "row", gap: 4, alignItems: 'center', backgroundColor: '#293956', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 100}} onPress={() => setCurrentStep(currentStep + 1)}>
                    <Text style={{color: 'white', fontSize: 14}} onPress={() => setCurrentStep(currentStep + 1)}>Next</Text>
                    <IconSymbol name="chevron.right" size={15} color='white'/>
                </TouchableOpacity>
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