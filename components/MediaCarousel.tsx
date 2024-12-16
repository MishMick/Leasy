import React, { useState, useRef } from 'react';
import { 
  View, 
  FlatList, 
  Image, 
  Dimensions, 
  StyleSheet,
  Animated
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

interface MediaCarouselProps {
  mediaData: MediaItem[];
}

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth;
const CAROUSEL_HEIGHT = 350;

const MediaCarousel: React.FC<MediaCarouselProps> = ({ mediaData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Create video players at component level
  const videoPlayers = mediaData.map(item => {
    if (item.type === 'video') {
        return useVideoPlayer(item.uri, player => {
            player.loop = true;
            player.play();
        });
    }
    return null;
    });

    const renderItem = ({ item, index }: { item: MediaItem; index: number }) => {
        return (
            <View style={styles.slideContainer}>
                {item.type === 'image' ? (
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : item.type === 'video' && videoPlayers[index] ? (
                    <VideoView 
                        style={styles.video} 
                        player={videoPlayers[index]}
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                ) : null}
            </View>
        );
    };

  const renderDotIndicator = () => (
      <View style={styles.dotContainer}>
          {mediaData.map((_, index) => (
              <Animated.View
                  key={index}
                  style={[
                      styles.dot,
                      {
                          width: scrollX.interpolate({
                              inputRange: [
                                  (index - 1) * ITEM_WIDTH,
                                  index * ITEM_WIDTH,
                                  (index + 1) * ITEM_WIDTH,
                              ],
                              outputRange: [8, 16, 8],
                              extrapolate: 'clamp',
                          }),
                          opacity: scrollX.interpolate({
                              inputRange: [
                                  (index - 1) * ITEM_WIDTH,
                                  index * ITEM_WIDTH,
                                  (index + 1) * ITEM_WIDTH,
                              ],
                              outputRange: [0.5, 1, 0.5],
                              extrapolate: 'clamp',
                          }),
                      },
                  ]}
              />
          ))}
      </View>
  );

  return (
      <View style={styles.container}>
          <FlatList
              ref={flatListRef}
              data={mediaData}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              bounces={false}
              onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
              )}
              onMomentumScrollEnd={(event) => {
                  const newIndex = Math.round(
                      event.nativeEvent.contentOffset.x / ITEM_WIDTH
                  );
                  setActiveIndex(newIndex);
              }}
              getItemLayout={(_, index) => ({
                  length: ITEM_WIDTH,
                  offset: ITEM_WIDTH * index,
                  index,
              })}
          />
          {renderDotIndicator()}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      height: CAROUSEL_HEIGHT,
  },
  slideContainer: {
      width: ITEM_WIDTH,
      height: CAROUSEL_HEIGHT,
  },
  image: {
      width: '100%',
      height: '100%',
  },
  video: {
      width: '100%',
      height: '100%',
  },
  dotContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 20,
      alignSelf: 'center',
      gap: 8,
  },
  dot: {
      height: 8,
      borderRadius: 4,
      backgroundColor: '#fff',
      marginHorizontal: 2,
  }
});

export default MediaCarousel;