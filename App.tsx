import React, { useState, useEffect } from 'react';
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
import LoginComponent from './component/login/LoginComponent';
import RegisterComponent from './component/login/RegisterComponent'; // 👈 import your RegisterComponent

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState<'login' | 'register'>('login'); // 👈 new state

  // Simulate auth check
  useEffect(() => {
    const loggedInUser = null;
    setUser(loggedInUser);
  }, []);

  // 👇 If not logged in, decide which screen to show
  if (!user) {
    if (screen === 'login') {
      return (
        <LoginComponent
          onLogin={setUser}
          onCreateAccount={() => setScreen('register')} // 👈 switch to register
        />
      );
    } else {
      return (
        <RegisterComponent
          onRegisterSuccess={() => setScreen('login')} // 👈 go back to login after registration
        />
      );
    }
  }

  // User is logged in → main content
  let content;
  if (activeTab === 'home') {
    content = <SearchComponent isDarkMode={isDarkMode} />;
  } else if (activeTab === 'add') {
    content = <AddComponent isDarkMode={isDarkMode} />;
  } else if (activeTab === 'profile') {
    content = <Profile isDarkMode={isDarkMode} username={user} />;
  }

  const activeColor = '#4CAF50';
  const inactiveColor = isDarkMode ? '#fff' : '#000';
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: safeAreaInsets.top,
          backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
        },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {content}

      {/* Bottom navigation */}
      <View
        style={[
          styles.bottomNav,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' },
        ]}
      >
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Icon
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeTab === 'home' ? activeColor : inactiveColor}
          />
          <Text
            style={[
              styles.navText,
              {
                color: activeTab === 'home' ? activeColor : inactiveColor,
                fontWeight: activeTab === 'home' ? 'bold' : 'normal',
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('add')}>
          <Icon
            name={activeTab === 'add' ? 'add-circle' : 'add-circle-outline'}
            size={24}
            color={activeTab === 'add' ? activeColor : inactiveColor}
          />
          <Text
            style={[
              styles.navText,
              {
                color: activeTab === 'add' ? activeColor : inactiveColor,
                fontWeight: activeTab === 'add' ? 'bold' : 'normal',
              },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Icon
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'profile' ? activeColor : inactiveColor}
          />
          <Text
            style={[
              styles.navText,
              {
                color: activeTab === 'profile' ? activeColor : inactiveColor,
                fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
              },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 16 },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
