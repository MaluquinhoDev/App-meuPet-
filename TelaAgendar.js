import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function TelaAgendar({ setTelaAtual, petAtual, agendamentos, setAgendamentos }) {
  const [compromisso, setCompromisso] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [observacao, setObservacao] = useState('');

  const handleAgendar = () => {
    if (compromisso.trim() === '' || data.trim() === '') {
      alert('Preencha pelo menos o compromisso e a data!');
      return;
    }

    // Salva na nossa memória geral do App.js
    const novoAgendamento = {
      id: Math.random().toString(),
      petId: petAtual.id,
      compromisso,
      data,
      horario,
      observacao
    };

    setAgendamentos([...agendamentos, novoAgendamento]);

    // 👉 SIMULA A NOTIFICAÇÃO!
    const mensagemNotificacao = `Agendado com sucesso!\nNós enviaremos uma notificação no dia ${data} às ${horario} para o compromisso: ${compromisso} do ${petAtual.nome}.`;

    if (Platform.OS === 'web') {
      window.alert(mensagemNotificacao);
      setTelaAtual('MetasCuidados');
    } else {
      Alert.alert("Notificação Programada!", mensagemNotificacao, [
        { text: "Ótimo!", onPress: () => setTelaAtual('MetasCuidados') }
      ]);
    }
  };

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />

      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('MetasCuidados')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Novo Compromisso</Text>
      <Text style={styles.subtitulo}>Para o pet: {petAtual?.nome}</Text>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Compromisso:</Text>
        <TextInput style={styles.input} value={compromisso} onChangeText={setCompromisso} placeholder="Ex: Vacina V10" placeholderTextColor="rgba(248, 111, 3, 0.5)" />

        <Text style={styles.label}>Data:</Text>
        <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="Ex: 25/10/2026" placeholderTextColor="rgba(248, 111, 3, 0.5)" />

        <Text style={styles.label}>Horário:</Text>
        <TextInput style={styles.input} value={horario} onChangeText={setHorario} placeholder="Ex: 14:30" placeholderTextColor="rgba(248, 111, 3, 0.5)" />

        <Text style={styles.label}>Observação:</Text>
        <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} value={observacao} onChangeText={setObservacao} placeholder="Ex: Levar a carteirinha" placeholderTextColor="rgba(248, 111, 3, 0.5)" multiline={true} />

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleAgendar}>
          <Text style={styles.textoBotao}>Agendar e Notificar</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} /> 
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  cabecalho: { marginBottom: 10, zIndex: 1, alignItems: 'flex-start' },
  
  titulo: { fontSize: 35, fontWeight: '900', textAlign: 'center', color: '#333' },
  subtitulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#111', marginBottom: 30, fontStyle: 'italic' },
  
  formContainer: { flex: 1, zIndex: 1 },
  label: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 15, marginBottom: 5 },
  input: { backgroundColor: '#333', padding: 15, borderRadius: 20, fontSize: 18, color: '#F86F03', marginBottom: 20 },
  
  botaoSalvar: { backgroundColor: '#111', padding: 15, borderRadius: 1000, alignItems: 'center', marginTop: 10, borderWidth: 2, borderColor: '#CC5A00' },
  textoBotao: { color: '#CC5A00', fontSize: 18, fontWeight: 'bold' }
});