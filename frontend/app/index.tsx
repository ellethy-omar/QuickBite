import React, {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { RootStackParamList } from './types/rootStack';
import { NavigationProp } from '@react-navigation/native';
import colors from './styles/colors';
import * as SecureStore from 'expo-secure-store';
import { LoginAdminRoute, LoginDriverRoute, LoginRestaurantRoute, LoginUserRoute } from './endpoints/authEndpoints';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './slices/userSlice';
import { setDriverDetails } from './slices/driverSlice';
import { setAdminDetails } from './slices/adminSlice';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const autoSignIn = async () => {
      const savedEmail = await SecureStore.getItemAsync('savedEmail');
      const savedPassword = await SecureStore.getItemAsync('savedPassword');
      const savedAccType = await SecureStore.getItemAsync('savedAccType');

      try {
      if (savedEmail && savedPassword && savedAccType) {
        switch(Number(savedAccType)) {
          case 0:
            const response = await LoginUserRoute(savedEmail, savedPassword);
            if (response?.data?.token) {
              await SecureStore.setItemAsync('jwtToken', response.data.token);
              dispatch(setUserDetails(response?.data.user));
              navigation.navigate('mainScreens');
            }
            break;
          case 1:
            const driverResponse = await LoginRestaurantRoute(savedEmail, savedPassword);
            if (driverResponse?.data?.token) {
              await SecureStore.setItemAsync('jwtToken', driverResponse.data.token);
              navigation.navigate('restaurantScreens');
            }
            break;
          case 2:
            const restaurantResponse = await LoginDriverRoute(savedEmail, savedPassword);
            if (restaurantResponse?.data?.token) {
              await SecureStore.setItemAsync('jwtToken', restaurantResponse.data.token);
              dispatch(setDriverDetails(restaurantResponse?.data.driver));
              navigation.navigate('driverScreens');
            }
            break;
          default:
            const adminResponse = await LoginAdminRoute(savedEmail, savedPassword);
            if (adminResponse?.data?.token) {
              await SecureStore.setItemAsync('jwtToken', adminResponse.data.token);
              dispatch(setAdminDetails(adminResponse?.data.admin));
              navigation.navigate('adminScreens');
            }
            break;
          }
        }
      } catch (error) {
        console.error("Error during auto sign-in:", error);
      } finally {
        setIsLoading(false);
      }
    }
    autoSignIn();
  }, []);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/Loading_2.gif')} style={{ width: 100, height: 100 }} contentFit="contain"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>QuickBite</Text>
        <Text style={styles.subtitle}>Your one-stop shop for all your food delivery needs</Text>

        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPressIn={() => navigation.navigate('authScreens/login')} style={{ marginHorizontal: 'auto', marginTop: 20, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} onPress={() => {}}>
            <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
            <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
            <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Login</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPressIn={() => navigation.navigate('authScreens/signup')} style={{ marginHorizontal: 'auto', marginTop: 20, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} onPress={() => {}}>
            <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
            <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
            <Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Signup</Text>
            </View>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  title: {
    fontSize: 64,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary, 
    marginBottom: 16,
  },
  subtitle: {
    width: '60%',
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  }
});