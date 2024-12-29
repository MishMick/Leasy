import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Add these imports for enhanced visuals
import { MaterialIcons } from '@expo/vector-icons';

const saveFilters = async (filters: any) => {
  await AsyncStorage.setItem('savedFilters', JSON.stringify(filters));
};

const loadSavedFilters = async () => {
  const savedFilters = await AsyncStorage.getItem('savedFilters');
  return savedFilters ? JSON.parse(savedFilters) : null;
};

export default function FilterScreen() {
  const router = useRouter();
  // Add initial state as a constant
  const initialFilters = {
    priceRange: 0,
    squareFootage: 0,
    bedrooms: 0,
    bathrooms: 0,
    amenities: {
      laundry: false,
      ac: false,
      dishwasher: false,
      microwave: false,
      elevator: false,
    },
    tourOptions: {
      inPerson: false,
      virtual: false,
    },
    includedInRent: {
      water: false,
      trash: false,
      wifi: false,
      gas: false,
      electricity: false,
    },
    leaseType: {
      sublease: false,
      leaseTransfer: false,
    },
    parking: {
      assigned: false,
      street: false,
    },
    leaseStartDate: '',
    leaseEndDate: '',
  };
  const [filters, setFilters] = useState(initialFilters);

  // Update the apply button handler
  const handleApplyFilters = async () => {
    await saveFilters(filters);
    router.back();
  };

  // Add reset handler
  const handleResetFilters = async () => {
    setFilters(initialFilters);
    await AsyncStorage.removeItem('savedFilters');
  };

  // Load saved filters on mount
  useEffect(() => {
    const loadFilters = async () => {
      const saved = await loadSavedFilters();
      if (saved) {
        setFilters(saved);
      }
    };
    loadFilters();
  }, []);

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
        onValueChange={value =>
          setFilters(prev => ({
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
      {Object.keys(filters.amenities).map(amenity => (
        <View key={amenity} style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>
            {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
          </Text>
          <Switch
            value={filters.amenities[amenity]}
            onValueChange={value =>
              setFilters(prev => ({
                ...prev,
                amenities: {
                  ...prev.amenities,
                  [amenity]: value,
                },
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
            onChangeText={value =>
              setFilters(prev => ({
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
            onChangeText={value =>
              setFilters(prev => ({
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

  // Add these new render functions
  // Safeguard check in renderTourOptions to handle undefined values
  const renderTourOptions = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Tour Options</Text>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>In-Person Tours</Text>
        <Switch
          value={filters.tourOptions?.inPerson ?? false} // Use fallback if undefined
          onValueChange={value =>
            setFilters(prev => ({
              ...prev,
              tourOptions: { ...prev.tourOptions, inPerson: value },
            }))
          }
          trackColor={{ false: '#E3F2FD', true: '#90CAF9' }}
          thumbColor={filters.tourOptions?.inPerson ? '#2196F3' : '#f4f3f4'}
        />
      </View>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Virtual Tours</Text>
        <Switch
          value={filters.tourOptions?.virtual ?? false} // Use fallback if undefined
          onValueChange={value =>
            setFilters(prev => ({
              ...prev,
              tourOptions: { ...prev.tourOptions, virtual: value },
            }))
          }
          trackColor={{ false: '#E3F2FD', true: '#90CAF9' }}
          thumbColor={filters.tourOptions?.virtual ? '#2196F3' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderIncludedUtilities = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Included in Rent</Text>
      {Object.entries(filters.includedInRent ?? {}).map(
        ([utility, value]) => (
          <View key={utility} style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>
              {utility.charAt(0).toUpperCase() + utility.slice(1)}
            </Text>
            <Switch
              value={value ?? false} // Use fallback if value is undefined
              onValueChange={newValue =>
                setFilters(prev => ({
                  ...prev,
                  includedInRent: { ...prev.includedInRent, [utility]: newValue },
                }))
              }
              trackColor={{ false: '#E3F2FD', true: '#90CAF9' }}
              thumbColor={value ? '#2196F3' : '#f4f3f4'}
            />
          </View>
        )
      )}
    </View>
  );
  

  const renderLeaseType = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Lease Type</Text>
      {Object.entries(filters.leaseType ?? {}).map(
        (
          [type, value] // Use fallback if undefined
        ) => (
          <View key={type} style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>
              {type === 'leaseTransfer' ? 'Lease Transfer' : 'Sublease'}
            </Text>
            <Switch
              value={value ?? false} // Use fallback if value is undefined
              onValueChange={newValue =>
                setFilters(prev => ({
                  ...prev,
                  leaseType: { ...prev.leaseType, [type]: newValue },
                }))
              }
              trackColor={{ false: '#E3F2FD', true: '#90CAF9' }}
              thumbColor={value ? '#2196F3' : '#f4f3f4'}
            />
          </View>
        )
      )}
    </View>
  );

  const renderLeaseDates = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Lease Dates</Text>
      <View style={styles.dateSection}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <View style={styles.dateInputContainer}>
            <MaterialIcons name="calendar-today" size={20} color="#3498db" />
            <TextInput
              style={styles.dateInput}
              value={filters.leaseStartDate}
              onChangeText={value =>
                setFilters(prev => ({
                  ...prev,
                  leaseStartDate: value,
                }))
              }
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>End Date</Text>
          <View style={styles.dateInputContainer}>
            <MaterialIcons name="calendar-today" size={20} color="#3498db" />
            <TextInput
              style={styles.dateInput}
              value={filters.leaseEndDate}
              onChangeText={value =>
                setFilters(prev => ({
                  ...prev,
                  leaseEndDate: value,
                }))
              }
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>
      </View>
    </View>
  );

  // Update the parking render function
  const ParkingToggle = ({ label, value, onValueChange }) => (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E3F2FD', true: '#90CAF9' }}
        thumbColor={value ? '#2196F3' : '#f4f3f4'}
      />
    </View>
  );
  
  const renderParking = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Parking</Text>
      <ParkingToggle
        label="Assigned Parking"
        value={filters.parking?.assigned || false}
        onValueChange={(value: any) =>
          setFilters(prev => ({
            ...prev,
            parking: { ...prev.parking, assigned: value },
          }))
        }
      />
      <ParkingToggle
        label="Street Parking"
        value={filters.parking?.street || false}
        onValueChange={(value: any) =>
          setFilters(prev => ({
            ...prev,
            parking: { ...prev.parking, street: value },
          }))
        }
      />
    </View>
  );
  

  // Update the return statement to include new filters
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderRangeSlider('Price Range', 'priceRange', 0, 10000)}
        {renderRangeSlider('Square Footage', 'squareFootage', 0, 3000)}
        {renderBedroomsBathrooms()}
        {renderAmenitiesToggles()}
        {renderTourOptions()}
        {renderIncludedUtilities()}
        {renderLeaseType()}
        {renderParking()}
        {renderLeaseDates()}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleResetFilters}
          >
            <MaterialIcons name="refresh" size={20} color="#576574" />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.applyButton]}
            onPress={handleApplyFilters}
          >
            <MaterialIcons name="check" size={20} color="#fff" />
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Update the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    padding: 20,
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
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  rangeText: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  toggleLabel: {
    fontSize: 17,
    color: '#34495e',
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  inputContainer: {
    width: '47%',
  },
  inputLabel: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#2c3e50',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  resetButton: {
    backgroundColor: '#f5f6fa',
    borderWidth: 1.5,
    borderColor: '#dcdde1',
  },
  applyButton: {
    backgroundColor: '#3498db',
  },
  resetButtonText: {
    color: '#576574',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dateSection: {
    gap: 16,
  },
  dateContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '500',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 48,
  },
  dateInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#2c3e50',
  },
});
