import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

// 👉 Recebe a memória "casas" e agora o "setCasaAtual"
export default function ListaDeCasas({ setTelaAtual, casas, setCasaAtual }) {
  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />
      
      <Text style={styles.versao}>v0.01</Text>

      <View style={styles.layoutPrincipal}>
        
        {/* COLUNA ESQUERDA: LISTA DINÂMICA DE CASAS */}
        <View style={styles.colunaCasas}>
          <Text style={styles.tituloSecao}>Lista de casas</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            
            {casas.map((casa) => (
              // 👉 A MÁGICA AQUI: Salva a casa clicada antes de mudar de tela!
              <TouchableOpacity 
                key={casa.id} 
                style={styles.itemCasa} 
                onPress={() => { 
                  setCasaAtual(casa); 
                  setTelaAtual('ListaDePets'); 
                }}
              >
                <Image source={{ uri: casa.imagem }} style={styles.imagemCasa} />
                <Text style={styles.textoCasa}>{casa.nome}</Text>
              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>

        {/* COLUNA DIREITA: BOTÕES DE AÇÃO */}
        <View style={styles.colunaBotoes}>
          <View style={styles.itemBotao}>
            <Text style={styles.textoRotulo}>Nova casa</Text>
            <TouchableOpacity style={styles.botaoAcao} onPress={() => setTelaAtual('NovaCasa')}>
              <Feather name="plus" size={50} color="#CC5A00" />
            </TouchableOpacity>
          </View>

          <View style={styles.itemBotao}>
            <Text style={styles.textoRotulo}>Excluir</Text>
            <TouchableOpacity style={styles.botaoAcao} onPress={() => setTelaAtual('ExcluirCasa')}>
              <Feather name="trash-2" size={40} color="#CC5A00" />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  patinha: { position: 'absolute', zIndex: 0 },
  versao: { position: 'absolute', bottom: 20, left: 20, color: '#333', fontSize: 14, fontWeight: 'bold' },
  
  layoutPrincipal: { flexDirection: 'row', flex: 1, zIndex: 1 },
  
  colunaCasas: { flex: 1, alignItems: 'center' },
  tituloSecao: { fontSize: 24, fontWeight: '900', color: '#333', marginBottom: 20 },
  itemCasa: { alignItems: 'center', marginBottom: 30 },
  imagemCasa: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#fff' },
  textoCasa: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 10, textAlign: 'center' },

  colunaBotoes: { width: 120, alignItems: 'center', paddingTop: 50, gap: 40 },
  itemBotao: { alignItems: 'center', gap: 10 },
  textoRotulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  botaoAcao: { width: 90, height: 90, borderRadius: 50, backgroundColor: '#111', borderWidth: 4, borderColor: '#333', justifyContent: 'center', alignItems: 'center' }
});