import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import Config from '../config';
import LoginComponent from './login/LoginComponent';
import RegisterComponent from './login/RegisterComponent';
import LocationPickerModal from './LocationPickerModal';

const AddComponent = ({ isDarkMode }) => {
  // ---------- Hooks (must always be top-level) ----------
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('login');
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const [formData, setFormData] = useState({
    adGivenBy: 'owner',
    ownerName: '',
    ownerContact: '',
    propertyCategory: 'residential',
    propertyType: '',
    transactionType: '',
    title: '',
    description: '',
    location: '',
    address: '',
    lat: 0.0,
    lon: 0.0,
    price: '',
    bedrooms: '',
    bathrooms: '',
    hall: '',
    kitchen: '',
    areaSqft: '',
    contactName: '',
    contactPhone: '',
    images: [],
  });

  const apiBaseUrl = Config.REACT_APP_API_URL;

  // ---------- Effects ----------
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setUser({ email });
          setLoggedInEmail(email);
        } else {
          setUser(null);
          setLoggedInEmail(null);
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage', error);
      }
    };
    checkLogin();
  }, []);

  // ---------- Handlers ----------
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true, selectionLimit: 5 },
      (response) => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          setFormData((prev) => ({ ...prev, images: response.assets }));
        }
      }
    );
  };

  const handleSubmit = async () => {
    try {
      const base64Images = formData.images.map((asset) => asset.base64);

      const payload = {
        adGivenBy: formData.adGivenBy,
        ownerName: formData.ownerName,
        ownerContact: formData.ownerContact,
        propertyCategory: formData.propertyCategory,
        propertyType: formData.propertyType,
        transactionType: formData.transactionType,
        description: formData.description,
        location: formData.location,
        address: formData.address,
        latitude: formData.lat,
        longitude: formData.lon,
        price: formData.price,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        hall: formData.hall,
        kitchen: formData.kitchen,
        areaSqft: formData.areaSqft,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        email: loggedInEmail || '',
        imageData: base64Images.length > 0 ? base64Images[0] : null,
      };
      console.log('Submitting payload:', payload);
      await axios.post(`${apiBaseUrl}/api/properties/addPropertyRequest`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      Alert.alert('Success', 'Property aid submitted!');
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Submission failed.');
    }
  };

  // ---------- Styles ----------
  const textStyle = { color: isDarkMode ? '#fff' : '#000' };
  const inputStyle = {
    borderWidth: 1,
    borderColor: '#888',
    color: textStyle.color,
    padding: 8,
    marginBottom: 10,
  };

  // ---------- Conditional Rendering ----------
  let content;

  if (!user) {
    if (screen === 'login') {
      content = (
        <LoginComponent
          onLogin={(userData) => {
            setUser(userData);
            if (userData.email) setLoggedInEmail(userData.email);
          }}
          onCreateAccount={() => setScreen('register')}
        />
      );
    } else {
      content = <RegisterComponent onRegisterSuccess={() => setScreen('login')} />;
    }
  } else {
    // ---------- Main Form ----------
    content = (
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* Property Category */}
        <Text style={textStyle}>Usage:</Text>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <Button
            title={`${formData.propertyCategory === 'residential' ? '●' : '○'} Residential`}
            onPress={() => handleChange('propertyCategory', 'residential')}
          />
          <Button
            title={`${formData.propertyCategory === 'commercial' ? '●' : '○'} Commercial`}
            onPress={() => handleChange('propertyCategory', 'commercial')}
          />
        </View>

        {/* Ad Given By */}
        <Text style={textStyle}>You are:</Text>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <Button
            title={`${formData.adGivenBy === 'owner' ? '●' : '○'} Owner`}
            onPress={() => handleChange('adGivenBy', 'owner')}
          />
          <Button
            title={`${formData.adGivenBy === 'agent' ? '●' : '○'} Agent`}
            onPress={() => handleChange('adGivenBy', 'agent')}
          />
          <Button
            title={`${formData.adGivenBy === 'builder' ? '●' : '○'} Builder`}
            onPress={() => handleChange('adGivenBy', 'builder')}
          />
        </View>

        {/* Owner fields visible for agent */}
        {formData.adGivenBy === 'agent' && (
          <>
            <TextInput
              placeholder="Owner Name"
              value={formData.ownerName}
              onChangeText={(text) => handleChange('ownerName', text)}
              style={inputStyle}
            />
            <TextInput
              placeholder="Owner Contact Number"
              value={formData.ownerContact}
              onChangeText={(text) => handleChange('ownerContact', text)}
              style={inputStyle}
              keyboardType="phone-pad"
            />
          </>
        )}

        {/* Property Type */}
        <Text style={textStyle}>Property Type:</Text>
        <View style={{ borderWidth: 1, borderColor: '#888', borderRadius: 4, marginBottom: 10 }}>
          <Picker
            selectedValue={formData.propertyType}
            onValueChange={(value) => handleChange('propertyType', value)}
            dropdownIconColor={isDarkMode ? '#fff' : '#000'}
            style={{ color: isDarkMode ? '#fff' : '#000' }}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Flat / Apartment" value="flat" />
            <Picker.Item label="Individual Home" value="individual_home" />
            <Picker.Item label="Villa" value="villa" />
            <Picker.Item label="Builder Floor" value="builderfloor" />
            <Picker.Item label="Plot" value="plot" />
            <Picker.Item label="Studio Apartment" value="studioapartment" />
            <Picker.Item label="Penthouse" value="penthouse" />
            <Picker.Item label="Farm House" value="farmhouse" />
          </Picker>
        </View>

        {/* Transaction Type */}
        <Text style={textStyle}>Transaction Type:</Text>
        <View style={{ borderWidth: 1, borderColor: '#888', borderRadius: 4, marginBottom: 10 }}>
          <Picker
            selectedValue={formData.transactionType}
            onValueChange={(value) => handleChange('transactionType', value)}
            dropdownIconColor={isDarkMode ? '#fff' : '#000'}
            style={{ color: isDarkMode ? '#fff' : '#000' }}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Sell" value="sell" />
            <Picker.Item label="Rent" value="rent" />
            <Picker.Item label="Lease" value="lease" />
          </Picker>
        </View>

        <TextInput
          placeholder="Property Description"
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
          multiline
          style={[inputStyle, { height: 100 }]}
        />

        <TextInput
          placeholder="Location (city/area)"
          value={formData.location}
          onChangeText={(text) => handleChange('location', text)}
          style={inputStyle}
        />

        <TextInput
          placeholder="Address (auto-filled)"
          value={formData.address}
          editable={false}
          style={[inputStyle, { backgroundColor: '#e0e0e0' }]}
        />

        <TouchableOpacity onPress={() => setShowMapPicker(true)} style={{ marginBottom: 12 }}>
          <Text style={[textStyle, { color: 'blue' }]}>📍 Select Address on Map</Text>
        </TouchableOpacity>
        <LocationPickerModal
          visible={showMapPicker}
          onClose={() => setShowMapPicker(false)}
          onSelect={(data) => {
            handleChange('address', data.address);
            handleChange('lat', data.lat);
            handleChange('lon', data.lon);
          }}
        />


        <TextInput
          placeholder="Price"
          value={formData.price}
          onChangeText={(text) => handleChange('price', text)}
          style={inputStyle}
          keyboardType="numeric"
        />

        {/* Rooms section */}
        {formData.propertyType !== 'plot' && formData.propertyType !== 'farmhouse' && (
          <>
            <TextInput
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChangeText={(text) => handleChange('bedrooms', text)}
              style={inputStyle}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChangeText={(text) => handleChange('bathrooms', text)}
              style={inputStyle}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Hall"
              value={formData.hall}
              onChangeText={(text) => handleChange('hall', text)}
              style={inputStyle}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Kitchen"
              value={formData.kitchen}
              onChangeText={(text) => handleChange('kitchen', text)}
              style={inputStyle}
              keyboardType="numeric"
            />
          </>
        )}

        <TextInput
          key="areaSqft"
          placeholder="Area (sq ft)"
          value={formData.areaSqft}
          onChangeText={(text) => handleChange('areaSqft', text)}
          style={inputStyle}
          keyboardType="numeric"
          maxLength={5}
        />

        <TextInput
        key="contactName"
          placeholder="Contact Name"
          value={formData.contactName}
          onChangeText={(text) => handleChange('contactName', text)}
          style={inputStyle}
        />

        <TextInput
          key="contactPhone"
          placeholder="Contact Phone"
          value={formData.contactPhone}
          onChangeText={(text) => handleChange('contactPhone', text)}
          style={inputStyle}
          keyboardType="phone-pad"
        />

        {/* Image picker */}
        {formData.transactionType !== 'buy' && (
          <>
            <Button title="Pick Property Images" onPress={handleImagePick} />
            <Text style={[textStyle, { marginVertical: 8 }]}>
              {formData.images.length > 0
                ? `${formData.images.length} image(s) selected`
                : 'No images selected'}
            </Text>
          </>
        )}

        <Button title="Submit Property Aid" onPress={handleSubmit} />
      </ScrollView>
    );
  }

  return content;
};

export default AddComponent;
