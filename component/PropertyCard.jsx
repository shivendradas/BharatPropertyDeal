import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Buffer } from 'buffer';

// Converts a buffer object { data: [...] } to base64 image URI
const bufferObjectToBase64Image = (bufferObj, mimeType = 'image/jpeg') => {
    if (!bufferObj || !Array.isArray(bufferObj.data)) return '';
    const buf = Buffer.from(bufferObj.data);
    const base64 = buf.toString('base64');
    return `data:${mimeType};base64,${base64}`;
};

function PropertyCard({ property }) {
    return (
        <View style={styles.card}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                {property.images ? (
                    <Image
                        key="property-image"
                        source={{ uri: bufferObjectToBase64Image(property.images, 'image/jpeg') }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <Text style={{ color: '#fff' }}>No Images Available</Text>
                )}

            </ScrollView>

            <Text style={styles.name}>{property.name}</Text>
            <Text style={styles.propertyType}>Type: {property.property_type}</Text>
            <Text style={styles.description}>Description: {property.description}</Text>
            <Text style={styles.location}>Location: {property.location}</Text>
            <Text style={styles.price}>Price: ₹{property.price}</Text>
            <Text style={styles.bedrooms}>Bedrooms: {property.bedrooms}</Text>
            <Text style={styles.bathrooms}>Bathrooms: {property.bathrooms}</Text>
            <Text style={styles.area}>Area: {property.area_sqft} sqft</Text>
            <Text style={styles.contact}>
                Contact: {property.contact_name} ({property.contact_phone})
            </Text>
            <Text style={styles.postedOn}>
                Posted on:{' '}
                {property.created_at
                    ? new Date(property.created_at).toLocaleString()
                    : 'N/A'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 12,
        backgroundColor: '#1e293b',
        borderRadius: 12,
        elevation: 3,
    },
    imageScroll: {
        marginBottom: 12,
    },
    image: {
        width: 120,
        height: 70,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#3b82f6',
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#60a5fa',
        marginBottom: 6,
    },
    propertyType: { color: '#cbd5e1', marginBottom: 4 },
    description: { color: '#94a3b8', marginBottom: 6 },
    location: { color: '#cbd5e1', marginBottom: 4 },
    price: { color: '#3b82f6', fontWeight: '700', marginBottom: 6 },
    bedrooms: { color: '#cbd5e1', marginBottom: 2 },
    bathrooms: { color: '#cbd5e1', marginBottom: 2 },
    area: { color: '#cbd5e1', marginBottom: 2 },
    contact: { color: '#cbd5e1', marginBottom: 6 },
    postedOn: { color: '#cbd5e1', fontSize: 12 },
});

export default PropertyCard;
