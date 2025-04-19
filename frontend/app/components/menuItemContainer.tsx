import { MenuItem } from "@/app/types/restaurant";
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from "react-native";
import colors from "@/app/styles/colors";
import React, { useRef, useEffect } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function MenuItemContainer({ itemData, setEditing, shouldShake }: { 
    itemData: MenuItem, 
    setEditing: React.Dispatch<React.SetStateAction<MenuItem | null>>, 
    shouldShake: boolean 
}) {
    const slideAnimation = useRef(new Animated.Value(0)).current; // Animation for sliding

    useEffect(() => {
        if (shouldShake) {
            slideToRevealButton();
        } else {
            slideBack();
        }
    }, [shouldShake]);

    const slideToRevealButton = () => {
        Animated.timing(slideAnimation, {
            toValue: -80, // Slide 80px to the left to reveal the button
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideBack = () => {
        Animated.timing(slideAnimation, {
            toValue: 0, // Slide back to the original position
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedContainer, { transform: [{ translateX: slideAnimation }] }]}>
                <View style={styles.background}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingVertical: 6 }}>
                        <Text style={styles.titleText}>{itemData.name}</Text>
                        <Text style={styles.infoText}>{itemData.description}</Text>
                        <Text style={styles.infoText}>Price: ${itemData.price}</Text>
                    </View>
                    <Image source={{ uri: itemData.image }} style={{ width: 120, height: 100, borderRadius: 8 }} />
                </View>
            </Animated.View>

            <Animated.View
                style={[
                    styles.revealButton,
                    { transform: [{ translateX: slideAnimation.interpolate({
                        inputRange: [-80, 0],
                        outputRange: [0, 80],
                    }) }] },
                ]}
            >
                <TouchableOpacity style={{height: '100%', display: 'flex',justifyContent: "center", alignContent: 'center'}} onPress={() => setEditing(itemData)}>
                    <IconSymbol name="trash.fill" color='white' style={{marginBottom: 4, marginHorizontal: "auto"}}/>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.secondary,
        paddingBottom: 10,
    },
    animatedContainer: {
        width: '100%',
        backgroundColor: colors.background,
    },
    background: {
        width: '100%',
        backgroundColor: colors.background,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    titleText: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 12,
        color: colors.primary,
    },
    infoText: {
        fontSize: 13,
        color: 'gray',
        marginBottom: 3,
        fontWeight: '500',
    },
    revealButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 80,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
});