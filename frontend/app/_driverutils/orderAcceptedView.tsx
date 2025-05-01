import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Animated, TouchableOpacity, Vibration } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
const TickMark = require("@/assets/images/tick.png");
import colors from '../styles/colors';

export default function OrderAcceptedView() {
    const navigation = useNavigation();
    const { order } = useLocalSearchParams();
    const [orderData] = useState(JSON.parse(order));
    const tiltAnim = useRef(new Animated.Value(0)).current; // Animation value for tilting

    useEffect(() => {
        setTimeout(() => {
            Vibration.vibrate(500); // Vibrate for 500ms
    
            // Start the tilt animation
            Animated.sequence([
                Animated.timing(tiltAnim, {
                    toValue: 1, // Tilt to 45 degrees
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(tiltAnim, {
                    toValue: 0, // Return to original position
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 300);
    }, []);

    // Interpolate the tilt animation value to rotate the image
    const tiltInterpolation = tiltAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'], // Rotate from 0 to 45 degrees
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ gap: 20, alignItems: 'center' }}>
                    <Animated.Image
                        style={[{ width: 160, height: 160 }, { transform: [{ rotate: tiltInterpolation }] }]}
                        source={TickMark}
                    />
                    <Text style={styles.mainText}>The order has been accepted</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View Order</Text>
                </TouchableOpacity>
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: colors.secondary,
    },
    mainText: {
        fontSize: 24,
        fontWeight: '800',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    button: {
        position: 'absolute',
        bottom: 80,
        borderRadius: 100,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: colors.primary,
    },
});