import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { StatusBar } from 'expo-status-bar';

// Importando todas as telas do nosso app!
import TelaDeLogin from './TelaDeLogin'; 
import TelaDeCadastro from './TelaDeCadastro'; 
import ListaDeCasas from './ListaDeCasas';
import TelaNovaCasa from './TelaNovaCasa'; 
import TelaExcluirCasa from './TelaExcluirCasa'; 
import ListaDePets from './ListaDePets'; 
import TelaNovoPet from './TelaNovoPet'; 
import TelaPerfilPet from './TelaPerfilPet'; 
import TelaAgendar from './TelaAgendar'; 
import TelaMetasCuidados from './TelaMetasCuidados'; 
import TelaPerfilUsuario from './TelaPerfilUsuario'; // <-- A NOSSA ÚLTIMA TELA AQUI!

export default function App() { 
  const [message, setMessage] = useState('Bem-vindo ao MeuPets!'); 
  const [telaAtual, setTelaAtual] = useState('Principal');

  // =========================================================
  // 🚨 REGRAS DE NAVEGAÇÃO (Roteamento das Telas)
  // =========================================================
  if (telaAtual === 'Login') { return <TelaDeLogin setTelaAtual={setTelaAtual} />; }
  if (telaAtual === 'Cadastro') { return <TelaDeCadastro setTelaAtual={setTelaAtual} />; }
  if (telaAtual === 'Casas') { return <ListaDeCasas setTelaAtual={setTelaAtual} />; }
  if (telaAtual === 'NovaCasa') { return <TelaNovaCasa setTelaAtual={setTelaAtual} />; }
  if (telaAtual === 'ExcluirCasa') { return <TelaExcluirCasa setTelaAtual={setTelaAtual} />; } 
  if (telaAtual === 'ListaDePets') { return <ListaDePets setTelaAtual={setTelaAtual} />; } 
  if (telaAtual === 'NovoPet') { return <TelaNovoPet setTelaAtual={setTelaAtual} />; } 
  if (telaAtual === 'PerfilPet') { return <TelaPerfilPet setTelaAtual={setTelaAtual} />; } 
  if (telaAtual === 'Agendar') { return <TelaAgendar setTelaAtual={setTelaAtual} />; } 
  if (telaAtual === 'MetasCuidados') { return <TelaMetasCuidados setTelaAtual={setTelaAtual} />; } 
  if (telaAtual === 'PerfilUsuario') { return <TelaPerfilUsuario setTelaAtual={setTelaAtual} />; } // <-- REGRA PARA ABRIR O MENU DE CONFIGURAÇÕES!

  // =========================================================
  // TELA INICIAL (Menu Principal com Login e Cadastro)
  // =========================================================
  return ( 
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}> 
      <StatusBar style="auto" /> 
      <Text style={styles.versao}>v00.1</Text> 
      <Text style={styles.titulo}>Meu Pets</Text> 
      <Text style={styles.message}>{message}</Text>

      {/* Botões do Menu Principal */}
      <View style={styles.botoesContainer}> 
        <TouchableOpacity style={styles.botaoLogin} onPress={() => setTelaAtual('Login')}> 
          <Text style={styles.textoBotaoLogin}>Login</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCadastrar} onPress={() => setTelaAtual('Cadastro')}> 
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