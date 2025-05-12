import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import colors from '@/app/styles/colors';
import { fetchAllDrivers } from '../endpoints/adminEndpoints';
import { DriverData } from '../types/driver';
import DriverContainer from '../components/driverContainer';
import { MaterialIcons } from '@expo/vector-icons';
import { RefreshControl } from 'react-native-gesture-handler';

export default function DriversManageScreen() {
    const [drivers, setDrivers] = React.useState<DriverData[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [filteredDrivers, setFilteredDrivers] = React.useState<DriverData[]>(drivers);
    const modalizeRef = useRef<Modalize>(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchDrivers = async () => {
        try {
            const response = await fetchAllDrivers();
            setDrivers(response);
            setFilteredDrivers(response);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (!loading) return;
        fetchDrivers();
    }, [loading]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchDrivers();
    };

    const openModal = () => {
        modalizeRef.current?.open();
    };

    const handleFilterDrivers = (text: string) => {
        const filtered = drivers.filter((driver) =>
            driver.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDrivers(filtered);
    };
    
    const handleSort = (type: string) => {
        let sortedDrivers = [...filteredDrivers];
        switch (type) {
            case 'alphabetical-asc':
            sortedDrivers.sort((a, b) => a.name.localeCompare(b.name));
            break;
            case 'alphabetical-desc':
            sortedDrivers.sort((a, b) => b.name.localeCompare(a.name));
            break;
            case 'rating-asc':
                sortedDrivers.sort((a, b) => (a.rating || 0) - (b.rating || 0));
                break;
            case 'rating-desc':
                sortedDrivers.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
            break;
        }
        setFilteredDrivers(sortedDrivers);
        modalizeRef.current?.close();
    };

    return (
        <SafeAreaView style={styles.background}>
          <Text style={styles.titleText}>Drivers</Text>
          <TextInput
            placeholder="Search"
            style={styles.searchBox}
            placeholderTextColor={colors.primary}
            onChangeText={(text) => handleFilterDrivers(text)}
          />
    
          <View style={styles.toolKit}>
            <TouchableOpacity style={styles.toolButton} onPress={openModal}>
              <Text style={{ fontSize: 11, color: colors.primary, fontWeight: '700' }}>Sort by</Text>
              <MaterialIcons name="sort" size={16} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.infoText}>Found drivers: {filteredDrivers.length}</Text>
          </View>
    
          <ScrollView style={styles.resultContainer} contentContainerStyle={{ gap: 15, borderTopLeftRadius: 20 }} bounces={true} showsVerticalScrollIndicator={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}>
            {loading ? (
              <Text style={styles.noResultsText}>Loading...</Text>
            ) : (
              <View style={{ gap: 10, paddingBottom: 30 }}>
              {filteredDrivers.length === 0 ? (
              <Text style={styles.noResultsText}>No Restaurants Found</Text>
            ) : (
              filteredDrivers.map((item) => (
                <DriverContainer key={item._id} driverData={item}/>
              ))
            )}
              </View>
            )}
          </ScrollView>
    
          <Modalize ref={modalizeRef} adjustToContentHeight modalStyle={styles.modalStyle}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort Options</Text>
              <TouchableOpacity onPress={() => handleSort('alphabetical-asc')} style={styles.sortOption}>
                <Text>Alphabetical (A-Z)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('alphabetical-desc')} style={styles.sortOption}>
                <Text>Alphabetical (Z-A)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('rating-asc')} style={styles.sortOption}>
                <Text>Rating (Ascending)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSort('rating-desc')} style={styles.sortOption}>
                <Text>Rating (Descending)</Text>
              </TouchableOpacity>
            </View>
          </Modalize>
        </SafeAreaView>
      );
    }
    
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: 10,
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBox: {
    marginHorizontal: 'auto',
    width: '94%',
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    borderWidth: 1,
    borderColor: colors.offset,
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
    padding: 6,
    borderRadius: 50,
  },
  infoText: {
    fontSize: 13,
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