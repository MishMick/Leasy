import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import Card from '@/components/Card'; // adjust the path as necessary

const listings = require('@/data/listings.json');

export default function TabTwoScreen() {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the local API server
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/listings');
      const data = await response.json();
      setData(data.result);
    } catch (error) {
      console.error('Error fetching data', error);
      setData(listings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      // TODO: remove once tested
      fetchData();
    }, 3000);
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : data.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data.map(card => (
            <Card
              key={card.id}
              media={card.media}
              title={card.title}
              description={card.description}
              id={card.id}
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
