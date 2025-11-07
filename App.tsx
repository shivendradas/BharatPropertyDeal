import React, { useState } from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchComponent from './component/SearchComponent';
import AddComponent from './component/AddComponent';
import Profile from './component/Profile';

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState('home');

  let content;
  if (activeTab === 'home') {
    content = <SearchComponent isDarkMode={isDarkMode} />;
  } else if (activeTab === 'favorites') {
    content = <AddComponent isDarkMode={isDarkMode} />;
  } else if (activeTab === 'profile') {
    content = <Profile isDarkMode={isDarkMode} />;
  }
  // Colors for active/inactive tabs
  const activeColor = '#4CAF50';
  const inactiveColor = isDarkMode ? '#fff' : '#000';
  return (
    <View
      style={[
        styles.container,
        { paddingTop: safeAreaInsets.top, backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {content}

      {/* Bottom navigation */}
      <View style={[styles.bottomNav, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Icon name={activeTab === 'home' ? 'home' : 'home-outline'} size={24} color={activeTab === 'home' ? activeColor : inactiveColor} />
          <Text style={[styles.navText, { color: activeTab === 'home' ? activeColor : inactiveColor, fontWeight: activeTab === 'home' ? 'bold' : 'normal' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('add')}>
          <Icon name={activeTab === 'add' ? 'add-circle' : 'add-circle-outline'} size={24} color={activeTab === 'add' ? activeColor : inactiveColor} />
          <Text style={[styles.navText, { color: activeTab === 'add' ? activeColor : inactiveColor, fontWeight: activeTab === 'add' ? 'bold' : 'normal' }]}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Icon name={activeTab === 'profile' ? 'person' : 'person-outline'} size={24} color={activeTab === 'profile' ? activeColor : inactiveColor} />
          <Text style={[styles.navText, { color: activeTab === 'profile' ? activeColor : inactiveColor, fontWeight: activeTab === 'profile' ? 'bold' : 'normal' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
