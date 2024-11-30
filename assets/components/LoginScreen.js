import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../assets/config/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('TodoList'); // Siirtyy TodoList-näkymään kirjautumisen jälkeen
    } catch (err) {
      setError('Kirjautuminen epäonnistui. Tarkista sähköposti ja salasana.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kirjaudu sisään</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Sähköposti"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Salasana"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Kirjaudu sisään" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
