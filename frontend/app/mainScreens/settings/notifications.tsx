import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import colors from '@/app/styles/colors';

export default function NotificationsSettingsScreen() {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(true);
  const [deliveryAlerts, setDeliveryAlerts] = useState(true);
  const [newRestaurants, setNewRestaurants] = useState(false);
  const [accountActivity, setAccountActivity] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Push Notifications</Text>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Order Updates</Text>
            <Text style={styles.optionDescription}>Status changes and confirmations</Text>
          </View>
          <Switch
            value={orderUpdates}
            onValueChange={setOrderUpdates}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Special Offers</Text>
            <Text style={styles.optionDescription}>Discounts and promotions</Text>
          </View>
          <Switch
            value={specialOffers}
            onValueChange={setSpecialOffers}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Delivery Alerts</Text>
            <Text style={styles.optionDescription}>Real-time delivery status updates</Text>
          </View>
          <Switch
            value={deliveryAlerts}
            onValueChange={setDeliveryAlerts}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email Notifications</Text>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>New Restaurants</Text>
            <Text style={styles.optionDescription}>Be first to know about new restaurants</Text>
          </View>
          <Switch
            value={newRestaurants}
            onValueChange={setNewRestaurants}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Account Activity</Text>
            <Text style={styles.optionDescription}>Login alerts and important updates</Text>
          </View>
          <Switch
            value={accountActivity}
            onValueChange={setAccountActivity}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Timing</Text>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Quiet Hours</Text>
            <Text style={styles.optionDescription}>Don't send notifications during specified hours</Text>
          </View>
          <Switch
            value={quietHours}
            onValueChange={setQuietHours}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>
      
      <Text style={styles.infoText}>
        You can manage your notification preferences at any time from this screen.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#888',
  },
  infoText: {
    marginTop: 16,
    marginBottom: 40,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});