import { StyleSheet, ScrollView } from 'react-native';
import Card from '@/components/Card'; // adjust the path as necessary

const cardData = [
  {
    id: 1,
    images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+1' }],
    title: 'Listing 1',
    description: 'This is the first card description.',
    link: '/details?name=JohnDoe&age=31',
  },
  {
    id: 2,
    images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+2' }],
    title: 'Listing 2',
    description: 'This is the second card description.',
    link: '/details?name=JohnDoe&age=32',
  },
  {
    id: 3,
    images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+3' }],
    title: 'Listing 3',
    description: 'This is the third card description.',
    link: '/details?name=JohnDoe&age=33',
  },
  {
    id: 4,
    images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+4' }],
    title: 'Listing 4',
    description: 'This is the fourth card description.',
    link: '/details?name=JohnDoe&age=34',
  },
  {
    id: 5,
    images: [{ uri: 'https://via.placeholder.com/250/808080/FFFFFF?text=Card+5' }],
    title: 'Listing 5',
    description: 'This is the fifth card description.',
    link: '/details?name=JohnDoe&age=35',
  },
];

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {cardData.map((card) => (
        <Card
          key={card.id}
          images={card.images}
          title={card.title}
          description={card.description}
          link={card.link} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10, // Add padding around the scroll container
  },
});
