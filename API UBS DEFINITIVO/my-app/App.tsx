import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './Telas/Navegacao/Drawer.routes'; // Certifique-se que o caminho está correto

export default function App() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}
