import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import ModalRegister from '../components/ModalRegister';
import ModalRecoverPassword from '../components/ModalRecoverPassword';

const LoginScreen = ({ navigation }) => {
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const [modalRecoverPasswordVisible, setModalRecoverPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login functionality
    navigation.navigate('MenuScreen');
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
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginScreen;
