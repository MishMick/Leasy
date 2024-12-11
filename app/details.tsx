import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import axios from 'axios';
import { useVideoPlayer, VideoView } from 'expo-video';

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

  let videoSource = '';
  const video = data?.media.find(item => item.type === "video");

  if (video) {
    videoSource = video.uri
  } 

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Page</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {data && <Text>{JSON.stringify(data)}</Text>}
          <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
        </>
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