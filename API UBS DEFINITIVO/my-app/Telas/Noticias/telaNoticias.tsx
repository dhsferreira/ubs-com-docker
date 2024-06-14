import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { styles } from './noticiasStyles';

const images = [
  { src: require('../assets/noticia1.png'), text: 'ARAUCÁRIA: UBS Industrial aumenta capacidade de atendimento' },
  { src: require('../assets/noticia2.png'), text: 'Estudantes de Medicina realizam ações práticas na comunidade' },
  { src: require('../assets/noticia3.png'), text: 'Jardim Antártica recebe nova UBS com capacidade para mais de 3,3 mil consultas médicas por mês' },
  { src: require('../assets/noticia4.png'), text: 'Santarém 361 anos: UBS da Família é inaugurada no bairro Jutaí e vai beneficiar mais de 8 mil moradores' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftButton} onPress={openDrawer}>
          <Image
            source={require('../assets/3 linhas.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/ubsLogo.png')}
          style={styles.centerImage}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={item.src} style={styles.image} />
            <Text style={styles.imageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
