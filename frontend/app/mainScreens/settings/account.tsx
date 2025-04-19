import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import colors from '@/app/styles/colors';

export default function AccountSettingsScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Two-Factor Authentication</Text>
            <Text style={styles.optionDescription}>Enable additional security for your account</Text>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Change Password</Text>
            <Text style={styles.optionDescription}>Update your account password</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Email Notifications</Text>
            <Text style={styles.optionDescription}>Receive important updates via email</Text>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Dark Mode</Text>
            <Text style={styles.optionDescription}>Use dark theme throughout the app</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
        
        <TouchableOpacity style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Privacy Policy</Text>
            <Text style={styles.optionDescription}>Read our privacy policy</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Terms of Service</Text>
            <Text style={styles.optionDescription}>View our terms of service</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.dangerButton}>
        <Text style={styles.dangerButtonText}>Log Out</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.deleteAccountText}>Delete Account</Text>
      </TouchableOpacity>
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
  changeButton: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  dangerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteAccountText: {
    color: '#ff3b30',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 40,
  }
});