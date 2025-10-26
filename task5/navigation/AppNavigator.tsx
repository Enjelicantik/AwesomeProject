import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../StartScreen';
import BottomNavigator from './BottomNavigator';
import Detail from '../screens/Detail';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="StartScreen"
        component={StartScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailPage"
        component={Detail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
