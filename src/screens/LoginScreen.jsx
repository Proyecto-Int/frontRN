// LoginScreen.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { signin, signup } from '../services/authService'; // Asegúrate de que esta ruta sea correcta
import ModalRegister from '../components/ModalRegister'; // Ruta correcta
import ModalRecoverPassword from '../components/ModalRecoverPassword'; // Ruta correcta

const LoginScreen = ({ navigation }) => {
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [modalRecoverPasswordVisible, setModalRecoverPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signin(username, password);
      navigation.navigate('MenuScreen');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empat-e</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalRegisterVisible(true)}>
        <Text style={styles.link}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalRecoverPasswordVisible(true)}>
        <Text style={styles.link}>Recuperar Contraseña</Text>
      </TouchableOpacity>
      <ModalRegister
        visible={modalRegisterVisible}
        onClose={() => setModalRegisterVisible(false)}
      />
      <ModalRecoverPassword
        visible={modalRecoverPasswordVisible}
        onClose={() => setModalRecoverPasswordVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007bff',
    marginTop: 10,
  },
});

export default LoginScreen;
