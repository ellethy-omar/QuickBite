import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import colors from '@/app/styles/colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { userData } from '../types/user';
import UserContainer from '../components/userContainer';
import { fetchAllUsers } from '../endpoints/adminEndpoints';

export default function UsersManageScreen() {
      const [users, setUsers] = React.useState<userData[]>([]);
      const [loading, setLoading] = React.useState(true);
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
          }
        };

        fetchUsers();
      }, [loading]);

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
        <View style={styles.background}>
          <Text style={styles.titleText}>Users</Text>
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
            <Text style={styles.infoText}>Found Users: {filteredUsers.length}</Text>
          </View>
    
          <ScrollView style={styles.resultContainer} contentContainerStyle={{ gap: 15 }} bounces={true} showsVerticalScrollIndicator={true}>
            {loading ? (
              <Text style={styles.noResultsText}>Loading...</Text>
            ) : (
              <>
              {filteredUsers.length === 0 ? (
              <Text style={styles.noResultsText}>No Restaurants Found</Text>
            ) : (
              filteredUsers.map((item) => (
                <UserContainer key={item._id} userData={item}/>
              ))
            )}
              </>
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