import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
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
      fetchDetails(numberId);
    }
  }, [id]);

  async function fetchDetails(id: number) {
    setLoading(true);

    try {
      const data = await (await fetch(`http://localhost:3000/api/listings/${id}`)).json();
      setData(data);
    } catch (error) {
      console.log('Using mock data');
      setData(mockData);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <MediaCarousel mediaData={data?.media || []} />
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{data?.title}</Text>
              <Text style={styles.price}>${data?.price.toLocaleString()}</Text>
              <Text style={styles.description}>{data?.description}</Text>
              
              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Property Details</Text>
                <Text>Bedrooms: {data?.bedrooms}</Text>
                <Text>Bathrooms: {data?.bathrooms}</Text>
                <Text>Square Footage: {data?.squareFootage} sq ft</Text>
                <Text>Address: {data?.address}</Text>
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Amenities</Text>
                <Text>Laundry: {data?.laundry}</Text>
                <Text>AC: {data?.ac}</Text>
                <Text>Heat: {data?.heat}</Text>
                <Text>Parking: {data?.parking}</Text>
                <Text>Dishwasher: {data?.dishwasher}</Text>
                <Text>Microwave: {data?.microwave}</Text>
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Lease Information</Text>
                <Text>Lease Type: {data?.leaseType}</Text>
                <Text>Start Date: {data?.leaseStartDate}</Text>
                <Text>End Date: {data?.leaseEndDate}</Text>
                <Text>Security Deposit: ${data?.securityDeposit}</Text>
                <Text>Application Fee: ${data?.applicationFees}</Text>
                <Text>Amenity Fee: ${data?.amenityFee}/month</Text>
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Included in Rent</Text>
                {data?.includedInRent?.map((item, index) => (
                  <Text key={index}>• {item}</Text>
                ))}
              </View>

              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Tour Options</Text>
                {data?.tourOptions?.map((option, index) => (
                  <Text key={index}>• {option}</Text>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
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
  price: {
    fontSize: 22,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
});

export default Details;
