import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import axios from 'axios';
import { useVideoPlayer, VideoView } from 'expo-video';
import MediaCarousel from '@/components/MediaCarousel';

const Details = () => {
  const [data, setData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      const numberId = Number(id);

      async function fetchDetails() {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/listings/${numberId}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching listing details', error);
        } finally {
          setLoading(false);
        }
      }

      fetchDetails();
    }
  }, [id]); // Depend on `id`, so it runs when `id` changes.

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
          <MediaCarousel mediaData={data?.media || []} />
      )}
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
  video: {
    width: 300,
    height: 200,
  },
});

export default Details;