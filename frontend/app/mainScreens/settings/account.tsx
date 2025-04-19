import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import colors from '@/app/styles/colors';

export default function AccountSettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security Settings</Text>
        
        <View style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Change Email</Text>
            <Text style={styles.optionDescription}>Update your account email</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Update</Text>
          </TouchableOpacity>
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
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        
        <TouchableOpacity style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Manage Payment Methods</Text>
            <Text style={styles.optionDescription}>Add or remove payment options</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        
        <TouchableOpacity style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Terms of Service</Text>
            <Text style={styles.optionDescription}>View our terms and conditions</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionRow}>
          <View>
            <Text style={styles.optionTitle}>Privacy Policy</Text>
            <Text style={styles.optionDescription}>Read our privacy policy</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
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
  // Updated button styles for logout
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
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