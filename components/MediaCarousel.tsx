import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useVideoPlayer, VideoPlayer, VideoView } from 'expo-video';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

interface MediaCarouselProps {
    mediaData: MediaItem[];
}

const MediaCarousel = ({ mediaData }: MediaCarouselProps) => {

    // Reorder mediaData to ensure video appears first
    const reorderedMediaData = [...mediaData];
    const videoIndex = reorderedMediaData.findIndex(item => item.type === 'video');
    if (videoIndex !== -1) {
        // Move the video to the first position
        const videoItem = reorderedMediaData.splice(videoIndex, 1)[0];
        reorderedMediaData.unshift(videoItem);
    }

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
            <Swiper 
                style={styles.wrapper} 
                showsButtons 
                loop
            >
                {reorderedMediaData.map((item, index) => (
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
    wrapper: {
        height: 200,
    },
    carouselItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    media: {
      width: width - 40, // Adjust width as needed
      height: 200, // Set a fixed height for both images and videos
      backgroundColor: 'black',
    }
})

export default MediaCarousel;