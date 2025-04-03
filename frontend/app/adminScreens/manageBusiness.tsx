import React, { useRef, useMemo } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import RestaurantContainer from '@/app/components/restaurantContainer';
import colors from '@/app/styles/colors';
import { RestaurantData } from '@/app/types/restaurant';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ManageBusinessScreen() {
  const [restaurants, setRestaurants] = React.useState<RestaurantData[]>([
    {
      id: '1',
      name: 'Restaurant A',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      address: '123 Main St, City A',
      ordersDone: 50,
      image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
      phone: '1234567890',
      email: 'restauranta@gmail.com',
      cuisines: ['Italian', 'Chinese'],
      menu: ['Pizza', 'Burger', 'Pasta'],
      rating: 4.5,
      ratingCount: 100,
    },
    {
      id: '2',
      name: 'Restaurant B',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      address: '456 Elm St, City B',
      ordersDone: 30,
      image: 'https://fastly.picsum.photos/id/125/200/300.jpg?hmac=yLvRBwUcr6LYWuGaGk05UjiU5vArBo3Idr3ap5tpSxU',
      phone: '9876543210',
      email: 'restaurantb@gmail.com',
      cuisines: ['Mexican', 'Indian'],
      menu: ['Tacos', 'Burritos', 'Samosas'],
      rating: 4.0,
      ratingCount: 80,
    },
  ]);

  const [filteredRestaurants, setFilteredRestaurants] = React.useState<RestaurantData[]>(restaurants);

  const handleFilterRestaurants = (text: string) => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  // Bottom Sheet setup
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <View style={styles.background}>
      <Text style={styles.titleText}>Restaurants</Text>
      <TextInput
        placeholder="Search"
        style={styles.searchBox}
        placeholderTextColor={colors.primary}
        onChangeText={(text) => handleFilterRestaurants(text)}
      />
      <View style={styles.mailContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
            <TouchableOpacity
            style={styles.toolButton}
            onPress={() => {
                console.log('Button pressed');
                console.log('BottomSheetRef:', bottomSheetRef.current);
                bottomSheetRef.current?.expand();
            }}
            >
            <Text style={{ color: colors.primary, fontWeight: '700' }}>Sort by</Text>
            <IconSymbol name="chevron.down" size={18} color={colors.primary} />
            </TouchableOpacity>
          <Text style={styles.infoText}>Filtered Restaurants: {filteredRestaurants.length}</Text>
        </View>
        {filteredRestaurants.length == 0 ? (
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: '700',
              textAlign: 'center',
              marginTop: 50,
            }}
          >
            No Restaurants Found
          </Text>
        ) : (
          <FlatList
            data={filteredRestaurants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RestaurantContainer restaurantData={item} />}
            contentContainerStyle={{ gap: 15 }}
          />
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start in a closed state
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        >
        <View style={styles.bottomSheetContent}>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>Bottom Sheet Content</Text>
            <Text>Here you can add any content you want!</Text>
        </View>
        </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  mailContainer: {
    flex: 1,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondaryText,
  },
  bottomSheetBackground: {
    backgroundColor: '#f8f9fa',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});