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

  const renderDetailItem = (label: string, value: string | number | boolean) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <>
            <MediaCarousel mediaData={data?.media || []} />
            <View style={styles.contentContainer}>
              <View style={styles.headerSection}>
                <Text style={styles.price}>${data?.price.toLocaleString()} / month</Text>
                <Text style={styles.address}>{data?.address}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Property Details</Text>
                <View style={styles.detailsGrid}>
                  {renderDetailItem('Bedrooms', data?.bedrooms || 0)}
                  {renderDetailItem('Bathrooms', data?.bathrooms || 0)}
                  {renderDetailItem('Square Feet', `${data?.squareFootage.toLocaleString()} sq ft`)}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Amenities</Text>
                <View style={styles.amenitiesContainer}>
                  {renderDetailItem('Laundry', data?.laundry || '')}
                  {renderDetailItem('AC', data?.ac || '')}
                  {renderDetailItem('Heat', data?.heat || '')}
                  {renderDetailItem('Parking', data?.parking || '')}
                  {renderDetailItem('Dishwasher', data?.dishwasher || '')}
                  {renderDetailItem('Microwave', data?.microwave || '')}
                  {renderDetailItem('Elevator', data?.elevator ? 'Yes' : 'No')}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Lease Details</Text>
                {renderDetailItem('Type', data?.leaseType || '')}
                {renderDetailItem('Start Date', data?.leaseStartDate || '')}
                {renderDetailItem('End Date', data?.leaseEndDate || '')}
                {renderDetailItem('Security Deposit', `${data?.securityDeposit.toLocaleString()}`)}
                {renderDetailItem('Application Fee', `${data?.applicationFees}`)}
                {renderDetailItem('Monthly Amenity Fee', `${data?.amenityFee}`)}
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Included in Rent</Text>
                <View style={styles.tagsContainer}>
                  {data?.includedInRent?.map((item, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Tour Options</Text>
                <View style={styles.tagsContainer}>
                  {data?.tourOptions?.map((option, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{option}</Text>
                    </View>
                  ))}
                </View>
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
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 26,
    color: '#3498db',
    fontWeight: '700',
    marginBottom: 10,
  },
  address: {
    fontSize: 17,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 6,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 17,
    color: '#2c3e50',
    fontWeight: '600',
  },
  amenitiesContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  tagText: {
    color: '#3498db',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default Details;
