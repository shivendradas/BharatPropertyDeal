import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  useColorScheme,
} from 'react-native';

// Sample property data
const properties = [
  {
    id: '1',
    title: 'Modern Apartment',
    price: '₹12,50,000',
    location: 'Mumbai, India',
    image:
      'https://images.unsplash.com/photo-1600585154397-0b5d00db1cc3?auto=format&fit=crop&w=800&q=60',
  },
  {
    id: '2',
    title: 'Cozy Family House',
    price: '₹25,00,000',
    location: 'Bangalore, India',
    image:
      'https://images.unsplash.com/photo-1572120360610-d971b7b63e27?auto=format&fit=crop&w=800&q=60',
  },
];

// PropertyCard component
function PropertyCard({ property }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: property.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{property.title}</Text>
        <Text style={styles.cardLocation}>{property.location}</Text>
        <Text style={styles.cardPrice}>{property.price}</Text>
      </View>
    </View>
  );
}

export default function SearchComponent({ isDarkMode }) {

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={[
          styles.searchBar,
          { backgroundColor: isDarkMode ? '#222' : '#fff', color: isDarkMode ? '#fff' : '#000' },
        ]}
        placeholder="Search properties"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
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
