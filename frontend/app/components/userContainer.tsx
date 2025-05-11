import { userData } from "../types/user";
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import colors from "../styles/colors";
import { useNavigation } from 'expo-router';
import SmartImage from "./smartImage";
export default function UserContainer({userData}: {userData : userData}) {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('_adminutils/userDetails', { user: JSON.stringify(userData) });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <SmartImage uri={userData.profilePicture} style={styles.image} svgStyle={{height: 130, width:130}}/>
            <View style={styles.infoSection}>
                <Text style={styles.titleText}>{userData.name}</Text>
                <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Email: <Text style={styles.infoText}>{userData.email}</Text></Text>
                <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Phone: <Text style={styles.infoText}>{userData.phone}</Text></Text>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', rowGap: 4, columnGap: 15, width: '80%' }}>
                    <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Area: <Text style={styles.infoText}>{userData.addresses[0].area}</Text></Text>
                    <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Street: <Text style={styles.infoText}>{userData.addresses[0].street}</Text></Text>
                    <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Building: <Text style={styles.infoText}>{userData.addresses[0].building}</Text></Text>
                    <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Floor: <Text style={styles.infoText}>{userData.addresses[0].floor}</Text></Text>
                    <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Apartment: <Text style={styles.infoText}>{userData.addresses[0].apartment}</Text></Text>
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
        fontSize: 12,
        color: 'gray',
    },
})