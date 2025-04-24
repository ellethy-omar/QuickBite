import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { RootStackParamList } from './types/rootStack';
import { NavigationProp } from '@react-navigation/native';
import colors from './styles/colors';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
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