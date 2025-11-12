import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const LocationPickerModal = ({ visible, onClose, onSelect }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) return;

    let isMounted = true;

    Geolocation.getCurrentPosition(
      (pos) => {
        if (isMounted) {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        if (isMounted) setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    return () => {
      isMounted = false;
    };
  }, [visible]);

  const handleSelect = () => {
    if (!location) return;
    onSelect({
      lat: location.latitude,
      lon: location.longitude,
      address: `Lat: ${location.latitude.toFixed(5)}, Lon: ${location.longitude.toFixed(5)}`,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
            <Text>Fetching current location...</Text>
          </View>
        ) : (
          <>
            <MapView
              style={{ flex: 1 }}
              provider={null} // disable Google Maps
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
              <UrlTile
                urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maximumZ={19}
                tileSize={256}
                zIndex={0}
                flipY={false}
              />
              <Marker coordinate={location} />
            </MapView>

            {/* OpenStreetMap attribution */}
            <View style={styles.attributionContainer}>
              <Text style={styles.attributionText}>© OpenStreetMap contributors</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSelect} style={styles.button}>
                <Text style={styles.buttonText}>Select Location</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: '#ccc' }]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default LocationPickerModal;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    minWidth: 140,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  attributionContainer: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  attributionText: {
    fontSize: 10,
    color: '#555',
  },
});
