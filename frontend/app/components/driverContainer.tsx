import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from "../styles/colors";
import { useNavigation } from 'expo-router';
import SmartImage from "./smartImage";
import { DriverData } from "../types/driver";

export default function DriverContainer({driverData}: {driverData : DriverData}) {
    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('_adminutils/driverDetails', { driver: JSON.stringify(driverData) });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <SmartImage uri={driverData.profilePicture} style={styles.image} svgStyle={{height: 130, width:130}}/>
            <View style={styles.infoSection}>
                <Text style={styles.titleText}>{driverData.name}</Text>
                <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Email: <Text style={styles.infoText}>{driverData.email}</Text></Text>
                <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Phone: <Text style={styles.infoText}>{driverData.phone}</Text></Text>
                <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary, width: "94%"}}>Vehicle: <Text style={styles.infoText}>{driverData.vehicle.category}, {driverData.vehicle.model}, {driverData.vehicle.plateNumber}</Text></Text>
                <Text style={{fontSize: 12, fontWeight: "500" ,color: colors.primary}}>Rating: <Text style={styles.infoText}>{driverData.rating}</Text></Text>
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