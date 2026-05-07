import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Ícones mágicos
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function ListaDePets({ setTelaAtual }) {
  // Imagens genéricas para simular o seu design
  const linkImagemCasa = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=250&auto=format&fit=crop';
  const linkImagemPet = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=250&auto=format&fit=crop'; 

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      {/* PATINHAS DE FUNDO */}
      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />
      <FontAwesome5 name="paw" size={70} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 250, right: 20, transform: [{ rotate: '-30deg' }] }]} />
      <FontAwesome5 name="paw" size={50} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 330, right: 120, transform: [{ rotate: '-15deg' }] }]} />

      <Text style={styles.versao}>v0.01</Text>

      {/* 1. CABEÇALHO */}
      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.infoCasa} onPress={() => setTelaAtual('Casas')}>
          <Text style={styles.textoCasaAtual}>Casa atual:</Text>
          <Image source={{ uri: linkImagemCasa }} style={styles.imagemCasaMini} />
          <Text style={styles.textoNomeCasa}>Minha casa</Text>
        </TouchableOpacity>

        {/* 👇 AQUI ESTÁ A CORREÇÃO! AGORA O MENU DA LISTA DE PETS TAMBÉM ABRE O PERFIL DO USUÁRIO 👇 */}
        <TouchableOpacity onPress={() => setTelaAtual('PerfilUsuario')}>
          <Feather name="menu" size={40} color="#CC5A00" style={{ marginTop: 10 }} />
        </TouchableOpacity>
      </View>

      {/* 2. BARRA DE TÍTULO / BUSCA */}
      <View style={styles.barraPesquisa}>
        <Text style={styles.textoBarra}>Informações de pet</Text>
        <Feather name="search" size={24} color="#333" />
      </View>

      {/* 3. ÁREA DOS PETS */}
      <View style={styles.areaPets}>

        {/* PET 1 - ABRINDO O PERFIL DO PET */}
        <TouchableOpacity 
          style={styles.itemPet}
          onPress={() => setTelaAtual('PerfilPet')} 
        >
          <Image source={{ uri: linkImagemPet }} style={styles.imagemPet} />
          <Text style={styles.textoPet}>Pets</Text>
        </TouchableOpacity>

        {/* BOTÃO ADICIONAR NOVO PET */}
        <TouchableOpacity 
          style={styles.botaoAdicionarPet}
          onPress={() => setTelaAtual('NovoPet')} 
        >
          <Ionicons name="add" size={60} color="#333" />
        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  patinha: { position: 'absolute', zIndex: 0 },
  versao: { position: 'absolute', bottom: 20, left: 20, color: '#333', fontSize: 14, fontWeight: 'bold' },

  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 60, paddingHorizontal: 25, zIndex: 1 },
  infoCasa: { alignItems: 'flex-start' },
  textoCasaAtual: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  imagemCasaMini: { width: 70, height: 70, borderRadius: 50, borderWidth: 2, borderColor: '#333', marginBottom: 5 },
  textoNomeCasa: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  barraPesquisa: { backgroundColor: '#CC5A00', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 35, marginTop: 80, paddingVertical: 15, paddingHorizontal: 25, borderRadius: 100, zIndex: 1 },
  textoBarra: { fontSize: 20, fontWeight: 'bold', color: '#333' },

  areaPets: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 100, gap: 40, zIndex: 1 },
  itemPet: { alignItems: 'center' },
  imagemPet: { width: 110, height: 110, borderRadius: 100 },
  textoPet: { fontSize: 18, fontWeight: 'bold', color: '#D1D1D1', marginTop: 10 },
  botaoAdicionarPet: { width: 110, height: 110, borderRadius: 100, backgroundColor: '#CC5A00', borderWidth: 4, borderColor: '#333', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }
});