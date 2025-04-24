import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import colors from '../styles/colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MenuItemContainer from '../components/menuItemContainer';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuItem, RestaurantData } from '../types/restaurant';
import { useNavigation } from 'expo-router';

export default function RestaurantDetails() {
  const { restaurant } = useLocalSearchParams();

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No restaurant data available.</Text>
      </View>
    );
  }

  const navigator = useNavigation();
  const [editingMenu, setEditingMenu] = useState<MenuItem|null>(null);
  const [shackItems, setShackItems] = useState<boolean>(false);

  const [restaurantData, setRestaurantData] = useState(JSON.parse(restaurant));
  const menuSortModalRef = useRef<Modalize>(null);
  const menuManageModalRef = useRef<Modalize>(null);
  const restaurantActionsModalRef = useRef<Modalize>(null);

  const openSortModal = () => {
    menuSortModalRef.current?.open();
  };

  const openRestaurantActionsModal = () => {
    restaurantActionsModalRef.current?.open();
  }

  useEffect(() => {
    if (editingMenu != null) {
      menuManageModalRef.current?.open();
    }
    else {
      menuManageModalRef.current?.close();
    }
  }, [editingMenu]);

  const handleSort = (type: string) => {
    let sortedMenu = [...restaurantData.menu];
    switch (type) {
      case 'alphabetical-asc':
        sortedMenu.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alphabetical-desc':
        sortedMenu.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedMenu.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedMenu.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setRestaurantData((prev: RestaurantData) => ({ ...prev, menu: sortedMenu }));
    menuSortModalRef.current?.close();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <Image source={{ uri: restaurantData.banner }} style={styles.image} />

      <TouchableOpacity style={{ position: 'absolute', top: 50, left: 20, zIndex: 4 }} onPress={() => navigator.goBack()}>
        <IconSymbol name="chevron.left.to.line" size={20} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={{ position: 'absolute', top: 50, right: 10, zIndex: 4, backgroundColor: colors.primary, padding: 8, borderRadius: 100 }} onPress={openRestaurantActionsModal}>
        <IconSymbol name="pencil" size={20} color={colors.primaryText} />
      </TouchableOpacity>

      <View style={styles.pageHeader}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Image source={{ uri: restaurantData.image }} style={{ width: 65, height: 65, borderRadius: 8 }} />
        <View style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: colors.primary, marginBottom: 4 }}>
          {restaurantData.name}
          </Text>
          <Text style={styles.infoText}>{restaurantData.cuisines.join(', ')}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'flex-end' }}>
          <IconSymbol name="star.fill" size={18} color={colors.primary} />
          <Text style={styles.infoText}>Rating: {restaurantData.rating}</Text>
          </View>
        </View>
        </View>
        <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
        >
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <IconSymbol name="location.fill" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{restaurantData.address}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <IconSymbol name="phone.fill" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{restaurantData.phone}</Text>
        </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.subtitle}>{restaurantData.bio}</Text>
        <View style={styles.toolKit}>
        <TouchableOpacity style={styles.toolButton} onPress={() => setShackItems(!shackItems)}>
          <IconSymbol name="pencil.line" size={17} color={colors.primary} />
          <Text style={{ fontSize: 14, fontWeight: '600' }}>manage Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolButton} onPress={openSortModal}>
          <Text style={{ fontSize: 14, color: colors.primary, fontWeight: '700' }}>Sort by</Text>
          <IconSymbol name="chevron.down" size={16} color={colors.primary} />
        </TouchableOpacity>
        </View>
      </View>

      <View style={styles.menuList}>
        {restaurantData.menu.length === 0 ? (
        <Text>No Menu Items Found</Text>
        ) : (
        restaurantData.menu.map((item: MenuItem) => <MenuItemContainer key={item.id} itemData={item} setEditing={setEditingMenu} shouldShake={shackItems} />)
        )}
      </View>
      </ScrollView>

      <Modalize ref={menuSortModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Sort Options</Text>
        <TouchableOpacity onPress={() => handleSort('alphabetical-asc')} style={styles.sortOption}>
        <Text>Alphabetical (A-Z)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('alphabetical-desc')} style={styles.sortOption}>
        <Text>Alphabetical (Z-A)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('price-asc')} style={styles.sortOption}>
        <Text>Price (Low to High)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort('price-desc')} style={styles.sortOption}>
        <Text>Price (High to Low)</Text>
        </TouchableOpacity>
      </View>
      </Modalize>

      <Modalize ref={menuManageModalRef} snapPoint={300} modalStyle={styles.modalStyle} onClosed={() => setEditingMenu(null)} keyboardAvoidingBehavior="padding" adjustToContentHeight>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delete Menu Item: {editingMenu?.name}</Text>
          <Text style={[styles.infoText, { marginBottom: 5 }]}>Provide the owner with a reason for the item deletion</Text>
          <TextInput style={{ borderWidth: 1, borderColor: colors.secondary, marginBottom: 20, padding: 10, height: 100, borderRadius: 8, backgroundColor: colors.background }} placeholder="Reason for deletion" multiline numberOfLines={4} textAlignVertical="top" placeholderTextColor="gray" />
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>Deletion is permanent and cannot be undone</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 10, justifyContent: 'center' }}>
          <TouchableOpacity style={[{backgroundColor: colors.secondary}, styles.actionButton]} onPress={() => setEditingMenu(null)}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>Cancel</Text>
          </TouchableOpacity>
        <TouchableOpacity style={[{backgroundColor: colors.primary}, styles.actionButton]} onPress={() => setEditingMenu(null)}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primaryText }}>Delete</Text>
        </TouchableOpacity>
          </View>
        </View>
      </Modalize>

      <Modalize ref={restaurantActionsModalRef} adjustToContentHeight modalStyle={styles.modalStyle}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Restaurant Actions</Text>
          <TouchableOpacity onPress={() => {}} style={styles.sortOption}>
            <Text>Issue Ticket To Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.sortOption}>
            <Text>Set Restaurant To Public</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.sortOption}>
            <Text>Set Restaurant To Private</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.sortOption}>
            <Text>Delete Restaurant</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingBottom: 20,
    position: 'relative',
    backgroundColor: colors.background,
  },
  pageHeader: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '85%',
    marginHorizontal: 'auto',
    marginTop: -60,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: colors.secondary,
  },
  bodyContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    marginHorizontal: 'auto',
  },
  toolKit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.primary,
    marginTop: 5,
    paddingVertical: 10,
    alignItems: 'flex-end',
  },
  menuList: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  toolButton: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    alignItems: 'center',
    gap: 5,
  },
  actionButton: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    objectFit: 'cover',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
  infoText: {
    fontSize: 13,
    color: 'gray',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
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