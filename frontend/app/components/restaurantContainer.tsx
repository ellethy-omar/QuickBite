import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import colors from '../styles/colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RestaurantData } from '../types/restaurant';
import { fetchRestaurantProducts } from '../endpoints/adminEndpoints';

export default function RestaurantContainer({ restaurantData }: {restaurantData: RestaurantData }) {
  const navigation = useNavigation();

  const handlePress = async () => {
    const menuData = await fetchRestaurantProducts();
    console.log(restaurantData)
    navigation.navigate('_adminutils/restaurantDetails', { restaurant: JSON.stringify(restaurantData) });
    };

  return (
    <TouchableOpacity style={styles.background} onPress={handlePress}>
      <Image source={{ uri: restaurantData.image }} style={{ width: 100, height: 100, borderRadius: 8, objectFit: 'contain' }} />
      <View style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10, flex: 1, gap: 5, paddingTop: 4 }}>
      <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{restaurantData.name}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignContent: 'center', alignItems: 'center' }}>
        <IconSymbol name="star.fill" size={16} color={colors.primary} />
        <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
        {`Rating: ${restaurantData.rating}`}
        </Text>
      </View>
      <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">Orders Done: {restaurantData.ordersDone}</Text>
      <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
        Address: {restaurantData.address.area}, {restaurantData.address.city}, {restaurantData.address.street}
      </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: colors.primary,
  },
});