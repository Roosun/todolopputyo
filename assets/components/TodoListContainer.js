import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const TodoListContainer = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  // Lataa muistiinpanot AsyncStoragesta
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };
    loadNotes();
  }, []);

  // Tallenna muistiinpano AsyncStorageen
  const addNote = async () => {
    if (note.trim()) {
      const newNotes = [...notes, note];
      setNotes(newNotes);
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        setNote('');
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  // Poista muistiinpano AsyncStoragesta
  const deleteNote = async (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Muistiinpanot</Text>
      
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Lisää muistiinpano"
        style={styles.input}
      />
      <Button title="Tallenna" onPress={addNote} />

      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.note}>{item}</Text>
            <TouchableOpacity onPress={() => deleteNote(index)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TodoListContainer;
