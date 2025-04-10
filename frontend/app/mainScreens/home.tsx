import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;