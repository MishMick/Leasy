import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';

export default function FilterScreen() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    priceRange: 0,
    squareFootage: 0,
    bedrooms: 0,
    bathrooms: 0,
    amenities: {
      laundry: false,
      ac: false,
      dishwasher: false,
      microwave: false,
      elevator: false
    }
  });

  const validateSingleDigit = (value: string) => {
    const numValue = parseInt(value);
    return numValue >= 0 && numValue <= 9 ? numValue : filters.bedrooms;
  };

  const renderRangeSlider = (title, rangeKey, minLimit, maxLimit) => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.rangeText}>
        {filters[rangeKey]} {rangeKey === 'priceRange' ? '$' : 'sq ft'}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={minLimit}
        maximumValue={maxLimit}
        value={filters[rangeKey]}
        minimumTrackTintColor="#2196F3"
        maximumTrackTintColor="#E3F2FD"
        thumbTintColor="#2196F3"
        onValueChange={(value) =>
          setFilters((prev) => ({
            ...prev,
            [rangeKey]: Math.round(value),
          }))
        }
      />
    </View>
  );

  const renderAmenitiesToggles = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Amenities</Text>
      {Object.keys(filters.amenities).map((amenity) => (
        <View key={amenity} style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>
            {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
          </Text>
          <Switch
            value={filters.amenities[amenity]}
            onValueChange={(value) =>
              setFilters(prev => ({
                ...prev,
                amenities: {
                  ...prev.amenities,
                  [amenity]: value
                }
              }))
            }
            trackColor={{ false: '#E3F2FD', true: '#90CAF9' }}
            thumbColor={filters.amenities[amenity] ? '#2196F3' : '#f4f3f4'}
          />
        </View>
      ))}
    </View>
  );

  const renderBedroomsBathrooms = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Rooms</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bedrooms</Text>
          <TextInput
            style={styles.input}
            value={filters.bedrooms ? String(filters.bedrooms) : ''}
            onChangeText={(value) =>
              setFilters((prev) => ({
                ...prev,
                bedrooms: value === '' ? 0 : Math.max(0, Math.min(9, parseInt(value) || 0)),
              }))
            }
            keyboardType="numeric"
            maxLength={1}
            placeholderTextColor="#999"
            placeholder="0"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bathrooms</Text>
          <TextInput
            style={styles.input}
            value={filters.bathrooms ? String(filters.bathrooms) : ''}
            onChangeText={(value) =>
              setFilters((prev) => ({
                ...prev,
                bathrooms: value === '' ? 0 : Math.max(0, Math.min(9, parseInt(value) || 0)),
              }))
            }
            keyboardType="numeric"
            maxLength={1}
            placeholderTextColor="#999"
            placeholder="0"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderRangeSlider('Price Range', 'priceRange', 0, 10000)}
        {renderRangeSlider('Square Footage', 'squareFootage', 0, 3000)}
        {renderBedroomsBathrooms()}
        {renderAmenitiesToggles()}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={() => {
          router.back()
          }}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  rangeText: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '500',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '45%',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  applyButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});