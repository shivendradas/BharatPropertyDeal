import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import Config from '../../config'; // or via environment variable

export default function RegisterComponent({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const payload = { email, userId, password };
      const apiBaseUrl = Config.REACT_APP_API_URL;

      const response = await axios.post(`${apiBaseUrl}/api/registeruser/register`, payload);
      const data = response.data;

      setMessage(data.message || 'Registration successful! Please check your email.');
      Alert.alert('Success', data.message || 'Account created successfully!', [
        { text: 'OK', onPress: onRegisterSuccess },
      ]);
    } catch (error) {
      console.log('Registration error:', error);
      const data = error.response ? error.response.data : {};
      setMessage(data.message || 'Error validating email. Please try again later.');
    } finally {
      setLoading(false);
    }
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

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222741', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#243450', borderRadius: 8, padding: 14, color: '#fff', marginBottom: 12, width: '80%' },
  button: { backgroundColor: '#FF5733', padding: 14, borderRadius: 8, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  message: { color: '#fff', marginTop: 10, textAlign: 'center' },
});
