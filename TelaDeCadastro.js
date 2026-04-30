import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function TelaDeCadastro({ setTelaAtual }) {
  // Criamos variáveis de estado para guardar TUDO o que o usuário digitar
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');

  return (
    <LinearGradient
      colors={['#F86F03', '#4F7FFF']}
      style={styles.container}
    >
      <StatusBar style="auto" />

      <Text style={styles.versao}>v00.1</Text>
      <Text style={styles.titulo}>Meu Pets</Text>

      <View style={styles.botoesContainer}>
        
        {/* INPUTS DE CADASTRO */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#F86F03"
          value={nome}
          onChangeText={setNome} 
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          placeholderTextColor="#F86F03"
          value={cpf}
          onChangeText={setCpf} 
          keyboardType="numeric" /* Abre o teclado apenas de números */
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#F86F03"
          value={email}
          onChangeText={setEmail} 
          keyboardType="email-address" /* Abre o teclado com o "@" */
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#F86F03"
          value={senha}
          onChangeText={setSenha} 
          secureTextEntry={true} /* Esconde a senha com "bolinhas" */
        />

        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          placeholderTextColor="#F86F03"
          value={telefone}
          onChangeText={setTelefone} 
          keyboardType="phone-pad" /* Abre o teclado de telefone */
        />

        {/* BOTÃO CADASTRAR ABAIXO DOS INPUTS */}
        <TouchableOpacity
          style={styles.botaoContinuar}
          onPress={() => setTelaAtual('Casas')} 
        >
          <Text style={styles.textoBotaoContinuar}>Continuar</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  versao: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 60,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 45,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  botoesContainer: {
    marginTop: 20,
    gap: 10, // Diminuí um pouco o gap para os 5 inputs caberem bem na tela
  },
  // Estilo das caixinhas de digitar que você enviou
  input: {
    textDecorationColor: 'F86F03',
    backgroundColor: '#333', 
    padding: 15,
    borderRadius: 1000,
    marginBottom: 10, // Diminuí um pouco o espaçamento para caber melhor na tela
    fontSize: 16,
    color: '#F86F03',
  },
  // Estilo do botão de cadastrar
  botaoContinuar: {
    backgroundColor: '#333', 
    padding: 15,
    borderRadius: 1000,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoContinuar: {
    color: '#F86F03', 
    fontSize: 18,
    fontWeight: 'bold',
  }
});