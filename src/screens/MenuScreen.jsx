import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { getAllCanvases, createCanvas } from '../services/canvasService'; // Asegúrate de que esta ruta sea correcta
import MapItem from '../components/MapItem'; // Ruta correcta

const MenuScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mapName, setMapName] = useState('');
  const [mapDescription, setMapDescription] = useState('');
  const [maps, setMaps] = useState([]);
  const userId = 1; // Aquí debes obtener el ID del usuario de tu contexto o estado global

  useEffect(() => {
    const fetchCanvases = async () => {
      try {
        const canvases = await getAllCanvases();
        if (Array.isArray(canvases)) {
          setMaps(canvases);
        } else {
          console.error('Expected an array but received:', canvases);
        }
      } catch (error) {
        console.error('Failed to fetch canvases:', error);
      }
    };

    fetchCanvases();
  }, []);

  const handleCreateMap = async () => {
    try {
      const newMap = {
        name: mapName,
        description: mapDescription,
        dateCreated: new Date().toISOString(), // Genera la fecha actual en formato ISO 8601
        user: { id: userId }, // Incluye el ID del usuario
      };
      const createdMap = await createCanvas(newMap); // Obtén el mapa creado del backend
      setMaps(prevMaps => [...prevMaps, createdMap]); // Agrega el mapa creado a la lista de mapas
      setMapName('');
      setMapDescription('');
      setModalVisible(false);
      navigation.navigate('WorkbenchScreen', createdMap);
    } catch (error) {
      console.error('Failed to create canvas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.createButtonText}>Crear Nuevo Mapa de Empatía</Text>
      </TouchableOpacity>
      <ScrollView>
        {Array.isArray(maps) && maps.map((map, index) => (
          <MapItem key={index} map={map} onSelect={() => navigation.navigate('WorkbenchScreen', map)} />
        ))}
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Crear Nuevo Mapa de Empatía</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Mapa"
            value={mapName}
            onChangeText={setMapName}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={mapDescription}
            onChangeText={setMapDescription}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleCreateMap}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
