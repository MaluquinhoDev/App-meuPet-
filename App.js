import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Importando todas as telas
import TelaDeLogin from './TelaDeLogin';
import TelaDeCadastro from './TelaDeCadastro';
import ListaDeCasas from './ListaDeCasas'; 

export default function App() {
  const [message, setMessage] = useState('Bem-vindo ao MeuPets!');
  const [telaAtual, setTelaAtual] = useState('Principal');

  if (telaAtual === 'Login') {
    return <TelaDeLogin setTelaAtual={setTelaAtual} />; 
  }

  if (telaAtual === 'Cadastro') {
    return <TelaDeCadastro setTelaAtual={setTelaAtual} />;
  }

  // 👇 A REGRA DE OURO QUE ESTAVA FALTANDO OU NÃO FOI SALVA 👇
  if (telaAtual === 'Casas') {
    return <ListaDeCasas setTelaAtual={setTelaAtual} />;
  }

  // Tela Inicial (Menu Principal)
  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.versao}>v00.1</Text>
      <Text style={styles.titulo}>Meu Pets</Text>
      <Text style={styles.message}>{message}</Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoLogin} onPress={() => setTelaAtual('Login')} >
          <Text style={styles.textoBotaoLogin}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCadastrar} onPress={() => setTelaAtual('Cadastro')} >
          <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>  
  );
} 

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30 },
  versao: { position: 'absolute', bottom: 10, left: 15, color: '#333', fontSize: 12, fontWeight: 'bold' },
  titulo: { fontSize: 60, fontWeight: '900', textAlign: 'center', marginBottom: 45, color: '#333' },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333', fontWeight: 'bold' },
  botoesContainer: { marginTop: 20, gap: 15 },
  botaoLogin: { backgroundColor: '#F86F03', padding: 15, borderRadius: 10, alignItems: 'center' },
  textoBotaoLogin: { color: '#333', fontSize: 18, fontWeight: 'bold' },
  botaoCadastrar: { backgroundColor: '#F86F03', padding: 15, borderWidth: 2, borderColor: '#F86F03', borderRadius: 10, alignItems: 'center' },
  textoBotaoCadastrar: { color: '#333', fontSize: 18, fontWeight: 'bold' }
});