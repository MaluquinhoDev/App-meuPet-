import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Ícones mágicos do Expo
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function TelaMetasCuidados({ setTelaAtual }) {
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

      {/* TEXTOS DE TÍTULO (Baseados no seu PDF) */}
      <View style={styles.areaTitulo}>
        <Text style={styles.titulo}>Metas de cuidados</Text>
        <Text style={styles.subtitulo}>com seu Pet</Text>
        <Text style={styles.textoAgenda}>e marcar na agenda</Text>
      </View>

      {/* BOTÕES DE DIÁRIO E MENSAL */}
      <View style={styles.areaMetas}>
        
        {/* Botão Diário */}
        <TouchableOpacity style={styles.botaoMeta}>
          <Text style={styles.textoMeta}>3 Diario</Text>
          <Feather name="chevron-right" size={30} color="#CC5A00" />
        </TouchableOpacity>

        {/* Botão Mensal */}
        <TouchableOpacity style={styles.botaoMeta}>
          <Text style={styles.textoMeta}>3 Mensal</Text>
          <Feather name="chevron-right" size={30} color="#CC5A00" />
        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  versao: { position: 'absolute', bottom: 20, left: 20, color: '#333', fontSize: 14, fontWeight: 'bold' },
  
  cabecalho: { marginBottom: 40, zIndex: 1, alignItems: 'flex-start' },
  
  areaTitulo: { alignItems: 'center', marginBottom: 60, zIndex: 1 },
  titulo: { fontSize: 36, fontWeight: '900', color: '#333', textAlign: 'center' },
  subtitulo: { fontSize: 32, fontWeight: '900', color: '#333', textAlign: 'center', marginBottom: 10 },
  textoAgenda: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  
  areaMetas: { gap: 20, zIndex: 1 },
  botaoMeta: { 
    backgroundColor: '#111', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 25, 
    paddingHorizontal: 30, 
    borderRadius: 20 
  },
  textoMeta: { color: '#F86F03', fontSize: 28, fontWeight: 'bold' }
});