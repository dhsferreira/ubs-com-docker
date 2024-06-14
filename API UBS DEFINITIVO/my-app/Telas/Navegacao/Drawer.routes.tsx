import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../Login/Login'; // Verifique o caminho correto
import CadastroScreen from '../Cadastro/Cadastro'; // Verifique o caminho correto
import NoticiasScreen from '../Noticias/telaNoticias'; // Verifique o caminho correto
import CustomDrawerContent from './CustomDrawerContent'; // Importa o novo componente
import { Ionicons } from '@expo/vector-icons'; // Importando ícones do Expo

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          drawerLabel: 'Login',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
           swipeEnabled: false, // Desativa a abertura do drawer
        }}
      />
      <Drawer.Screen
        name="Cadastro"
        component={CadastroScreen}
        options={{
          drawerLabel: 'Cadastro',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
          swipeEnabled: false, // Desativa a abertura do drawer
        }}
      />
      <Drawer.Screen
        name="Noticias"
        component={NoticiasScreen}
        options={{
          drawerLabel: 'Noticias',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {/* Adicione mais telas conforme necessário */}
    </Drawer.Navigator>
  );
}
