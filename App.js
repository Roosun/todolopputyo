import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './assets/config/firebaseConfig';
import { View, Text } from 'react-native';
import LoginScreen from './assets/components/LoginScreen';
import styles from './assets/styles/styles';
import TodoListContainer from './assets/components/TodoListContainer';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'TodoList' : 'Login'}>
        
        <Stack.Screen name="Login" component={LoginScreen} />
        
        <Stack.Screen name="TodoList" component={TodoListContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}