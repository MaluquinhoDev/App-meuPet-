import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function TelaNovoPet({ setTelaAtual }) {
  // Variáveis para guardar os dados do pet
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');
  const [nascimento, setNascimento] = useState('');

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Novo Pet</Text>

      <View style={styles.formContainer}>
        
        {/* CAMPOS DE DIGITAÇÃO BASEADOS NO SEU PDF */}
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#F86F03" value={nome} onChangeText={setNome} />
        
        <TextInput style={styles.input} placeholder="Tipo de pet (ex: Cachorro)" placeholderTextColor="#F86F03" value={tipo} onChangeText={setTipo} />
        
        <TextInput style={styles.input} placeholder="Raça" placeholderTextColor="#F86F03" value={raca} onChangeText={setRaca} />
        
        <TextInput style={styles.input} placeholder="Nascimento" placeholderTextColor="#F86F03" value={nascimento} onChangeText={setNascimento} />

        {/* BOTÃO CRIAR */}
        <TouchableOpacity style={styles.botaoCriar} onPress={() => setTelaAtual('ListaDePets')}>
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>

        {/* BOTÃO CANCELAR */}
        <TouchableOpacity style={[styles.botaoCriar, { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#333' }]} onPress={() => setTelaAtual('ListaDePets')}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>  
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  titulo: { fontSize: 50, fontWeight: '900', textAlign: 'center', marginBottom: 40, color: '#333' },
  formContainer: { gap: 15 },
  input: { backgroundColor: '#333', padding: 15, borderRadius: 1000, fontSize: 18, color: '#F86F03', marginBottom: 10 },
  botaoCriar: { backgroundColor: '#333', padding: 15, borderRadius: 1000, alignItems: 'center', marginTop: 10 },
  textoBotao: { color: '#F86F03', fontSize: 18, fontWeight: 'bold' }
});