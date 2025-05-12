import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';
import { useNavigation } from 'expo-router';

export default function AdminOrderContainer({order}: {order: OrderDriver}) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('_adminutils/orderDetails', { order: JSON.stringify(order) });
    };

    console.log("order", order);
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.mainSection}>
            <Image source={{uri: order.driverId.profilePicture}} style={styles.image} resizeMode="cover" />
            <View style={{flex: 1, gap: 3}}>
                <Text style={styles.mainText}>{order.driverId.name}</Text>
                <Text style={{fontSize: 13, fontWeight: '500', color: colors.primary}}>Delivering to: <Text style={styles.infoText}>{order.userId.name}</Text></Text>
                <Text style={{fontSize: 13, fontWeight: '500', color: colors.primary}}>Restaurant : <Text style={styles.infoText}>{order.restaurantId.name}</Text></Text>
                <Text style={{fontSize: 13, fontWeight: '500', color: colors.primary}}>Placed: <Text style={styles.infoText}>{Math.floor((Date.now() - new Date(order.createdOn).getTime()) / (1000 * 60))} minutes ago</Text></Text>
            </View>
        </View>
        <View style={{marginTop: 10, gap:5}}>
            <Text style={{fontSize: 12, fontWeight: '500', color: colors.primary}}>Delivery Address: <Text style={styles.infoText}>{order.deliveryAddress.area}, {order.deliveryAddress.street}, {order.deliveryAddress.building}</Text></Text>
            <Text style={{fontSize: 12, fontWeight: '500', color: colors.primary}}>Restaurant Address: <Text style={styles.infoText}>{order.restaurantId.address.area}, {order.restaurantId.address.street}, {order.restaurantId.address.city}</Text></Text>
            <Text style={{fontSize: 12, fontWeight: '500', color: colors.primary}}>Total Amount: <Text style={styles.infoText}>{order.totalAmount} EGP</Text></Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: colors.background,
        padding: 10,
        paddingBottom: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0,height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    mainSection: {
        flexDirection: 'row',
        gap: 10,
    },
    image: {
        width: 95,
        height: 95,
        borderRadius: 100,
    },
    mainText: {
        fontSize: 19,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 4,
    },
    infoText: {
        fontWeight: '500',
        color: 'gray',
    }
})