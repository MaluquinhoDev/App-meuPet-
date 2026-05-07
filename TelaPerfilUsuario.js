import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function TelaPerfilUsuario({ setTelaAtual }) {
  const linkImagemPerfil = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=250&auto=format&fit=crop'; 

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />
      <FontAwesome5 name="paw" size={70} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 250, right: 20, transform: [{ rotate: '-30deg' }] }]} />
      <FontAwesome5 name="paw" size={50} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 330, right: 120, transform: [{ rotate: '-15deg' }] }]} />

      <Text style={styles.versao}>v0.01</Text>

      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('PerfilPet')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>
        <Text style={styles.tituloSecao}>Perfil</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        <View style={styles.areaInfo}>
          <Image source={{ uri: linkImagemPerfil }} style={styles.imagemPerfil} />
          
          <View style={styles.caixaTextos}>
            <Text style={styles.textoInfo}><Text style={styles.negrito}>ID: </Text>001458</Text>
            <Text style={styles.textoInfo}><Text style={styles.negrito}>Data de criação: </Text>10/10/2023</Text>
            <Text style={styles.textoInfo}><Text style={styles.negrito}>Quantidade de pets: </Text>1</Text>
            <Text style={styles.textoInfo}><Text style={styles.negrito}>Criado em: </Text>10/10/2023</Text>
          </View>
        </View>

        <View style={styles.areaMenu}>
          
          <TouchableOpacity style={styles.botaoMenu}>
            <Text style={styles.textoBotaoMenu}>Id da conta</Text>
            <Feather name="chevron-right" size={24} color="#CC5A00" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu}>
            <Text style={styles.textoBotaoMenu}>Notificações</Text>
            <Feather name="chevron-right" size={24} color="#CC5A00" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu}>
            <Text style={styles.textoBotaoMenu}>Termos de uso</Text>
            <Feather name="chevron-right" size={24} color="#CC5A00" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu}>
            <Text style={styles.textoBotaoMenu}>Ajuda e Feedback</Text>
            <Feather name="chevron-right" size={24} color="#CC5A00" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoMenu}>
            <Text style={styles.textoBotaoMenu}>Convidar amigos</Text>
            <Feather name="chevron-right" size={24} color="#CC5A00" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botaoMenu, { borderColor: '#333', borderWidth: 2, backgroundColor: 'transparent' }]} onPress={() => setTelaAtual('Principal')}>
            <Text style={[styles.textoBotaoMenu, { color: '#333' }]}>Excluir conta</Text>
            <Feather name="trash-2" size={24} color="#333" />
          </TouchableOpacity>

        </View>
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  versao: { position: 'absolute', bottom: 20, left: 20, color: '#333', fontSize: 14, fontWeight: 'bold' },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 30, zIndex: 1 },
  tituloSecao: { fontSize: 30, fontWeight: '900', color: '#333' },
  areaInfo: { alignItems: 'center', marginBottom: 30, paddingHorizontal: 30, zIndex: 1 },
  imagemPerfil: { width: 120, height: 120, borderRadius: 100, borderWidth: 4, borderColor: '#333', marginBottom: 20 },
  caixaTextos: { backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 20, borderRadius: 15, width: '100%' },
  textoInfo: { fontSize: 16, color: '#333', marginBottom: 5 },
  negrito: { fontWeight: '900' },
  areaMenu: { paddingHorizontal: 30, gap: 15, zIndex: 1 },
  botaoMenu: { backgroundColor: '#111', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderRadius: 15 },
  textoBotaoMenu: { color: '#F86F03', fontSize: 18, fontWeight: 'bold' }
});