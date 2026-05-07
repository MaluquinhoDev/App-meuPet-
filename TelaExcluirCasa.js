import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Usando os ícones mágicos do Expo
import { Feather } from '@expo/vector-icons';

export default function TelaExcluirCasa({ setTelaAtual }) {
  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Ícone de Alerta */}
      <Feather name="alert-triangle" size={80} color="#333" style={{ marginBottom: 20 }} />
      
      <Text style={styles.titulo}>Excluir Casa</Text>
      
      <Text style={styles.mensagem}>
        Tem certeza que deseja excluir esta casa? Todos os pets e rotinas vinculados a ela poderão ser perdidos.
      </Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity 
          style={styles.botaoExcluir} 
          onPress={() => setTelaAtual('Casas')} 
        >
          <Text style={styles.textoBotaoExcluir}>Sim, Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoCancelar} 
          onPress={() => setTelaAtual('Casas')} 
        >
          <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  titulo: {
    fontSize: 40,
    fontWeight: '900',
    color: '#333',
    marginBottom: 15,
  },
  mensagem: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  botoesContainer: {
    width: '100%',
    gap: 15,
  },
  botaoExcluir: {
    backgroundColor: '#333', 
    padding: 15,
    borderRadius: 1000,
    alignItems: 'center',
  },
  textoBotaoExcluir: {
    color: '#F86F03', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    backgroundColor: '#333',
    padding: 15,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 1000,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#F86F03',
    fontSize: 18,
    fontWeight: 'bold',
  }
});