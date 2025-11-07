import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginComponent = ({ onLogin, onCreateAccount }) => {
  //const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }
    // TODO: Replace with real auth (API call etc)
    // Simulate successful login by returning dummy user object
    const user = { email, name: 'Demo User', rememberMe };
    onLogin(user);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>USER LOGIN</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="EmailID"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.eyeIcon}>
            {showPassword ? '🙈' : '👁️'}
          </Text>
        </Pressable>
      </View>
      {!!error && <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>}
      <View style={styles.row}>
        {/* <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text style={styles.rememberMe}>Remember me</Text> */}
        <TouchableOpacity style={styles.forgotBtn} onPress={() => alert('Forgot password action')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          colors={['#FF5733', '#FF3380']}
          style={styles.loginButton}
        >
          <Text style={styles.loginText}>LOGIN</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.accountPrompt}>Don't have an Account?</Text>
      <TouchableOpacity
        style={styles.createAccountBtn}
        onPress={onCreateAccount}
      >
        <Text style={styles.createAccountText}>Create Account Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232a3b',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
    letterSpacing: 1,
  },
  inputContainer: {
    backgroundColor: '#243450',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
  },
  input: {
    color: '#fff',
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    color: '#999',
    paddingRight: 12,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 24,
  },
  rememberMe: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
  },
  forgotBtn: {
    marginLeft: 'auto',
  },
  forgotText: {
    color: '#a6b1cb',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  loginButton: {
    width: '80%',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 18,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  accountPrompt: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
  },
  createAccountBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    padding: 14,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginComponent;
