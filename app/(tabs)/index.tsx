import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import Card from '@/components/Card'; // adjust the path as necessary

const listings = [
  {
    id: 1,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+1',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+2',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 1',
    description: 'This is the first card description.',
  },
  {
    id: 2,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+2',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+3',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 2',
    description: 'This is the second card description.',
  },
  {
    id: 3,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+3',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+4',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 3',
    description: 'This is the third card description.',
  },
  {
    id: 4,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+4',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+5',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 4',
    description: 'This is the fourth card description.',
  },
  {
    id: 5,
    media: [
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+5',
      },
      {
        type: 'image',
        uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+6',
      },
      {
        type: 'video',
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
    title: 'Listing 5',
    description: 'This is the fifth card description.',
  },
];

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
