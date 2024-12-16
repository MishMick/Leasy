import { Link } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;


const Card: React.FC<Listing> = ({media, title, description, id}) => {
  const renderImage = ({ item }: { item: MediaItem }) => (
    item.type === 'image' ? 
    <Image source={{ uri: item.uri }} style={styles.image} /> : null  // TODO: maybe change to play video as well
  );

  return (
    <Link href={{ pathname: '/details', params: { id: id } }} style={styles.card}>
      <FlatList
        data={media}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: screenWidth, // Dynamically set width to screen width
    height: screenWidth * 0.6, // Adjust height based on desired aspect ratio (e.g., 16:9)
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Card;