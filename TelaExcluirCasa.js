import React from 'react';
// 👉 1. Adicionamos o 'Platform' na importação
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function TelaExcluirCasa({ setTelaAtual, casas, casaAtual, setCasaAtual, usuarioAtual, onExcluirCasa }) {



  // 👉 2. CORREÇÃO: O alerta agora funciona no Navegador (Web) e no Celular!
  const confirmarExclusao = (idCasa, nomeCasa) => {
    if (Platform.OS === 'web') {
      // Usa o alerta padrão do navegador do PC
      const confirmou = window.confirm(`Tem certeza que deseja excluir a "${nomeCasa}"? Todos os pets dessa casa também serão apagados!`);
      if (confirmou) {
        onExcluirCasa(idCasa);
      }
    } else {
      // Usa o alerta bonito e nativo do aplicativo (Expo Go no celular)
      Alert.alert(
        "Atenção!", 
        `Tem certeza que deseja excluir a "${nomeCasa}"? Todos os pets dessa casa também serão apagados!`, 
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Sim, excluir", onPress: () => onExcluirCasa(idCasa), style: "destructive" }
        ]
      );
    }
  };

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />

      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('Casas')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Excluir Casa</Text>

      <ScrollView style={styles.listaContainer} showsVerticalScrollIndicator={false}>
        {casas.length > 0 ? (
          casas.map((casa) => (
            <View key={casa.id} style={styles.itemCasa}>
              <Image source={{ uri: casa.imagem }} style={styles.imagemCasa} />
              <Text style={styles.textoCasa}>{casa.nome}</Text>
              
              {/* Lógica de permissão do cadeado e lixeira */}
              {casa.adminId === usuarioAtual.id ? (
                <TouchableOpacity style={styles.botaoLixeira} onPress={() => confirmarExclusao(casa.id, casa.nome)}>
                  <Feather name="trash-2" size={30} color="#CC5A00" />
                </TouchableOpacity>
              ) : (
                <View style={styles.botaoSemPermissao}>
                  <Feather name="lock" size={20} color="#666" />
                  <Text style={styles.textoSemPermissao}>Apenas Admin</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.textoVazio}>Nenhuma casa cadastrada.</Text>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  cabecalho: { marginBottom: 10, zIndex: 1, alignItems: 'flex-start' },
  titulo: { fontSize: 40, fontWeight: '900', textAlign: 'center', marginBottom: 30, color: '#333' },
  
  listaContainer: { flex: 1, zIndex: 1 },
  itemCasa: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', padding: 15, borderRadius: 20, marginBottom: 15, borderWidth: 2, borderColor: '#111' },
  imagemCasa: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#CC5A00', marginRight: 15 },
  textoCasa: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#F86F03' },
  
  botaoLixeira: { backgroundColor: '#111', padding: 10, borderRadius: 50, borderWidth: 2, borderColor: '#CC5A00' },
  
  botaoSemPermissao: { alignItems: 'center', padding: 5 },
  textoSemPermissao: { color: '#666', fontSize: 10, fontWeight: 'bold', marginTop: 5 },
  
  textoVazio: { fontSize: 18, color: '#333', fontStyle: 'italic', textAlign: 'center', marginTop: 20 }
});