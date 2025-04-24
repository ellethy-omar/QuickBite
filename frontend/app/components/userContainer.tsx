import { userData } from "../types/user";
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import colors from "../styles/colors";
import { useNavigation } from 'expo-router';

export default function UserContainer({userData}: {userData : userData}) {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('_adminutils/userDetails', { user: JSON.stringify(userData) });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <Image source={{ uri: userData.profileImage }} style={{ width: 100, height: 100, borderRadius: 200, objectFit: 'cover' }} />
            <View style={styles.infoSection}>
                <Text style={styles.titleText}>{userData.name}</Text>
                <Text style={styles.infoText}>Phone number: {userData.phone}</Text>
                <Text style={styles.infoText}>Email: {userData.email}</Text>
                <Text style={[styles.infoText]}>Area: {userData.address[0].area}</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                    <Text style={[styles.infoText]}>Street: {userData.address[0].street}</Text>
                    <Text style={[styles.infoText]}>Building: {userData.address[0].building}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                    <Text style={[styles.infoText]}>Floor: {userData.address[0].floor}</Text>
                    <Text style={[styles.infoText]}>Apartment: {userData.address[0].apartment}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        display: "flex",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 8,
        backgroundColor: colors.background,
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    titleText: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 5,
    },
    image: {
        borderRadius: 200,
        height: 100,
        width: 100,
    },
    infoSection: {
        display: "flex",
        gap: 4
    },
    infoText: {
        fontSize: 13,
        color: colors.primary,
    },
})