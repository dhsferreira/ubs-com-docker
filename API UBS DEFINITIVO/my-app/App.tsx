import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 

import Login from './Telas/Login/Login';
import Cadastro from './Telas/Cadastro/Cadastro';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName=''>
        <Stack.Screen name='Cadastro' component={Cadastro}/>
        <Stack.Screen name='Login' component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}