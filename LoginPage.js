import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import RegistrationPage from './RegistrationPage';
import { AntDesign } from '@expo/vector-icons';
import AlarmPage from './AlarmPage';
import Parse from 'parse/react-native'; 
import Logo from './Logo'; // Assuming you have a Logo component

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await Parse.User.logIn(username, password);

      if (user) {
        setIsLoggedIn(true);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Error logging in: ' + error.message);
    }
  };

  const handleCreateAccount = () => {
    setShowRegistration(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistration(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.loginContainer}>
          <Logo style={styles.logo} />
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />    
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text style={styles.createAccountText}>Don't have an account? Sign up here</Text>
          </TouchableOpacity>
          <Modal visible={showRegistration} animationType="slide">
            <View style={styles.modalContainer}>
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={styles.closeIcon}
                onPress={handleCloseRegistration}
              />
              <RegistrationPage />
            </View>
          </Modal>
        </View>
      )}
      {isLoggedIn && <AlarmPage onLogout={handleLogout} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: '#485613',
    padding: 20,
  },
  loginContainer: {
    alignItems: 'center',
  },
  logo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#b07c3b",
    backgroundColor: "#b07c3b",
    color: "#fff8d6",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#fff8d6',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 5,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b07c3b',
    textAlign: 'center',
  },
  createAccountText: {
    color: '#fff8d6',
    fontSize: 16,
    paddingTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default LoginPage;
