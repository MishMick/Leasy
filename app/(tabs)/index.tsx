import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import Card from '@/components/Card'; // adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const listings = require('@/data/listings.json');

export default function TabTwoScreen() {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const applyFilters = async (listings: Listing[]) => {
    const savedFilters = await AsyncStorage.getItem('savedFilters');
    if (!savedFilters) return listings;

    const filters = JSON.parse(savedFilters);
    return listings.filter(listing => {
      return (
        (!filters.priceRange || listing.price <= filters.priceRange) &&
        (!filters.squareFootage || listing.squareFootage >= filters.squareFootage) &&
        (!filters.bedrooms || listing.bedrooms >= filters.bedrooms) &&
        (!filters.bathrooms || listing.bathrooms >= filters.bathrooms) &&
        Object.entries(filters.amenities).every(
          ([key, value]) => !value || listing[key] === true || listing[key] === 'yes'
        )
      );
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/listings');
      const rawData = await response.json();
      const filteredData = await applyFilters(rawData.result);
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data', error);
      const filteredData = await applyFilters(listings);
      setData(filteredData);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : data.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data.map(listing => (
            <Card
              key={listing.id}
              media={listing.media}
              price={listing.price}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              address={listing.address}
              id={listing.id}
            />
          ))}
        </ScrollView>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10, // Add padding around the scroll container
  },
  loader: {
    marginTop: 20, // Add some space above the spinner
  },
});
