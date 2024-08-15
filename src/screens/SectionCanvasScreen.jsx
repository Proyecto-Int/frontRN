// SectionCanvasScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from 'react-native';
import { getPostItsByCanvasId, createPostIt, updatePostIt, deletePostIt } from '../services/postItService'; // Asegúrate de que esta ruta sea correcta

const SectionCanvasScreen = ({ route, navigation }) => {
  const { sectionName } = route.params;
  const [postIts, setPostIts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newPostItText, setNewPostItText] = useState('');
  const [selectedPostIt, setSelectedPostIt] = useState(null);

  useEffect(() => {
    const fetchPostIts = async () => {
      try {
        const postItsData = await getPostItsByCanvasId(sectionName); // Cambia esto si es necesario
        setPostIts(postItsData);
      } catch (error) {
        console.error('Failed to fetch post-its:', error);
      }
    };

    fetchPostIts();
  }, [sectionName]);

  const handleCreatePostIt = async () => {
    try {
      const newPostIt = { text: newPostItText };
      await createPostIt(sectionName, newPostIt);
      setPostIts([...postIts, newPostIt]);
      setNewPostItText('');
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to create post-it:', error);
    }
  };

  const handleEditPostIt = async () => {
    try {
      await updatePostIt(selectedPostIt.id, { text: newPostItText });
      setPostIts(postIts.map(postIt => postIt.id === selectedPostIt.id ? { ...postIt, text: newPostItText } : postIt));
      setNewPostItText('');
      setEditModalVisible(false);
    } catch (error) {
      console.error('Failed to update post-it:', error);
    }
  };

  const handleDeletePostIt = async (postItId) => {
    try {
      await deletePostIt(postItId);
      setPostIts(postIts.filter(postIt => postIt.id !== postItId));
    } catch (error) {
      console.error('Failed to delete post-it:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sectionName}</Text>
      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.createButtonText}>Crear Nuevo Post-It</Text>
      </TouchableOpacity>
      <ScrollView>
        {postIts.map((postIt, index) => (
          <View key={index} style={styles.postItContainer}>
            <Text>{postIt.text}</Text>
            <TouchableOpacity onPress={() => { setSelectedPostIt(postIt); setEditModalVisible(true); }}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePostIt(postIt.id)}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nuevo Post-It</Text>
          <TextInput
            style={styles.input}
            placeholder="Contenido del Post-It"
            value={newPostItText}
            onChangeText={setNewPostItText}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleCreatePostIt}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Post-It</Text>
          <TextInput
            style={styles.input}
            placeholder="Contenido del Post-It"
            value={newPostItText}
            onChangeText={setNewPostItText}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleEditPostIt}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
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
    marginBottom: 15,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  postItContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButton: {
    color: '#007bff',
    marginTop: 10,
  },
  deleteButton: {
    color: '#dc3545',
    marginTop: 10,
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

export default SectionCanvasScreen;
