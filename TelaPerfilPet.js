import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Importando todos os ícones necessários
import { FontAwesome5, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TelaPerfilPet({ setTelaAtual }) {
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

      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('ListaDePets')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTelaAtual('PerfilUsuario')}>
          <Feather name="menu" size={40} color="#CC5A00" />
        </TouchableOpacity>
      </View>

      {/* FOTO DO PET */}
      <View style={styles.areaFoto}>
        <Image source={{ uri: linkImagemPet }} style={styles.imagemPet} />
      </View>

      {/* LISTA DE ROTINAS */}
      <View style={styles.areaRotina}>
        
        {/* Comida / Hotdog */}
        <View style={styles.itemRotina}>
          <FontAwesome5 name="hotdog" size={50} color="#111" style={styles.iconeRotina} />
          {/* 👇 AQUI ENTRA A MÁGICA PARA ABRIR AS METAS 👇 */}
          <TouchableOpacity style={styles.botaoMais} onPress={() => setTelaAtual('MetasCuidados')}>
            <Feather name="plus" size={24} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Passeio / Coleira */}
        <View style={styles.itemRotina}>
          <MaterialCommunityIcons name="dog-service" size={60} color="#111" style={styles.iconeRotina} />
          {/* 👇 AQUI ENTRA A MÁGICA PARA ABRIR AS METAS 👇 */}
          <TouchableOpacity style={styles.botaoMais} onPress={() => setTelaAtual('MetasCuidados')}>
            <Feather name="plus" size={24} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Saúde / Curativo */}
        <View style={styles.itemRotina}>
          <FontAwesome5 name="band-aid" size={50} color="#111" style={styles.iconeRotina} />
          {/* 👇 AQUI ENTRA A MÁGICA PARA ABRIR AS METAS 👇 */}
          <TouchableOpacity style={styles.botaoMais} onPress={() => setTelaAtual('MetasCuidados')}>
            <Feather name="plus" size={24} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Rosto do Dog / Barra de Progresso */}
        <View style={styles.itemRotina}>
          <MaterialCommunityIcons name="dog" size={60} color="#111" style={styles.iconeRotina} />
          <View style={styles.barraContainer}>
            <View style={styles.barraLinha}></View>
            <View style={styles.barraPonto}></View>
          </View>
        </View>

      </View>

      {/* CARROSSEL DE CALENDÁRIO */}
      <View style={styles.areaCalendario}>
        <TouchableOpacity>
          <Feather name="chevron-left" size={50} color="#111" />
        </TouchableOpacity>

        {/* Caixinhas de Calendário */}
        {[2-5].map((item, index) => (
          <View key={index} style={styles.boxCalendario}>
            <View style={styles.furinhosContainer}>
              <View style={styles.furinho}></View>
              <View style={styles.furinho}></View>
            </View>
            <Text style={styles.textoCalendario}>12</Text>
          </View>
        ))}

        <TouchableOpacity>
          <Feather name="chevron-right" size={50} color="#111" />
        </TouchableOpacity>
      </View>

      {/* BOTÃO AGENDAR */}
      <View style={styles.areaAgendar}>
        <TouchableOpacity style={styles.botaoAgendar} onPress={() => setTelaAtual('Agendar')}>
          <Text style={styles.textoBotaoAgendar}>Agendar</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  patinha: { position: 'absolute', zIndex: 0 },
  versao: { position: 'absolute', bottom: 20, left: 20, color: '#333', fontSize: 14, fontWeight: 'bold' },
  
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 60, paddingHorizontal: 30, zIndex: 1 },
  areaFoto: { paddingHorizontal: 40, marginTop: 10, zIndex: 1 },
  imagemPet: { width: 100, height: 100, borderRadius: 50 },
  
  areaRotina: { marginTop: 30, paddingHorizontal: 60, gap: 20, zIndex: 1 },
  itemRotina: { flexDirection: 'row', alignItems: 'center', gap: 30 },
  iconeRotina: { width: 70, textAlign: 'center' },
  botaoMais: { width: 35, height: 35, borderRadius: 20, backgroundColor: '#CC5A00', justifyContent: 'center', alignItems: 'center' },
  
  barraContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  barraLinha: { height: 4, backgroundColor: '#111', flex: 1 },
  barraPonto: { width: 15, height: 15, borderRadius: 10, backgroundColor: '#CC5A00', marginLeft: -5 },
  
  areaCalendario: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, gap: 8, zIndex: 1 },
  boxCalendario: { backgroundColor: '#111', width: 55, height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingTop: 5 },
  furinhosContainer: { flexDirection: 'row', gap: 15, position: 'absolute', top: -6 },
  furinho: { width: 8, height: 12, backgroundColor: '#111', borderRadius: 5 },
  textoCalendario: { color: '#4F7FFF', fontSize: 24, fontWeight: 'bold' },
  
  areaAgendar: { alignItems: 'center', marginTop: 25, zIndex: 1 },
  botaoAgendar: { backgroundColor: '#111', paddingVertical: 8, paddingHorizontal: 25, borderRadius: 20 },
  textoBotaoAgendar: { color: '#CC5A00', fontWeight: 'bold', fontSize: 16 }
});