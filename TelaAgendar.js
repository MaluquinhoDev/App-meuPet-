import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Ícones mágicos
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function TelaAgendar({ setTelaAtual }) {
  // Variáveis para guardar o que o usuário digitar
  const [compromisso, setCompromisso] = useState('');
  const [horario, setHorario] = useState('');
  const [observacao, setObservacao] = useState('');

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      {/* PATINHAS DE FUNDO */}
      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />
      <FontAwesome5 name="paw" size={70} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 250, right: 20, transform: [{ rotate: '-30deg' }] }]} />
      <FontAwesome5 name="paw" size={50} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 330, right: 120, transform: [{ rotate: '-15deg' }] }]} />

      <Text style={styles.versao}>v0.01</Text>

      {/* CABEÇALHO (Botão de Voltar para o Perfil) */}
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('PerfilPet')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Agendar</Text>

      {/* FORMULÁRIO DE AGENDAMENTO (Baseado no seu PDF) */}
      <View style={styles.formContainer}>
        
        <Text style={styles.label}>Compromisso:</Text>
        <TextInput 
          style={styles.input} 
          value={compromisso} 
          onChangeText={setCompromisso} 
        />
        
        <Text style={styles.label}>Horário:</Text>
        <TextInput 
          style={styles.input} 
          value={horario} 
          onChangeText={setHorario} 
        />
        
        <Text style={styles.label}>Observação:</Text>
        <TextInput 
          style={[styles.input, { height: 120, textAlignVertical: 'top' }]} // Deixando a caixa maior para observações
          multiline={true} 
          value={observacao} 
          onChangeText={setObservacao} 
        />

        {/* BOTÃO SALVAR / CADASTRAR AGENDA */}
        <TouchableOpacity 
          style={styles.botaoSalvar} 
          onPress={() => setTelaAtual('PerfilPet')} // Ao salvar, volta para o Perfil do Pet
        >
          <Text style={styles.textoBotao}>Confirmar</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>  
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  versao: { position: 'absolute', bottom: 20, left: 20, color: '#333', fontSize: 14, fontWeight: 'bold' },
  
  cabecalho: { marginBottom: 10, zIndex: 1, alignItems: 'flex-start' },
  titulo: { fontSize: 50, fontWeight: '900', textAlign: 'center', marginBottom: 30, color: '#333' },
  
  formContainer: { gap: 5, zIndex: 1 },
  label: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 15, marginBottom: -5 },
  input: { backgroundColor: '#333', padding: 15, borderRadius: 20, fontSize: 18, color: '#F86F03', marginBottom: 15 },
  
  botaoSalvar: { backgroundColor: '#111', padding: 15, borderRadius: 1000, alignItems: 'center', marginTop: 10 },
  textoBotao: { color: '#CC5A00', fontSize: 18, fontWeight: 'bold' }
});