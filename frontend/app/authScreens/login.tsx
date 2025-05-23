import { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Svg, { Defs, Rect } from 'react-native-svg';
import { LinearGradient, Stop } from 'react-native-svg';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/rootStack';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setUserDetails } from '../slices/userSlice';
import { setDriverDetails } from '../slices/driverSlice';
import { setAdminDetails } from '../slices/adminSlice';
import colors from '../styles/colors';
import { LoginUserRoute, LoginRestaurantRoute, LoginDriverRoute, LoginAdminRoute } from '../endpoints/authEndpoints';
import { useNotification } from '@/app/context/notificationContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accType, setAccType] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!submitting) return;

    const handleLogin = async () => {
      try {
        if (email === '' || password === '') {
          alert('Please fill all fields!');
          return;
        }

        if (accType === 0) {
          const response = await LoginUserRoute(email, password);
          if (response?.data?.token) {
            await SecureStore.setItemAsync('jwtToken', response.data.token);
            if(rememberMe) {
              await SecureStore.setItemAsync('savedEmail', email);
              await SecureStore.setItemAsync('savedPassword', password);
              await SecureStore.setItemAsync('savedAccType', accType.toString());
            }
          }
          showNotification('Login successful!', 'success');
          dispatch(setUserDetails(response?.data.user));
          setTimeout(() => {
            navigation.navigate('mainScreens');
            }, 1000);

          } else if (accType === 1) {
          const response = await LoginRestaurantRoute(email, password);
          if (response?.data?.token) {
            await SecureStore.setItemAsync('jwtToken', response.data.token);
            if(rememberMe) {
              await SecureStore.setItemAsync('savedEmail', email);
              await SecureStore.setItemAsync('savedPassword', password);
              await SecureStore.setItemAsync('savedAccType', accType.toString());
            }
          }
          showNotification('Login successful!', 'success');
          setTimeout(() => {
            navigation.navigate('restaurantScreens');
            }, 1000);

        } else if (accType == 2){
          const response = await LoginDriverRoute(email, password);
          dispatch(setDriverDetails(response.data.driver));
          if (response?.data?.token) {
            await SecureStore.setItemAsync('jwtToken', response.data.token);
            if(rememberMe) {
              await SecureStore.setItemAsync('savedEmail', email);
              await SecureStore.setItemAsync('savedPassword', password);
              await SecureStore.setItemAsync('savedAccType', accType.toString());
            }
          }
          showNotification('Login successful!', 'success');
          setTimeout(() => {
            navigation.navigate('driverScreens' as never);
            }, 1000);

       } else {
          const response = await LoginAdminRoute(email,password);
          dispatch(setAdminDetails(response.data.admin));
          if (response?.data?.token) {
            await SecureStore.setItemAsync('jwtToken', response.data.token);
            if(rememberMe) {
              await SecureStore.setItemAsync('savedEmail', email);
              await SecureStore.setItemAsync('savedPassword', password);
              await SecureStore.setItemAsync('savedAccType', accType.toString());
            }
          }
          showNotification('Login successful!', 'success');
          setTimeout(() => {
            navigation.navigate('adminScreens');
            }, 1000);
      }

      } catch (error) {
        if (error instanceof Error && 'response' in error && (error as any).response?.status === 404) {
          showNotification('Invalid credentials, please check your data and try again', 'error');
        } else {
          showNotification('An error occurred, please try again later', 'error');
        }
      } finally {
        setSubmitting(false);
      }
    };

    handleLogin();
  }, [submitting]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subText}>Login to continue</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={16} color={colors.primary}  />
            <TextInput style={styles.input} placeholderTextColor="gray" placeholder={accType == 0 || accType == 3 ? "Email or Username" : "Email or Phone Number"} value={email} onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={16} color={colors.primary}  />
            <TextInput style={{width: '80%'}} placeholderTextColor="gray" placeholder="Password" secureTextEntry={!showPassword} value={password} onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons name={!showPassword ? "lock-open" : "lock"} size={18} color={colors.primary}/>
            </TouchableOpacity>
          </View>
          <View style={{ width: '78%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <View style={{ width: 15, height: 15, borderRadius: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }} />
              {rememberMe && <MaterialIcons name="check" size={14} color={colors.primary} style={{ position: 'absolute' }} />}
            </TouchableOpacity>
            <Text style={{ color: colors.primary, marginLeft: 10 }}>Remember me</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('authScreens/forgotPassword')}>
              <Text style={{ color: colors.primary, fontWeight: '500', textDecorationLine: 'underline' }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 30, width: '100%'}}>
              <TouchableOpacity disabled={submitting} onPressIn={() => setSubmitting(true)} style={{ marginHorizontal: 'auto', marginTop: 20, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }} onPress={() => {}}>
              <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
              {!submitting && <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>}
              {!submitting ? (
              <Text style={{ color: "white", fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Login</Text>) : (<Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Logging in...</Text>
              )}
              </View>
              </TouchableOpacity>
            <Text style={{ color: colors.primary, textAlign: 'center', marginTop: 10 }}>Don't have an account?{' '}<Text style={{ color: colors.primary, fontWeight: '700', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('authScreens/signup')}>Sign Up</Text></Text>
          </View>

          <Text style={{ color: colors.primary, fontSize: 14, marginTop: 30, fontWeight: '500', textAlign: 'center' }}>Select your account type</Text>
          <View style={{ width: '100%', gap: 10, justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <TouchableOpacity onPress={() => setAccType(0)} style={{ width: 80, padding: 10, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor:  accType == 0 ? colors.primary : 'white'}}>
              <Text style={{ color: accType == 0 ? "white" : colors.primary, fontWeight: 'bold', position: 'absolute', paddingVertical: 15, fontSize: 11 }}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAccType(1)} style={{ width: 80, padding: 10, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: accType == 1 ? colors.primary : 'white'}}>
              <Text style={{ color: accType == 1 ? "white" : colors.primary, fontWeight: 'bold', position: 'absolute', paddingVertical: 15, fontSize: 11 }}>Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAccType(2)} style={{ width: 80, padding: 10, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: accType == 2 ? colors.primary : 'white'}}>
              <Text style={{ color: accType == 2 ? "white" : colors.primary, fontWeight: 'bold', position: 'absolute', paddingVertical: 15, fontSize: 11 }}>Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAccType(3)} style={{ width: 80, padding: 10, height: 45, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: accType == 3 ? colors.primary : 'white'}}>
              <Text style={{ color: accType == 3 ? "white" : colors.primary, fontWeight: 'bold', position: 'absolute', paddingVertical: 15, fontSize: 11 }}>Admin</Text>
            </TouchableOpacity>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 48,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: colors.primary,
    marginVertical: 12,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 0,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    width: '90%',
  },
});
