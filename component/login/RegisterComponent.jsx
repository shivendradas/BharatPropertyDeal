import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function RegisterComponent({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!email.trim() || !userId.trim() || !password.trim()) {
      setError('Please fill all fields');
      return;
    }

    // Simulate registration logic
    // TODO: Replace with real API call
    Alert.alert('Success', 'Account created successfully!', [
      { text: 'OK', onPress: () => onRegisterSuccess() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CREATE ACCOUNT</Text>

      <Text style={styles.label}>Email address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#B7C8F2"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>User ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Choose a user ID"
        placeholderTextColor="#B7C8F2"
        value={userId}
        onChangeText={setUserId}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B7C8F2"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={handleRegister}>
        <LinearGradient
          colors={['#FF5733', '#FF3380']}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={onRegisterSuccess} // Goes back to login
      >
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222741',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 28,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#243450',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
    width: '80%',
  },
  button: {
    width: '80%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 10,
  },
  loginLink: {
    marginTop: 20,
  },
  loginLinkText: {
    color: '#B7C8F2',
    textDecorationLine: 'underline',
  },
});
