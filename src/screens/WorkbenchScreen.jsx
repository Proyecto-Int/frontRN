import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const WorkbenchScreen = ({ route, navigation }) => {
  const { name: mapName, description } = route.params || {};

  return (
    <View style={styles.container}>
      {mapName && <Text style={styles.title}>{mapName}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <TouchableOpacity 
          style={styles.section} 
          onPress={() => navigation.navigate('SectionCanvasScreen', { sectionName: '¿Qué piensa y siente?' })}
        >
          <Text style={styles.sectionTitle}>¿Qué piensa y siente?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.section} 
          onPress={() => navigation.navigate('SectionCanvasScreen', { sectionName: '¿Qué ve?' })}
        >
          <Text style={styles.sectionTitle}>¿Qué ve?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.section} 
          onPress={() => navigation.navigate('SectionCanvasScreen', { sectionName: '¿Qué dice y hace?' })}
        >
          <Text style={styles.sectionTitle}>¿Qué dice y hace?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.section} 
          onPress={() => navigation.navigate('SectionCanvasScreen', { sectionName: '¿Qué oye?' })}
        >
          <Text style={styles.sectionTitle}>¿Qué oye?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.section} 
          onPress={() => navigation.navigate('SectionCanvasScreen', { sectionName: 'Esfuerzos' })}
        >
          <Text style={styles.sectionTitle}>Esfuerzos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.section} 
          onPress={() => navigation.navigate('SectionCanvasScreen', { sectionName: 'Beneficios' })}
        >
          <Text style={styles.sectionTitle}>Beneficios</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.menu}>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => { /* Implement Save functionality */ }}
        >
          <Text style={styles.menuButtonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => { /* Implement Download functionality */ }}
        >
          <Text style={styles.menuButtonText}>Descargar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => { /* Implement Send functionality */ }}
        >
          <Text style={styles.menuButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  section: {
    width: '48%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  menuButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkbenchScreen;
