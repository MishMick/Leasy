import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useVideoPlayer, VideoView } from 'expo-video';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

interface MediaCarouselProps {
    mediaData: MediaItem[];
}

const MediaCarousel = ({ mediaData }: MediaCarouselProps) => {
  const renderItem = (item: MediaItem, index: number ) => {

    const player = useVideoPlayer(item.uri, player => {
        player.loop = true;
        player.play();
    });

    return (
      <View style={styles.carouselItem} key={index}>
        {item.type === 'image' ? (
          <Image source={{ uri: item.uri }} style={styles.media} />
        ) : item.type === 'video' && player ? (
            <VideoView style={styles.media} player={player} allowsFullscreen allowsPictureInPicture />
        ) : (
          <Text>Invalid media type</Text>
        )}
      </View>
    );
  };

  return (
    <View>
        <Swiper style={styles.wrapper} showsButtons loop>
            {mediaData.map((item, index) => (
                renderItem(item, index)
            ))}
        </Swiper>
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
      marginBottom: 20,
    },
    wrapper: {
        height: 200,
      },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    carouselItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    media: {
      width: width - 40, // Adjust width as needed
      height: 200, // Set a fixed height for both images and videos
      backgroundColor: 'black',
    },
});

export default MediaCarousel;