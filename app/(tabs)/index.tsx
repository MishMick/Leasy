import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Card from '@/components/Card'; // adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const listings = require('@/data/listings.json');

export default function HomeScreen() {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
          ([key, value]) =>
            !value ||
            (key in listing &&
              (listing[key as keyof Listing] === true || listing[key as keyof Listing] === 'yes'))
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : data.length > 0 ? (
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3498db"]}
              tintColor="#3498db"
            />
          }
        >
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
        <View style={styles.noResultsContainer}>
          <MaterialIcons name="search-off" size={64} color="#cbd5e1" />
          <Text style={styles.noResultsTitle}>No Matches Found</Text>
          <Text style={styles.noResultsText}>
            Try adjusting your filters to see more options
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
