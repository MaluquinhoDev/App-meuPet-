import React, { useState } from 'react';
// 1. Adicionamos o TextInput na importação abaixo
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function TelaDeLogin({ setTelaAtual }) {
  // Variável para a mensagem do topo
  
  // 2. Criamos variáveis de estado para guardar o que o usuário digitar
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <LinearGradient
      colors={['#F86F03', '#4F7FFF']}
      style={styles.container}
    >
      <StatusBar style="auto" />

      <Text style={styles.versao}>v00.1</Text>
      <Text style={styles.titulo}>Meu Pets</Text>


      <View style={styles.botoesContainer}>
        
        {/* CONTAINER LARANJA COM OS INPUTS */}
       
          
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#F86F03"
            value={email}
            onChangeText={setEmail} /* Guarda o texto na variável email */
            keyboardType="email-address" /* Abre o teclado com o "@" */
          />

          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#F86F03"
            value={senha}
            onChangeText={setSenha} /* Guarda o texto na variável senha */
            secureTextEntry={true} /* Esconde a senha com "bolinhas" */
          />

        </View>

        {/* BOTÃO CONTINUAR ABAIXO DO CONTAINER */}
        <TouchableOpacity
          style={styles.botaoContinuar}
          onPress={() => setTelaAtual('Casas')} 
        >
          <Text style={styles.textoBotaoContinuar}>Continuar</Text>
        </TouchableOpacity>

  
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
    gap: 15,
  },
  // Estilo das caixinhas de digitar
  input: {
    textDecorationColor: 'F86F03',
    backgroundColor: '#333', // Fundo branco para contrastar com o laranja
    padding: 15,
    borderRadius: 1000,
    marginBottom: 15, // Dá um espaço entre o input de e-mail e o de senha
    fontSize: 16,
    color: '#F86F03',
  },
  // Estilo do novo botão de continuar
  botaoContinuar: {
    backgroundColor: '#333', // Cinza escuro para destacar do fundo
    padding: 15,
    borderRadius: 1000,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoContinuar: {
    color: '#F86F03', // Letra branca
    fontSize: 18,
    fontWeight: 'bold',
  }
});