import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebaseConfig';  // Firebase auth
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const TodoListContainer = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [userId, setUserId] = useState(null);

  // Haetaan kirjautuneen käyttäjän UID
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      loadNotes(currentUser.uid); // Ladataan muistiinpanot kyseiselle käyttäjälle
    }
  }, [auth.currentUser]);

  // Lataa muistiinpanot AsyncStoragesta käyttäjän UID:n perusteella
  const loadNotes = async (userId) => {
    try {
      const savedNotes = await AsyncStorage.getItem(`notes_${userId}`);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  // Tallenna muistiinpano AsyncStorageen käyttäjän UID:n perusteella
  const addNote = async () => {
    if (note.trim() && userId) {
      const newNotes = [...notes, note];
      setNotes(newNotes);
      try {
        await AsyncStorage.setItem(`notes_${userId}`, JSON.stringify(newNotes));
        setNote('');
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  // Poista muistiinpano AsyncStoragesta käyttäjän UID:n perusteella
  const deleteNote = async (index) => {
    if (userId) {
      const newNotes = notes.filter((_, i) => i !== index);
      setNotes(newNotes);
      try {
        await AsyncStorage.setItem(`notes_${userId}`, JSON.stringify(newNotes));
      } catch (error) {
        console.error('Error deleting note:', error);
      }
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
