import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import colors from '../styles/colors';
import { OrderDriver } from '../types/orderDriver';

export default function OrderContainer({order}: {order: OrderDriver}) {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.mainSection}>
            <Image source={{uri: order.restaurantLogo}} style={styles.image} resizeMode="cover" />
            <View style={{flex: 1, gap: 3}}>
                <Text style={styles.mainText}>{order.restaurantName}</Text>
                <Text style={{fontWeight: '500', color: colors.primary}}>Deliver to: <Text style={styles.infoText}>{order.userName}</Text></Text>
                <Text style={{fontWeight: '500', color: colors.primary}}>Placed: <Text style={styles.infoText}>{Math.floor((Date.now() - new Date(order.createdOn).getTime()) / (1000 * 60))} minutes ago</Text></Text>
            </View>
        </View>
        <View style={{marginTop: 10, gap:5}}>
            <Text style={{fontWeight: '500', color: colors.primary}}>Delivery Address: <Text style={styles.infoText}>{order.deliveryAddress.area}, {order.deliveryAddress.street}, {order.deliveryAddress.building}</Text></Text>
            <Text style={{fontWeight: '500', color: colors.primary}}>Restaurant Address: <Text style={styles.infoText}>{order.restaurantAddress.area}, {order.restaurantAddress.street}, {order.restaurantAddress.city}</Text></Text>
            <Text style={{fontWeight: '500', color: colors.primary}}>Total Amount: <Text style={styles.infoText}>{order.totalAmount} EGP</Text></Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: colors.background,
        padding: 10,
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
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    mainText: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
    }
})