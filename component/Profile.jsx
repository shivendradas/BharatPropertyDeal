import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const Profile = ({ isDarkMode, username }) => {
  const styles = makeStyles(isDarkMode);

  const onLogout = () => {
    console.log('User logged out');
  };

  const onLogin = () => {
    console.log('Navigate to login');
  };

  return (
    <View style={styles.container}>
      {!username ? (
        <Button title="Login" onPress={onLogin} />
      ) : (
        <>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.loggedInText}>Logged in as {username.email}</Text>
          <Image
            source={{ uri: 'https://example.com/avatar.png' }}
            style={styles.avatar}
          />
          <Button title="Logout" onPress={onLogout} />
        </>
      )}
    </View>
  );
};

const makeStyles = (isDarkMode = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#0f1724' : '#f0f4f7',
    },
    welcome: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDarkMode ? '#ffffff' : '#111827',
    },
    loggedInText: {
      fontSize: 18,
      marginBottom: 20,
      color: isDarkMode ? '#cbd5e1' : '#374151',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: isDarkMode ? '#334155' : 'transparent',
    },
  });

export default Profile;
