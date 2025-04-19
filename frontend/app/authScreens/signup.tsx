import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import background from '../../assets/images/sectionBackground.png';
import { RootStackParamList } from '../types/rootStack';
import { UserFormData, RestaurantFormData } from '../types/authTypes';
import UserSignup from './sections/userSignup';
import RestaurantSignup from './sections/restaurantSignup';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SignupScreen() {
    const [userFormData, setUserFormData] = useState<UserFormData>({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [restaurantFormData, setRestaurantFormData] = useState<RestaurantFormData>({ name: '', email: '', phone: '', password: '', confirmPassword: '', cuisines: [], address: '', description: '', image: '' });
    const [currentSection, setCurrentSection] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const scrollY = useRef(new Animated.Value(0)).current; // Animated value for vertical scrolling

    useEffect(() => {
        if (!submitting) return;
        navigation.navigate('mainScreens');
    }, [submitting]);

    const handleScrollDown = () => {
      Animated.spring(scrollY, { 
        toValue: -1 * Dimensions.get('window').height, 
        useNativeDriver: true, 
        friction: 8, 
        tension: 40 
      }).start();
    };

    const handleScrollUp = () => {
      Animated.spring(scrollY, { 
        toValue: 0, 
        useNativeDriver: true, 
        friction: 8, 
        tension: 40 
      }).start(() => setCurrentSection((prev) => prev - 1));
    };

    return (
        <View style={styles.container}>
            <Image source={background} style={{ width: '100%', height: '100%', resizeMode: 'stretch', position: 'absolute' }} />
            <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateY: scrollY }] }}>
                <View style={{ ...styles.section, gap: 20}}>
                    <Text style={styles.welcomeText}>Select your account type</Text>
                    <TouchableOpacity onPress={() => {handleScrollDown(); setCurrentSection(0);}} style={{ backgroundColor:'#293956',width: '60%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 }}>
                        <Text style={{ color:'white', fontWeight: 'bold', textAlign: "center" }}>User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleScrollDown(); setCurrentSection(1);}} style={{ backgroundColor:'#293956',width: '60%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 }}>
                        <Text style={{ color:'white', fontWeight: 'bold', textAlign: "center" }}>Restaurant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleScrollDown(); setCurrentSection(2);}} style={{ backgroundColor:'#293956',width: '60%', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: "center" }}>Driver</Text>
                    </TouchableOpacity>
                </View>

                {/* Section 2 */}
                <View style={styles.section}>
                    <TouchableOpacity style={{ position: 'absolute', top: 50, right: 0, left: 0, justifyContent: 'center', alignItems: 'center' }} onPress={handleScrollUp}>
                      <IconSymbol name="chevron.compact.up" size={22} color='#F1FAEE' />
                      <Text style={{ color: '#F1FAEE', fontSize: 14 }}>Back To Top</Text>
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Register</Text>
                    {currentSection == 0 ? (
                        <UserSignup userFormData={userFormData} setUserFormData={setUserFormData} />
                    ) : (
                        <RestaurantSignup restaurantFormData={restaurantFormData} setRestaurantFormData={setRestaurantFormData} />
                    )}
                    <View style={{ width: '100%', marginTop: 20 }}>
                        <TouchableOpacity onPressIn={() => setSubmitting(true)} style={{ marginHorizontal: 'auto', marginTop: 20, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#293956' }}>
                            <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                                {!submitting ? (
                                    <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Signup</Text>
                                ) : (
                                    <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>signing up...</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 10 }}>
                            already have an account?{' '}
                            <Text style={{ color: '#fff', fontWeight: '700', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('authScreens/login')}>Login</Text>
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', backgroundColor: '#fff', position: 'relative', alignItems: 'center', justifyContent: 'center' },
    section: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    welcomeText: { fontSize: 48, marginTop: 20, color: '#F1FAEE', fontWeight: 'bold', textAlign: 'center' },
    scrollButtons: { position: 'absolute', bottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
    scrollButton: { backgroundColor: '#293956', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 },
    scrollButtonText: { color: '#fff', fontWeight: 'bold' },
});