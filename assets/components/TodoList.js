import React, { useState, useEffect } from 'react';
import { TextInput, Button, FlatList, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/styles';

const TodoList = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  // Lataa muistiinpanot AsyncStoragesta, kun komponentti ladataan
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
  const saveNote = async () => {
    if (note.trim()) {
      const newNotes = [...notes, note];
      setNotes(newNotes);
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        setNote(''); // Tyhjennetään input-kenttä
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  return (
    <View style={styles.containerTodo}>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Lisää muistiinpano"
        style={styles.input}
      />
      <Button title="Tallenna" onPress={saveNote} />
      <FlatList
        data={notes}
        renderItem={({ item }) => <Text style={styles.note}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TodoList;
