import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // 🧠 YOUR WORKING STYLE
import colors from '@/app/styles/colors';
import { RestaurantData } from '@/app/types/restaurant';
import { GetAllRestaurants } from '@/app/endpoints/userEndpoints';

export default function HomeScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await GetAllRestaurants();
        console.log('Fetched restaurants:', response);

        const mappedRestaurants: RestaurantData[] = response.data.map((rest: any) => ({
          id: rest._id,
          name: rest.name,
          email: rest.contact?.email || '',
          ordersDone: 0,
          image: rest.logo ? `http://192.168.1.217:4123/uploads/${rest.logo}` : 'https://via.placeholder.com/60',
          banner: rest.coverImage ? `http://192.168.1.217:4123/uploads/${rest.coverImage}` : 'https://via.placeholder.com/300x150',
          phone: rest.contact?.phone || '',
          bio: rest.description || '',
          rating: rest.rating || 0,
          ratingCount: 0,
          address: `${rest.address?.area || ''}, ${rest.address?.city || ''}`,
          cuisines: rest.cuisineType || [],
          menu: [],
        }));

        setRestaurants(mappedRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handlePressRestaurant = (id: string) => {
    (router as any).push(`mainScreens/home/${id}`); // 🧠 Just like you did for orders
  };

  const renderRestaurant = ({ item }: { item: RestaurantData }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => handlePressRestaurant(item.id)}
    >
      <View style={styles.infoContainer}>
        <Image source={{ uri: item.image }} style={styles.logo} />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.cuisine}>
            {item.cuisines.slice(0, 2).join(', ') || 'No cuisines'}
          </Text>
        </View>
      </View>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No restaurants found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  cuisine: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});
