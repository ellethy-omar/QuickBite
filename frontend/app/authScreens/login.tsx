import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Svg, { Defs, Rect } from 'react-native-svg';
import { LinearGradient, Stop } from 'react-native-svg';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/rootStack';
import { useDispatch } from 'react-redux';
import { setRole } from '../slices/userSlice';
import colors from '../styles/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!submitting) return;
    dispatch(setRole('admin'));
    navigation.navigate('index');
  }, [submitting]);

  return (
    <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subText}>Login to continue</Text>
            <View style={styles.inputContainer}>
              <IconSymbol name="person.fill" size={16} color={colors.primary} style={{ marginTop: 6 }} />
              <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            </View>
            <View style={styles.inputContainer}>
              <IconSymbol name="lock.fill" size={16} color={colors.primary} style={{ marginTop: 6 }} />
              <TextInput style={styles.input} placeholderTextColor="gray" placeholder="Password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
            </View>
            <View style={{ width: '78%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                  <View style={{ width: 15, height: 15, borderRadius: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }} />
                {rememberMe && <IconSymbol name="checkmark" size={14} color={colors.primary} style={{ position: 'absolute' }} />}
              </TouchableOpacity>
              <Text style={{ color: colors.primary, marginLeft: 10 }}>Remember me</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('authScreens/forgotPassword')}>
                <Text style={{ color: colors.primary, fontWeight: '500', textDecorationLine: 'underline' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 30, width: '100%'}}>
                <TouchableOpacity onPressIn={() => setSubmitting(true)} style={{ marginHorizontal: 'auto', marginTop: 20, width: '60%', borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} onPress={() => {}}>
                <View style={{ width: '100%', height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', overflow: 'hidden' }}>
                <Svg height="40" width="100%"><Defs><LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><Stop offset="0%" stopColor="#293956" stopOpacity="1" /><Stop offset="100%" stopColor="#40539E" stopOpacity="1" /></LinearGradient></Defs><Rect x="0" y="0" width="100%" height="40" fill="url(#grad)" /></Svg>
                {!submitting ? (
                <Text style={{ color: "white", fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Login</Text>) : (<Text style={{ color: '#fff', fontWeight: 'bold', position: 'absolute', paddingVertical: 15 }}>Logging in...</Text>
                )}
                </View>
                </TouchableOpacity>
              <Text style={{ color: colors.primary, textAlign: 'center', marginTop: 10 }}>Don't have an account?{' '}<Text style={{ color: colors.primary, fontWeight: '700', textDecorationLine: 'underline' }} onPress={() => navigation.navigate('authScreens/signup')}>Sign Up</Text></Text>
            </View>
        </View>
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
    borderColor: colors.primary,
    backgroundColor: '#e1e1e1',
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
  input: {
    width: '90%',
  },
});
