import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Page</Text>
      <Text style={styles.description}>
        Displaying details for item 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default Details;