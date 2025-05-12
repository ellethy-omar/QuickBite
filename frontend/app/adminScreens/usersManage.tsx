import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import colors from '@/app/styles/colors';
import { userData } from '../types/user';
import UserContainer from '../components/userContainer';
import { fetchAllUsers } from '../endpoints/adminEndpoints';
import { MaterialIcons } from '@expo/vector-icons';
import { RefreshControl } from 'react-native-gesture-handler';

export default function UsersManageScreen() {
      const [users, setUsers] = React.useState<userData[]>([]);
      const [loading, setLoading] = React.useState(true);
      const [refreshing, setRefreshing] = React.useState(false);
      const [filteredUsers, setFilteredUsers] = React.useState<userData[]>(users);
      const modalizeRef = useRef<Modalize>(null);

      useEffect(() => {
        if (!loading) return;

        const fetchUsers = async () => {
          try {
            const response = await fetchAllUsers();
            setUsers(response);
            setFilteredUsers(response); // Initialize filtered users with all users
          } catch (error) {
            console.error('Error fetching users:', error);
          } finally {
            setLoading(false);
            setRefreshing(false);
          }
        };

        fetchUsers();
      }, [loading]);

      const onRefresh = () => {
        setLoading(true);
        fetchAllUsers();
      }

      const openModal = () => {
        modalizeRef.current?.open();
      };
    
      const handleFilterRestaurants = (text: string) => {
        const filtered = users.filter((user) =>
          user.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filtered);
      };
    
      const handleSort = (type: string) => {
        let sortedUsers = [...filteredUsers];
        switch (type) {
          case 'alphabetical-asc':
            sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'alphabetical-desc':
            sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            break;
        }
        setFilteredUsers(sortedUsers);
        modalizeRef.current?.close(); // Close the modal after sorting
      };

    return (
        <SafeAreaView style={styles.background}>
          <Text style={styles.titleText}>Users</Text>
          <TextInput
            placeholder="Search"
            style={styles.searchBox}
            placeholderTextColor={colors.primary}
            onChangeText={(text) => handleFilterRestaurants(text)}
          />
    
          <View style={styles.toolKit}>
            <TouchableOpacity style={styles.toolButton} onPress={openModal}>
              <Text style={{ fontSize: 11, color: colors.primary, fontWeight: '700' }}>Sort by</Text>
              <MaterialIcons name="sort" size={16} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.infoText}>Found Users: {filteredUsers.length}</Text>
          </View>
    
          <ScrollView style={styles.resultContainer} contentContainerStyle={{ gap: 15 }} bounces={true} showsVerticalScrollIndicator={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}>
            {loading ? (
              <Text style={styles.noResultsText}>Loading...</Text>
            ) : (
              <View style={{ gap: 10, paddingBottom: 30 }}>
              {filteredUsers.length === 0 ? (
              <Text style={styles.noResultsText}>No Restaurants Found</Text>
            ) : (
              filteredUsers.map((item) => (
                <UserContainer key={item._id} userData={item}/>
              ))
            )}
              </View >
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