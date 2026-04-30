import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Importando os ícones mágicos do Expo!
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function ListaDeCasas({ setTelaAtual }) {
  // Endereço de uma imagem de casa genérica para testarmos o formato redondo
  const linkImagemCasa = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=250&auto=format&fit=crop';

  return (
    <LinearGradient
      colors={['#F86F03', '#4F7FFF']}
      style={styles.container}
    >
      <StatusBar style="auto" />

      {/* PATINHAS DE FUNDO (Marca d'água) */}
      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />
      <FontAwesome5 name="paw" size={70} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 250, right: 20, transform: [{ rotate: '-30deg' }] }]} />
      <FontAwesome5 name="paw" size={50} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 330, right: 120, transform: [{ rotate: '-15deg' }] }]} />

      <Text style={styles.versao}>v0.01</Text>

      {/* ÁREA PRINCIPAL */}
      <View style={styles.conteudo}>
        
        {/* DUAS COLUNAS */}
        <View style={styles.colunasContainer}>
          
          {/* COLUNA ESQUERDA (Lista de Casas Inteligente) */}
          <View style={styles.colunaEsquerda}>

            <TouchableOpacity style={styles.itemCasa}>
              <Image source={{ uri: linkImagemCasa }} style={styles.imagemCasa} />
              <Text style={styles.textoCasa}>Minha casa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemCasa}>
              <Image source={{ uri: linkImagemCasa }} style={styles.imagemCasa} />
              <Text style={styles.textoCasa}>Casa dos avós</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemCasa}>
              <Image source={{ uri: linkImagemCasa }} style={styles.imagemCasa} />
              <Text style={styles.textoCasa}>Casa dos tios</Text>
            </TouchableOpacity>
            
          </View>

          {/* COLUNA DIREITA (Botões de Ação) */}
          <View style={styles.colunaDireita}>
            
            <View style={styles.itemAcao}>
              <Text style={styles.textoAcao}>Nova casa</Text>
              <TouchableOpacity style={styles.botaoCirculo}>
                <Ionicons name="add" size={50} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.itemAcao}>
              <Text style={styles.textoAcao}>Entrar</Text>
              <TouchableOpacity style={styles.botaoCirculo}>
                <Feather name="trash-2" size={40} color="#333" />
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  versao: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  patinha: {
    position: 'absolute',
    zIndex: 0, 
  },
  colunasContainer: {
    flexDirection: 'row', 
    flex: 1,
    zIndex: 1, 
  },
  // --- A MÁGICA DA COLUNA ESQUERDA ACONTECE AQUI ---
  colunaEsquerda: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', // <-- Centraliza o grupo todo no meio da tela verticalmente
    gap: 25, // <-- Cria o espaçamento automático entre as casas
  },
  itemCasa: {
    alignItems: 'center',
    // Apaguei o marginBottom daqui, agora o gap faz esse trabalho!
  },
  imagemCasa: {
    width: 100,
    height: 100,
    borderRadius: 100, 
    borderWidth: 2,
    borderColor: '#333', 
  },
  textoCasa: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  // --- COLUNA DIREITA ---
  colunaDireita: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 160, 
  },
  itemAcao: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textoAcao: {
    color: '#333',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botaoCirculo: {
    width: 100,
    height: 100,
    borderRadius: 100, 
    borderWidth: 5,
    borderColor: '#333', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F86F03'
  }
});