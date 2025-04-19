import React, { useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import RestaurantContainer from '@/app/components/restaurantContainer';
import colors from '@/app/styles/colors';
import { RestaurantData } from '@/app/types/restaurant';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ManageBusinessScreen() {
  const [restaurants, setRestaurants] = React.useState<RestaurantData[]>([
    {
      id: '1',
      name: 'Restaurant A',
      bio: 'offering the best italian, chinese hybrid in the world. food so good you will wish you were john cena',
      address: '123 Main St, City A',
      ordersDone: 50,
      banner: 'https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg',
      image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
      phone: '1234567890',
      email: 'restauranta@gmail.com',
      cuisines: ['Italian', 'Chinese'],
      menu: [
        {
          id: '1',
          name: 'Tacos',
          price: 10,
          description: 'Delicious tacos with fresh ingredients',
          image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
        },
        {
          id: '2',
          name: 'Biryani',
          price: 15,
          description: 'Spicy and flavorful biryani',
          image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
        }
      ],
      rating: 4.5,
      ratingCount: 100,
    },
    {
      id: '2',
      name: 'Restaurant B',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      address: '456 Elm St, City B',
      ordersDone: 30,
      banner: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
      image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
      phone: '9876543210',
      email: 'restaurantb@gmail.com',
      cuisines: ['Mexican', 'Indian'],
      menu: [
        {
          id: '1',
          name: 'Tacos',
          price: 10,
          description: 'Delicious tacos with fresh ingredients',
          image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
        },
        {
          id: '2',
          name: 'Biryani',
          price: 15,
          description: 'Spicy and flavorful biryani',
          image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
        },
      ],
      rating: 4.0,
      ratingCount: 80,
    },
  ]);

  const [filteredRestaurants, setFilteredRestaurants] = React.useState<RestaurantData[]>(restaurants);

  const modalizeRef = useRef<Modalize>(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const handleFilterRestaurants = (text: string) => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleSort = (type: string) => {
    let sortedRestaurants = [...filteredRestaurants];
    switch (type) {
      case 'alphabetical-asc':
        sortedRestaurants.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alphabetical-desc':
        sortedRestaurants.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-asc':
        sortedRestaurants.sort((a, b) => a.rating - b.rating);
        break;
      case 'rating-desc':
        sortedRestaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'orders-asc':
        sortedRestaurants.sort((a, b) => a.ordersDone - b.ordersDone);
        break;
      case 'orders-desc':
        sortedRestaurants.sort((a, b) => b.ordersDone - a.ordersDone);
        break;
      default:
        break;
    }
    setFilteredRestaurants(sortedRestaurants);
    modalizeRef.current?.close(); // Close the modal after sorting
  };

  return (
    <View style={styles.background}>
      <Text style={styles.titleText}>Restaurants</Text>
      <TextInput
        placeholder="Search"
        style={styles.searchBox}
        placeholderTextColor={colors.primary}
        onChangeText={(text) => handleFilterRestaurants(text)}
      />

      <View style={styles.toolKit}>
        <TouchableOpacity style={styles.toolButton} onPress={openModal}>
          <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '700' }}>Sort by</Text>
          <IconSymbol name="chevron.down" size={14} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.infoText}>Found Restaurants: {filteredRestaurants.length}</Text>
      </View>

      <ScrollView style={styles.resultContainer} contentContainerStyle={{ gap: 15 }} bounces={true} showsVerticalScrollIndicator={true}>
        {filteredRestaurants.length === 0 ? (
          <Text style={styles.noResultsText}>No Restaurants Found</Text>
        ) : (
          filteredRestaurants.map((item) => (
            <RestaurantContainer key={item.id} restaurantData={item} />
          ))
        )}
      </ScrollView>

      <Modalize ref={modalizeRef} modalHeight={280} snapPoint={280} modalStyle={styles.modalStyle}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sort Options</Text>
          <TouchableOpacity onPress={() => handleSort('alphabetical-asc')} style={styles.sortOption}>
            <Text>Alphabetical (A-Z)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('alphabetical-desc')} style={styles.sortOption}>
            <Text>Alphabetical (Z-A)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('rating-asc')} style={styles.sortOption}>
            <Text>Rating (Low to High)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('rating-desc')} style={styles.sortOption}>
            <Text>Rating (High to Low)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('orders-asc')} style={styles.sortOption}>
            <Text>Orders Done (Low to High)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort('orders-desc')} style={styles.sortOption}>
            <Text>Orders Done (High to Low)</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 50,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBox: {
    marginHorizontal: 'auto',
    width: '94%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  resultContainer: {
    paddingTop: 20,
    backgroundColor: colors.background,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 10,
  },
  toolKit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '94%',
    marginHorizontal: 'auto',
    marginVertical: 10,
  },
  toolButton: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    borderRadius: 50,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryText,
  },
  noResultsText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 50,
  },
  modalStyle: {
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});