import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // 🧠 YOUR WORKING STYLE
import colors from '@/app/styles/colors';
import { RestaurantData } from '@/app/types/restaurant';
import { GetAllRestaurants } from '@/app/endpoints/userEndpoints';
import { useNotification } from '@/app/context/notificationContext';

export default function HomeScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const {showNotification } = useNotification();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await GetAllRestaurants();
        console.log('[index.tsx] Fetched restaurants:', response);

        const cleanRestaurants = response.data.filter((rest: any) => !rest.isBanned);

        const mappedRestaurants: RestaurantData[] = cleanRestaurants.map((rest: any) => ({
          id: rest._id,
          name: rest.name,
          email: rest.contact?.email || '',
          ordersDone: 0,
          image: rest.logo ? `${rest.logo}` : 'https://i.imgur.com/6VBx3io.png',
          banner: rest.coverImage ? `${rest.coverImage}` : 'https://i.imgur.com/6VBx3io.png',
          phone: rest.contact?.phone || '',
          bio: rest.description || '',
          rating: rest.rating || 0,
          ratingCount: 0,
          address: `${rest.address?.area || ''}, ${rest.address?.city || ''}`,
          cuisines: rest.cuisineType || [],
          menu: [],
          openingHours: rest.openingHours || undefined,
          isActive: rest.isActive ?? true,
          isBanned: rest.isBanned ?? false,
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

  const handlePressRestaurant = (item: RestaurantData) => {
    if (!item.isActive) {
      showNotification('This restaurant is currently inactive.', 'info');
      return;
    }
  
    router.push({
      pathname: `/mainScreens/home/${item.id}`,
      params: {
        name: item.name,
        banner: item.banner,
        image: item.image,
        bio: item.bio,
        phone: item.phone,
        isActive: item.isActive.toString(),
        openingHours: JSON.stringify(item.openingHours || {}),
      }
    });
  };
  

  const renderRestaurant = ({ item }: { item: RestaurantData }) => {
    // console.log('[index.tsx] 🔍 Rendering restaurant:', item.name);
    // console.log('[index.tsx] 📦 Full item:', item);
  
      const now = new Date();
      // console.log('🕒 Current time:', now);

      const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      // console.log('📅 Today is:', today);

      const hours = item.openingHours?.[today];
      // console.log('⏰ Opening hours for today:', hours);

      let isOpenNow = false;
      if (hours) {
        const [openH, openM] = hours.open.split(':').map(Number);
        const [closeH, closeM] = hours.close.split(':').map(Number);

        // console.log('🔓 Opening time:', { openH, openM });
        // console.log('🔒 Closing time:', { closeH, closeM });

        const openTime = new Date();
        openTime.setHours(openH, openM, 0);

        const closeTime = new Date();
        closeTime.setHours(closeH, closeM, 0);

        // console.log('🕒 Computed openTime:', openTime);
        // console.log('🕒 Computed closeTime:', closeTime);

        isOpenNow = now >= openTime && now <= closeTime;
        // console.log('🏪 Is the restaurant open now?', isOpenNow);
      }

  
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handlePressRestaurant(item)}
        activeOpacity={0.9}
      >
        {!item.isActive && <View style={styles.inactiveOverlay} />}

        <Image source={{ uri: item.banner }} style={styles.banner} />
  
        <View style={styles.infoContainer}>
          <Image source={{ uri: item.image }} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.cuisine}>{item.cuisines.slice(0, 2).join(', ') || 'No cuisines'}</Text>
          </View>
        </View>
  
        {item.bio ? <Text style={styles.description}>{item.bio}</Text> : null}
  
        <View style={styles.metaRow}>
          {item.phone && <Text style={styles.metaText}>📞 {item.phone}</Text>}

          {item.isActive ? (
            <>
              {hours ? (
                <Text style={styles.metaText}>🕒 {hours.open} - {hours.close}</Text>
              ) : (
                <Text style={styles.metaText}>⏳ Hours not available</Text>
              )}
              <Text style={[styles.metaText, { color: isOpenNow ? '#28a745' : '#d9534f' }]}>
                {isOpenNow ? '🟢 Open Now' : '🔴 Closed'}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.metaText}>🕒 Not available</Text>
              <Text style={[styles.metaText, { color: '#999' }]}>🚫 Temporarily Inactive</Text>
            </>
          )}
        </View>

      </TouchableOpacity>
    );
  };
  
  
  

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
    backgroundColor: '#fff',
    borderRadius: 12,
    position: 'relative',
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    paddingBottom: 12, // for spacing under the row
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
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
  banner: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 12,
    backgroundColor: '#eee',
    resizeMode: 'cover',
  },
  description: {
    fontSize: 13,
    color: '#444',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 10,
  },
  
  metaText: {
    fontSize: 12,
    color: '#666',
  },  

  inactiveOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 10,
  },
  
});
