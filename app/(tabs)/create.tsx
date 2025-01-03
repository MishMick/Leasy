import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Switch,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';


const LAUNDRY_OPTIONS = [
  { label: 'In-unit', value: 'in-unit' },
  { label: 'In-building', value: 'in-building' },
];

const AC_OPTIONS = [
  { label: 'Central AC', value: 'central AC' },
  { label: 'Window AC', value: 'window AC' },
];

const HEAT_OPTIONS = [
  { label: 'Central Heat', value: 'central heat' },
  { label: 'Window Heat', value: 'window heat' },
];

const LEASE_TYPE_OPTIONS = [
  { label: 'Sublease', value: 'sublease' },
  { label: 'Lease Transfer', value: 'lease transfer' },
];

const INCLUDED_IN_RENT_OPTIONS = [
  { label: 'Water', value: 'water' },
  { label: 'Gas', value: 'gas' },
  { label: 'Electricity', value: 'electricity' },
  { label: 'Trash', value: 'trash' },
  { label: 'WiFi', value: 'wifi' },
];

const PARKING_OPTIONS = [
  { label: 'Assigned', value: 'assigned' },
  { label: 'Street', value: 'street' },
];

const TOUR_OPTIONS = [
  { label: 'In-person', value: 'in-person' },
  { label: 'Virtual', value: 'virtual' },
];

export default function CreateScreen() {
  const [datePickerVisible, setDatePickerVisible] = useState({
    start: false,
    end: false,
  });

  const [media, setMedia] = useState<Array<{ uri: string; type: string }>>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newMedia: { uri: string; type: string } = {
        uri: result.assets[0].uri,
        type: result.assets[0].type === 'video' ? 'video' : 'image',
      };
      setMedia([...media, newMedia]);

      setFormData(prevFormData => ({
        ...prevFormData,
        media: [...prevFormData.media, newMedia] as Array<{ uri: string; type: string }>,
      }) as typeof prevFormData);
    }
  };

  const [isPlaying, setIsPlaying] = useState<{[key: string]: boolean}>({});

  const [formData, setFormData] = useState({
    price: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    squareFootage: '',
    laundry: '',
    ac: '',
    heat: '',
    dishwasher: '',
    microwave: '',
    elevator: false,
    amenityFee: '',
    securityDeposit: '',
    applicationFees: '',
    leaseType: '',
    leaseStartDate: '',
    leaseEndDate: '',
    tourOptions: [],
    includedInRent: [],
    parking: [],
    media: [],
  });

  const [openDropdowns, setOpenDropdowns] = useState({
    laundry: false,
    ac: false,
    heat: false,
    dishwasher: false,
    microwave: false,
    leaseType: false,
    tourOptions: false,
    includedInRent: false,
    parking: false,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(INCLUDED_IN_RENT_OPTIONS);

  const formSections = [
    {
      id: 'basic',
      title: 'Basic Information',
      content: (
        <View style={styles.sectionContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Monthly Rent ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.price}
              onChangeText={text => setFormData({ ...formData, price: text })}
              keyboardType="numeric"
              placeholder="Enter monthly rent"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Bedrooms</Text>
              <TextInput
                style={styles.input}
                value={formData.bedrooms}
                onChangeText={text => setFormData({ ...formData, bedrooms: text })}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Bathrooms</Text>
              <TextInput
                style={styles.input}
                value={formData.bathrooms}
                onChangeText={text => setFormData({ ...formData, bathrooms: text })}
                keyboardType="numeric"
                placeholder="0"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={text => setFormData({ ...formData, address: text })}
              placeholder="Enter full address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Square Footage</Text>
            <TextInput
              style={styles.input}
              value={formData.squareFootage}
              onChangeText={text => setFormData({ ...formData, squareFootage: text })}
              keyboardType="numeric"
              placeholder="Enter square footage"
            />
          </View>
        </View>
      ),
    },
    {
      id: 'amenities',
      title: 'Amenities',
      content: (
        <View style={styles.sectionContent}>
          <View style={[styles.dropdownWrapper, { zIndex: 6000 }]}>
            <Text style={styles.label}>Laundry</Text>
            <DropDownPicker
              open={openDropdowns.laundry}
              setOpen={value => setOpenDropdowns({ ...openDropdowns, laundry: value })}
              value={formData.laundry}
              setValue={callback => setFormData({ ...formData, laundry: callback() })}
              items={LAUNDRY_OPTIONS}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select laundry type"
              zIndex={6000}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 5000 }]}>
            <Text style={styles.label}>AC Type</Text>
            <DropDownPicker
              open={openDropdowns.ac}
              setOpen={value => setOpenDropdowns({ ...openDropdowns, ac: value })}
              value={formData.ac}
              setValue={callback => setFormData({ ...formData, ac: callback() })}
              items={AC_OPTIONS}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select AC type"
              zIndex={5000}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 4000 }]}>
            <Text style={styles.label}>Heat Type</Text>
            <DropDownPicker
              open={openDropdowns.heat}
              setOpen={value => setOpenDropdowns({ ...openDropdowns, heat: value })}
              value={formData.heat}
              setValue={callback => setFormData({ ...formData, heat: callback() })}
              items={HEAT_OPTIONS}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select heat type"
              zIndex={4000}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 3000 }]}>
            <Text style={styles.label}>Included in Rent</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              style={styles.dropdown}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              theme="LIGHT"
              multiple={true}
              mode="BADGE"
              badgeDotColors={[
                '#e76f51',
                '#00b4d8',
                '#e9c46a',
                '#e76f51',
                '#8ac926',
                '#00b4d8',
                '#e9c46a',
              ]}
              zIndex={3000}
              dropDownDirection="BOTTOM"
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.label}>Elevator</Text>
            <Switch
              value={formData.elevator}
              onValueChange={value => setFormData({ ...formData, elevator: value })}
            />
          </View>
        </View>
      ),
    },
    {
      id: 'fees',
      title: 'Fees',
      content: (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Amenity Fee ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.amenityFee}
              onChangeText={text => setFormData({ ...formData, amenityFee: text })}
              keyboardType="numeric"
              placeholder="Enter amenity fee"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Security Deposit ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.securityDeposit}
              onChangeText={text => setFormData({ ...formData, securityDeposit: text })}
              keyboardType="numeric"
              placeholder="Enter security deposit"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Application Fees ($)</Text>
            <TextInput
              style={styles.input}
              value={formData.applicationFees}
              onChangeText={text => setFormData({ ...formData, applicationFees: text })}
              keyboardType="numeric"
              placeholder="Enter application fees"
            />
          </View>
        </>
      ),
    },
    {
      id: 'additional',
      title: 'Additional Options',
      content: (
        <>
          <View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
            <Text style={styles.label}>Tour Options</Text>
            <DropDownPicker
              open={openDropdowns.tourOptions}
              setOpen={value => setOpenDropdowns({ ...openDropdowns, tourOptions: value })}
              value={formData.tourOptions}
              setValue={callback => setFormData({ ...formData, tourOptions: callback() })}
              items={TOUR_OPTIONS}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select tour options"
              multiple={true}
              zIndex={2000}
            />
          </View>

          <View style={[styles.dropdownWrapper, { zIndex: 1000 }]}>
            <Text style={styles.label}>Parking Options</Text>
            <DropDownPicker
              open={openDropdowns.parking}
              setOpen={value => setOpenDropdowns({ ...openDropdowns, parking: value })}
              value={formData.parking}
              setValue={callback => setFormData({ ...formData, parking: callback() })}
              items={PARKING_OPTIONS}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select parking options"
              multiple={true}
              zIndex={1000}
            />
          </View>
        </>
      ),
    },
    {
      id: 'lease',
      title: 'Lease Details',
      content: (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Lease Type</Text>
            <DropDownPicker
              open={openDropdowns.leaseType}
              setOpen={value => setOpenDropdowns({ ...openDropdowns, leaseType: value })}
              value={formData.leaseType}
              setValue={callback => setFormData({ ...formData, leaseType: callback() })}
              items={LEASE_TYPE_OPTIONS}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              placeholder="Select lease type"
              zIndex={5000}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Lease Start Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setDatePickerVisible({ ...datePickerVisible, start: true })}
            >
              <Text style={formData.leaseStartDate ? styles.dateText : styles.placeholderText}>
                {formData.leaseStartDate || 'Select start date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible.start}
              mode="date"
              onConfirm={date => {
                setFormData({ ...formData, leaseStartDate: date.toISOString().split('T')[0] });
                setDatePickerVisible({ ...datePickerVisible, start: false });
              }}
              onCancel={() => setDatePickerVisible({ ...datePickerVisible, start: false })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Lease End Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setDatePickerVisible({ ...datePickerVisible, end: true })}
            >
              <Text style={formData.leaseEndDate ? styles.dateText : styles.placeholderText}>
                {formData.leaseEndDate || 'Select end date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible.end}
              mode="date"
              onConfirm={date => {
                setFormData({ ...formData, leaseEndDate: date.toISOString().split('T')[0] });
                setDatePickerVisible({ ...datePickerVisible, end: false });
              }}
              onCancel={() => setDatePickerVisible({ ...datePickerVisible, end: false })}
            />
          </View>
        </>
      ),
    },
    {
      id: 'media',
      title: 'Photos & Videos',
      content: (
        <View style={styles.mediaSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickMedia}>
            <Text style={styles.uploadButtonText}>Add Photos/Videos</Text>
          </TouchableOpacity>

          {errors.media && (
            <Text style={styles.errorText}>{errors.media}</Text>
          )}

          <FlatList
            data={media}
            horizontal
            renderItem={({ item, index }) => (
              <View style={styles.mediaPreview}>
                {item.type === 'video' ? (
                  <TouchableOpacity onPress={() => setIsPlaying({...isPlaying, [index]: !isPlaying[index]})}>
                    <Video
                      source={{ uri: item.uri }}
                      style={styles.mediaPreviewVideo}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      shouldPlay={isPlaying[index]}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image 
                    source={{ uri: item.uri }} 
                    style={styles.mediaPreviewImage} 
                  />
                )}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ),
    },
  ];

  const handleSubmit = () => {
    setErrors({});
  
    // Check for video requirement
    const hasVideo = media.some(item => item.type === 'video');
    if (!hasVideo) {
      setErrors({...errors, media: 'At least one video is required'});
      return;
    }
  
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formSections}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.content}
          </View>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.title}>List Your Space</Text>}
        ListFooterComponent={
          <Link href="/" style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Create Listing</Text>
          </Link>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text.primary,
    marginBottom: 24,
    marginHorizontal: 20,
    marginTop: 20,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text.primary,
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.light.text.primary,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.light.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    fontSize: 16,
    color: Colors.light.text.primary,
  },
  dropdown: {
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 50,
  },
  dropdownContainer: {
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: Colors.light.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  dateInput: {
    backgroundColor: Colors.light.card,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  dateText: {
    fontSize: 16,
    color: Colors.light.text.primary,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.light.text.secondary,
  },
  dropdownWrapper: {
    marginBottom: 30,
    zIndex: 5000,
  },
  amenitiesContainer: {
    gap: 12,
  },
  dropdownList: {
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderRadius: 12,
  },
  sectionContent: {
    marginTop: 16,
  },
  mediaSection: {
    marginVertical: 16,
  },
  uploadButton: {
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mediaPreview: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mediaPreviewImage: {
    width: '100%',
    height: '100%',
  },
  mediaPreviewVideo: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8
  }
});
