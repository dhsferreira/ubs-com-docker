import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import axios from 'axios';
import { styles } from './ConsultasStyles'; // Importe seus estilos aqui

interface Consulta {
  paci_nome: string;
  paci_cpf: string;
  ubs_nome: string;
  area_nome: string;
  horarios_dia: string;
  horarios_horarios: string;
  consul_estatos: string;
}

const Consultas = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState('');
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filteredConsultas, setFilteredConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const dateInputRef = useRef(null);

  const paci_id = 1;

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const fetchConsultas = async (selectedDate?: string) => {
    try {
      let url = `http://192.168.137.1:3000/api/Consulta/${paci_id}`;
      if (selectedDate) {
        url += `?data=${selectedDate}`;
      }
      const response = await axios.get(url);
      const consultasData: Consulta[] = response.data.result;
      setConsultas(consultasData);
      setFilteredConsultas(consultasData);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, [paci_id]);

  const handleFilter = () => {
    setLoading(true);
    fetchConsultas(date.split('/').reverse().join('-'));
  };

  const handleDateSubmit = () => {
    if (dateInputRef.current) {
      dateInputRef.current.getElement().blur();
      handleFilter();
    }
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleFilterOption = (status: string) => {
    closeFilterModal();
    let filtered = [];
    switch (status) {
      case 'agendada':
        filtered = consultas.filter(consulta => consulta.consul_estatos === 'Em espera');
        break;
      case 'realizada':
        filtered = consultas.filter(consulta => consulta.consul_estatos === 'Finalizada');
        break;
      case 'cancelada':
        filtered = consultas.filter(consulta => consulta.consul_estatos === 'Cancelada');
        break;
      case 'todas':
        filtered = consultas;
        break;
      default:
        filtered = consultas;
        break;
    }
    filtered.sort((a, b) => (a.consul_estatos === 'Em andamento' ? -1 : 1));
    setFilteredConsultas(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Primeiro cabeçalho */}
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

      {/* Segundo cabeçalho */}
      <View style={styles.secondHeader}>
        <Text style={styles.smallText}>Você está em Home / Minhas consultas</Text>
        <Text style={styles.largeText}>Minhas consultas</Text>
      </View>

      {/* Campo de pesquisa e botão de filtro */}
      <View style={styles.filterContainer}>
        <TextInputMask
          ref={dateInputRef}
          type={'datetime'}
          options={{ format: 'DD/MM/YYYY' }}
          value={date}
          onChangeText={text => setDate(text)}
          style={styles.dateInput}
          placeholder="Selecione a data"
          placeholderTextColor="#000"
          returnKeyType="done"
          onSubmitEditing={handleDateSubmit}
        />
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Image
            source={require('../assets/filtrar.png')}
            style={styles.filterButtonImage}
          />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de filtro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={closeFilterModal}
      >
        <TouchableWithoutFeedback onPress={closeFilterModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              
              {/* Opções de filtro */}
              <TouchableOpacity style={styles.filterOption} onPress={() => handleFilterOption('todas')}>
                <Text style={styles.filterOptionText}>Todas as Consultas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption} onPress={() => handleFilterOption('agendada')}>
                <Text style={styles.filterOptionText}>Consultas Agendadas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption} onPress={() => handleFilterOption('realizada')}>
                <Text style={styles.filterOptionText}>Consultas Realizadas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption} onPress={() => handleFilterOption('cancelada')}>
                <Text style={styles.filterOptionText}>Consultas Canceladas</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Adicionando ScrollView para os cartões */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredConsultas.map((consulta, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>Nome: {consulta.paci_nome}</Text>
            <Text style={styles.cardText}>UBS: {consulta.ubs_nome}</Text>
            <Text style={styles.cardText}>Data: {consulta.horarios_dia}</Text>
            <Text style={styles.cardText}>Horário: {consulta.horarios_horarios}</Text>
            <Text style={styles.cardText}>Área de Atendimento: {consulta.area_nome}</Text>
            <Text style={styles.cardText}>Status: {consulta.consul_estatos}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Consultas;
