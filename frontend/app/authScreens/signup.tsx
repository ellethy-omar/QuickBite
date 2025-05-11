import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/rootStack';
import { UserFormData, RestaurantFormData, DriverFormData } from '../types/authTypes';
import UserSignup from './sections/userSignup';
import RestaurantSignup from './sections/restaurantSignup';
import DriverSignup from './sections/driverSignup';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { UserSignupRoute, RestaurantSignupRoute, DriverSignupRoute } from '../endpoints/authEndpoints';
import colors from '../styles/colors';
import { useNotification } from '../context/notificationContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignupScreen() {
    const [userFormData, setUserFormData] = useState<UserFormData>({ name: '', email: '', phone: '', password: '', confirmPassword: '', address: {label: "", apartment: "", street: '', area: '', building: '', floor: '', isDefault: false} });
    const [restaurantFormData, setRestaurantFormData] = useState<RestaurantFormData>({ name: '', email: '', phone: '', password: '', confirmPassword: '', cuisines: [], address: {city: "", street: "", area: ""}, description: '', image: '', openingHours: { Monday: { open: '', close: '' }, Tuesday: { open: '', close: '' }, Wednesday: { open: '', close: '' }, Thursday: { open: '', close: '' }, Friday: { open: '', close: '' }, Saturday: { open: '', close: '' }, Sunday: { open: '', close: '' } } });
    const [driverFormData, setDriverFormData] = useState<DriverFormData>({ name: '', email: '', phone: '', password: '', confirmPassword: '', vehicleType: '', vehicleModel: '', vehiclePlateNumber: '' });
    const [currentSection, setCurrentSection] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const { showNotification } = useNotification();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const scrollY = useRef(new Animated.Value(0)).current;

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

    useEffect(() => {
      if(!submitting) return;

      const handleLogin = async () => {
        try {
          if(currentSection === 0) {
            if(userFormData.password !== userFormData.confirmPassword) {
              showNotification('Passwords do not match!', 'error');
              return;
            } else if(userFormData.name === '' || userFormData.email === '' || userFormData.phone === '' || userFormData.password === '' || userFormData.confirmPassword === '') {
              showNotification('Passwords do not match!', 'error');
              return;
            }
            await UserSignupRoute(userFormData);
            showNotification('user signup successful!', 'success');
          } else if(currentSection === 1) {
            if(restaurantFormData.password !== restaurantFormData.confirmPassword) {
              showNotification('Passwords do not match!', 'error');
              return;
            } else if(restaurantFormData.name === '' || restaurantFormData.email === '' || restaurantFormData.phone === '' || restaurantFormData.password === '' || restaurantFormData.confirmPassword === '') {
              showNotification('Please fill all fields!', 'error');
              return;
            }
            await RestaurantSignupRoute(restaurantFormData);
            showNotification('Restaurant signup successful!', 'success');
          } else if(currentSection === 2) {
            if(driverFormData.password !== driverFormData.confirmPassword) {
              showNotification('Passwords do not match!', 'error');
              return;
            } else if(driverFormData.name === '' || driverFormData.email === '' || driverFormData.phone === '' || driverFormData.password === '' || driverFormData.confirmPassword === '') {
              showNotification('Please fill all fields!', 'error');
              return;
            }
            await DriverSignupRoute(driverFormData);
            showNotification('Driver signup successful!', 'success');
          }
          setTimeout(() => {
            navigation.navigate('authScreens/login');
          }, 1000);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            showNotification('invalid password, password must be at least 8 characters long, contain upper and lowercase laterals, at least one number and a special character.', 'error');
          } else {
            showNotification('Server error! Please try again later.', 'error');
          }
        } finally {
          setSubmitting(false);
        }
      };
      handleLogin();
    }, [submitting]);


    return (
        <View style={styles.container}>
            <Animated.View style={{ width: '100%', height: '100%', transform: [{ translateY: scrollY }] }}>
                <View style={{ ...styles.section, gap: 20}}>
                    <Text style={styles.welcomeText}>Select your account type</Text>
                    <TouchableOpacity onPressIn={() => {handleScrollDown(); setCurrentSection(0);}} style={{ marginHorizontal: 'auto', marginTop: 10, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                      <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                        <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
                        <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>user</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => {handleScrollDown(); setCurrentSection(1);}} style={{ marginHorizontal: 'auto', width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                      <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                        <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
                        <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Restaurant</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={() => {handleScrollDown(); setCurrentSection(2);}} style={{ marginHorizontal: 'auto', width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                      <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                        <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
                        <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Driver</Text>
                      </View>
                    </TouchableOpacity>
                </View>

                {/* Section 2 */}
                <View style={styles.section}>
                    <TouchableOpacity style={{ position: 'absolute', top: 50, right: 0, left: 0, justifyContent: 'center', alignItems: 'center' }} onPress={handleScrollUp}>
                      <MaterialIcons name="arrow-drop-up" size={28} color={colors.primary} />
                      <Text style={{ color: colors.primary, fontSize: 12, fontWeight: 600 }}>Back To Top</Text>
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Register</Text>
                    {currentSection == 0 ? (
                        <UserSignup userFormData={userFormData} setUserFormData={setUserFormData} />
                    ) : currentSection == 1 ? (
                        <RestaurantSignup restaurantFormData={restaurantFormData} setRestaurantFormData={setRestaurantFormData} />
                    ) : (
                        <DriverSignup driverFormData={driverFormData} setDriverFormData={setDriverFormData} />
                    )}
                    <View style={{ width: '100%', marginTop: 20 }}>
                        <TouchableOpacity onPressIn={() => setSubmitting(true)} style={{ marginHorizontal: 'auto', marginTop: 20, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                            <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                              <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
                                {!submitting ? (
                                    <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Signup</Text>
                                ) : (
                                    <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>signing up...</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        <Text style={{ color: colors.primary, textAlign: 'center', marginTop: 10 }}>
                            already have an account?{' '}
                            <Text style={{ color: colors.primary, fontWeight: '700', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('authScreens/login')}>Login</Text>
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { height: '100%', width: '100%', backgroundColor: colors.secondary, position: 'relative', alignItems: 'center', justifyContent: 'center' },
    section: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
    welcomeText: { fontSize: 48, marginTop: 20, color: colors.primary, fontWeight: 'bold', textAlign: 'center' },
    scrollButtons: { position: 'absolute', bottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
    scrollButton: { backgroundColor: '#293956', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 50 },
    scrollButtonText: { color: '#fff', fontWeight: 'bold' },
});