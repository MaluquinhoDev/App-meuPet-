import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';



export default function TelaNovaCasa({ setTelaAtual }) {
  // Variáveis para guardar o nome e a senha da casa
  const [nomeCasa, setNomeCasa] = useState('');
  const [senhaCasa, setSenhaCasa] = useState('');

  return (
    <LinearGradient
      colors={['#F86F03', '#4F7FFF']}
      style={styles.container}
    >
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Criar Casa</Text>

      <View style={styles.formContainer}>
        
        {/* INPUT DE NOME */}
        <TextInput
          style={styles.input}
          placeholder="Nome da casa"
          placeholderTextColor="#F86F03"
          value={nomeCasa}
          onChangeText={setNomeCasa} 
        />

        {/* INPUT DE SENHA */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#F86F03"
          value={senhaCasa}
          onChangeText={setSenhaCasa} 
          secureTextEntry={true} /* Esconde a senha */
        />

        {/* BOTÃO CRIAR */}
        <TouchableOpacity
          style={styles.botaoCriar}
          onPress={() => setTelaAtual('Casas')} // Volta para a lista de casas ao criar
        >
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>

        {/* BOTÃO CANCELAR/VOLTAR (Opcional, para você não ficar preso) */}
        <TouchableOpacity
          style={[styles.botaoCriar, { backgroundColor: '#333', borderWidth: 2, borderColor: '#333' }]}
          onPress={() => setTelaAtual('Casas')} 
        >
          <Text style={styles.textoBotao}>Cancelar</Text>
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
  titulo: {
    fontSize: 50,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  formContainer: {
    gap: 15, 
  },
  input: {
    backgroundColor: '#333', 
    padding: 15,
    borderRadius: 1000,
    fontSize: 18,
    color: '#F86F03',
    marginBottom: 10, 
  },
  botaoCriar: {
    backgroundColor: '#333', 
    padding: 15,
    borderRadius: 1000,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#F86F03', 
    fontSize: 18,
    fontWeight: 'bold',
  }
});
