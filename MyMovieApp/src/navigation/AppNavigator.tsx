import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddMovieScreen from '../screens/AddMovieScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies" component={HomeScreen} />
        <Stack.Screen name="AddMovie" component={AddMovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
