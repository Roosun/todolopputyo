import React from 'react';
import { View, Text } from 'react-native';
import TodoList from './assets/components/TodoList';
import styles from './assets/styles/styles';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Muistiinpanot</Text>
      <TodoList />
    </View>
  );
}