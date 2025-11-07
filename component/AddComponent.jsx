import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddComponent({ isDarkMode }) {
  return (
    <View style={styles.centered}>
      <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 18 }}>Favorites Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
