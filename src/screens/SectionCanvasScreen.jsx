import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Button, Alert, ScrollView } from 'react-native';

const SectionCanvasScreen = ({ route, navigation }) => {
  const { sectionName } = route.params;
  const [postIts, setPostIts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newPostItText, setNewPostItText] = useState('');
  const [editedPostItText, setEditedPostItText] = useState('');
  const [selectedPostIt, setSelectedPostIt] = useState(null);
  const [nextId, setNextId] = useState(1);

  // Agregar nuevo post-it
  const handleAddPostIt = () => {
    if (newPostItText.trim()) {
      setPostIts([...postIts, { id: nextId, text: newPostItText }]);
      setNextId(nextId + 1);
      setNewPostItText('');
      setModalVisible(false);
    }
  };

  // Editar post-it
  const handleEditPostIt = () => {
    if (editedPostItText.trim() && selectedPostIt !== null) {
      setPostIts(postIts.map(postIt =>
        postIt.id === selectedPostIt ? { ...postIt, text: editedPostItText } : postIt
      ));
      setEditedPostItText('');
      setEditModalVisible(false);
      setSelectedPostIt(null); // Ocultar el menú de opciones después de guardar
    }
  };

  // Eliminar post-it
  const handleDeletePostIt = (id) => {
    Alert.alert(
      'Eliminar Post-it',
      '¿Estás seguro de que quieres eliminar este post-it?',
      [
        {
          text: 'Cancelar',
          onPress: () => setSelectedPostIt(null),
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            const updatedPostIts = postIts.filter(postIt => postIt.id !== id);
            setPostIts(updatedPostIts);
            setSelectedPostIt(null);
          },
        },
      ]
    );
  };

  // Duplicar post-it
  const handleDuplicatePostIt = (id) => {
    const postItToDuplicate = postIts.find(postIt => postIt.id === id);
    if (postItToDuplicate) {
      setPostIts([...postIts, { id: nextId, text: postItToDuplicate.text }]);
      setNextId(nextId + 1);
      setSelectedPostIt(null); // Ocultar el menú de opciones después de duplicar
    }
  };

  // Organizar Post-its en filas
  const rows = [];
  let currentRow = [];

  postIts.forEach((postIt, index) => {
    currentRow.push(postIt);
    if (currentRow.length >= 3 || index === postIts.length - 1) {
      rows.push(currentRow);
      currentRow = [];
    }
  });

  // Función para manejar la edición del post-it
  const handlePostItPress = (postIt) => {
    setSelectedPostIt(postIt.id);
    setEditedPostItText(postIt.text);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sectionName}</Text>
      <ScrollView>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item) => (
              <View key={item.id} style={styles.postIt}>
                <TouchableOpacity
                  style={styles.postItContent}
                  onPress={() => handlePostItPress(item)}
                  onLongPress={() => {
                    setSelectedPostIt(item.id);
                  }}
                >
                  <Text>{item.text}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Agregar Post-it</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nuevo Post-it</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu post-it aquí"
            value={newPostItText}
            onChangeText={setNewPostItText}
          />
          <View style={styles.modalButtons}>
            <Button title="Agregar" onPress={handleAddPostIt} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Post-it</Text>
          <TextInput
            style={styles.input}
            placeholder="Edita tu post-it aquí"
            value={editedPostItText}
            onChangeText={setEditedPostItText}
          />
          <View style={styles.modalButtons}>
            <Button title="Guardar" onPress={handleEditPostIt} />
            <Button title="Cancelar" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {selectedPostIt !== null && (
        <View style={styles.optionsMenu}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleDuplicatePostIt(selectedPostIt)}
          >
            <Text style={styles.optionButtonText}>Duplicar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleDeletePostIt(selectedPostIt)}
          >
            <Text style={styles.optionButtonText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setSelectedPostIt(null)}
          >
            <Text style={styles.optionButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  postIt: {
    width: 100,
    height: 100,
    backgroundColor: '#fffbcc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  postItContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  optionsMenu: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    elevation: 10,
    zIndex: 1,
  },
  optionButton: {
    padding: 10,
  },
  optionButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SectionCanvasScreen;