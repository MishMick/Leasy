import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MediaCarousel from '@/components/MediaCarousel';

const listings = require('@/data/listings.json');

const Details = () => {
  const [data, setData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams();

  const mockData = listings[0];

  useEffect(() => {
    if (id) {
      const numberId = Number(id);

      async function fetchDetails() {
        setLoading(true);

        try {
          const data = await (await fetch(`http://localhost:3000/api/listings/${numberId}`)).json();
          setData(data);
        } catch (error) {
          console.log('Using mock data');
          setData(mockData);
        } finally {
          setLoading(false);
        }
      }

      fetchDetails();
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <MediaCarousel mediaData={data?.media || []} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{data?.title}</Text>
              <Text style={styles.description}>{data?.description}</Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default Details;
