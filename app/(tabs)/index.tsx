import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Card from '@/components/Card'; // adjust the path as necessary
import axios from 'axios';


export default function TabTwoScreen() {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the local API server
  const fetchData = async () => {
    //setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/listings');
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      fetchData();
    }, 3000)
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data.map((card) => (
            <Card
              key={card.id}
              images={card.images}
              title={card.title}
              description={card.description}
              id={card.id} />
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
});
