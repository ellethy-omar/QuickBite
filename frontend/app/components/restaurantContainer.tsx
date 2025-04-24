import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router'; // Import useNavigation
import colors from '../styles/colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { RestaurantData } from '../types/restaurant';

export default function RestaurantContainer({ restaurantData }: {restaurantData: RestaurantData }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('_adminutils/restaurantDetails', { restaurant: JSON.stringify(restaurantData) });
    };

  return (
    <TouchableOpacity style={styles.background} onPress={handlePress}>
      <Image source={{ uri: restaurantData.image }} style={{ width: 120, height: 100, borderRadius: 8 }} />
      <View style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10, width: '100%', gap: 5, paddingTop: 4 }}>
        <Text style={styles.titleText}>{restaurantData.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignContent: 'center', alignItems: 'center' }}>
          <IconSymbol name="star.fill" size={18} color={colors.primary} />
          <Text style={styles.infoText}>
            {`Rating: ${restaurantData.rating} (${restaurantData.ratingCount > 100 ? '100+' : restaurantData.ratingCount})`}
          </Text>
        </View>
        <Text style={styles.infoText}>Orders Done: {restaurantData.ordersDone}</Text>
        <Text style={styles.infoText}>Address: {restaurantData.address}</Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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