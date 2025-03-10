import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  const handleLoginRegister = async () => {
    if (isLogin) {
      
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password.');
        return;
      }

      // Api o day
      try {
      
        const response = { ok: true };

        if (response.ok) {
          Alert.alert('Success', 'Login successful!');
          navigation.navigate('Home'); 
        } else {
          Alert.alert('Error', 'Invalid email or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', 'Login failed. Please try again later.');
      }
    } else {
      if (!email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }

      try {
        
        const response = { ok: true };

        if (response.ok) {
          Alert.alert('Success', 'Registration successful! Please login.');
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          Alert.alert('Error', 'Registration failed. Email might be taken.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        Alert.alert('Error', 'Registration failed. Please try again later.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Image
            source={require('./assets/comi_comi_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleLoginRegister}>
            <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
});

export default LoginPage;