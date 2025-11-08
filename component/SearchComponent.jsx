import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropertyCard from './PropertyCard';
import Config from '../config'; // or via environment variable


export default function SearchComponent({ isDarkMode }) {
  const [searchText, setSearchText] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl = Config.REACT_APP_API_URL; // Replace with your API base url

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fetch all records when searchText is empty
      fetchProperties(searchText.trim());
    }, 500); // debounce 500ms

    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchProperties = async (query) => {
    setLoading(true);
    try {
      // If query is empty, omit 'q' param or pass empty string depending on your API
      const url = query
        ? `${apiBaseUrl}/api/properties/search?q=${encodeURIComponent(query)}`
        : `${apiBaseUrl}/api/properties/search`; // for all records
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Fetch properties error:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={[
          styles.searchBar,
          { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' },
        ]}
        placeholder="Search properties"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={searchText}
        onChangeText={setSearchText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginVertical: 10 }} />}
      {!loading && properties.length === 0 && searchText.trim() !== '' && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: isDarkMode ? '#aaa' : '#666' }}>
          No properties found.
        </Text>
      )}
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PropertyCard property={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    margin: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    elevation: 2,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 70,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: 120,
    height: 90,
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardLocation: {
    fontSize: 13,
    color: '#666',
    marginVertical: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2e7d32',
  },
});
