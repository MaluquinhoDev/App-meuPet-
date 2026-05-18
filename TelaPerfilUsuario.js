import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function TelaPerfilUsuario({ setTelaAtual, usuarioAtual, pets, notificacoesAtivas, setNotificacoesAtivas }) {
  
  // 👉 NOVA MEMÓRIA LOCAL: Sabe se o submenu de notificações está aberto ou fechado
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  const quantidadePets = pets ? pets.length : 0;

  const handleSair = () => {
    if (Platform.OS === 'web') {
      const confirmou = window.confirm("Deseja sair da sua conta?");
      if (confirmou) setTelaAtual('Login');
    } else {
      Alert.alert("Sair", "Deseja sair da sua conta?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => setTelaAtual('Login'), style: "destructive" }
      ]);
    }
  };

  // 👉 LÓGICA DE EXCLUIR A CONTA!
  const handleExcluirConta = () => {
    const mensagem = "Tem certeza que deseja excluir sua conta permanentemente? Isso apagará todas as suas casas e pets!";
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(mensagem);
      // No futuro, aqui iremos apagar do Banco de Dados MySQL. Por enquanto, enviamos ao Login.
      if (confirmou) setTelaAtual('Login');
    } else {
      Alert.alert("Atenção: Excluir Conta", mensagem, [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim, excluir", onPress: () => setTelaAtual('Login'), style: "destructive" }
      ]);
    }
  };

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />

      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('ListaDePets')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        
        <View style={styles.areaPerfil}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.imagemPerfil} />
          <Text style={styles.nomeUsuario}>{usuarioAtual?.nome || 'Usuário'}</Text>
          
          <View style={styles.caixaInfo}>
            <Text style={styles.textoInfo}><Text style={styles.textoBold}>ID da conta:</Text> {usuarioAtual?.id}</Text>
            <Text style={styles.textoInfo}><Text style={styles.textoBold}>Data de criação:</Text> 18/05/2026</Text>
            <Text style={styles.textoInfo}><Text style={styles.textoBold}>Quantidade de pets:</Text> {quantidadePets}</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          
          {/* 👉 MENU DE NOTIFICAÇÕES (Expansível!) */}
          <TouchableOpacity 
            style={[styles.itemMenu, mostrarNotificacoes && { borderBottomWidth: 0 }]} 
            onPress={() => setMostrarNotificacoes(!mostrarNotificacoes)}
          >
            <Feather name="bell" size={24} color="#FFF" />
            <Text style={styles.textoMenu}>Notificações</Text>
            <Feather name={mostrarNotificacoes ? "chevron-down" : "chevron-right"} size={24} color="#FFF" style={styles.setinha} />
          </TouchableOpacity>

          {/* O SUBMENU DE CONFIGURAR APARECE AQUI SE CLICARMOS EM NOTIFICAÇÕES */}
          {mostrarNotificacoes && (
            <View style={styles.areaSubMenu}>
              <Text style={styles.textoSubMenu}>Receber alertas de compromissos?</Text>
              
              <View style={styles.botoesToggle}>
                <TouchableOpacity 
                  style={[styles.botaoToggle, notificacoesAtivas && styles.botaoToggleAtivo]} 
                  onPress={() => setNotificacoesAtivas(true)}
                >
                  <Text style={[styles.textoToggle, notificacoesAtivas && styles.textoToggleAtivo]}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.botaoToggle, !notificacoesAtivas && styles.botaoToggleAtivo]} 
                  onPress={() => setNotificacoesAtivas(false)}
                >
                  <Text style={[styles.textoToggle, !notificacoesAtivas && styles.textoToggleAtivo]}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.itemMenu}>
            <Feather name="file-text" size={24} color="#FFF" />
            <Text style={styles.textoMenu}>Termos de uso</Text>
            <Feather name="chevron-right" size={24} color="#FFF" style={styles.setinha} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Feather name="help-circle" size={24} color="#FFF" />
            <Text style={styles.textoMenu}>Ajuda e Feedback</Text>
            <Feather name="chevron-right" size={24} color="#FFF" style={styles.setinha} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemMenu}>
            <Feather name="user-plus" size={24} color="#FFF" />
            <Text style={styles.textoMenu}>Convidar amigos</Text>
            <Feather name="chevron-right" size={24} color="#FFF" style={styles.setinha} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.itemMenu, { borderBottomWidth: 0 }]} onPress={handleSair}>
            <Feather name="log-out" size={24} color="#CC5A00" />
            <Text style={[styles.textoMenu, { color: '#CC5A00' }]}>Sair da conta</Text>
          </TouchableOpacity>
        </View>

        {/* 👉 BOTÃO DE EXCLUIR GANHOU VIDA */}
        <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluirConta}>
            <Feather name="trash-2" size={20} color="#FFF" />
            <Text style={styles.textoExcluir}>Excluir conta</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  cabecalho: { marginBottom: 20, zIndex: 1, alignItems: 'flex-start' },
  scroll: { flex: 1, zIndex: 1 },
  
  areaPerfil: { alignItems: 'center', marginBottom: 30 },
  imagemPerfil: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#333', marginBottom: 15, backgroundColor: '#FFF' },
  nomeUsuario: { fontSize: 32, fontWeight: '900', color: '#333', marginBottom: 15 },
  
  caixaInfo: { backgroundColor: 'rgba(0,0,0,0.1)', padding: 15, borderRadius: 15, width: '100%', borderWidth: 2, borderColor: '#333' },
  textoInfo: { fontSize: 16, color: '#333', marginBottom: 8 },
  textoBold: { fontWeight: 'bold' },

  menuContainer: { backgroundColor: '#333', borderRadius: 20, padding: 10, borderWidth: 2, borderColor: '#111' },
  itemMenu: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#555' },
  textoMenu: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginLeft: 15 },
  setinha: { marginLeft: 'auto' },

  // Estilos do Submenu de Notificações
  areaSubMenu: { backgroundColor: '#222', padding: 20, borderRadius: 15, marginHorizontal: 15, marginBottom: 15, borderWidth: 2, borderColor: '#555' },
  textoSubMenu: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  botoesToggle: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
  botaoToggle: { backgroundColor: '#333', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 10, borderWidth: 2, borderColor: '#555' },
  botaoToggleAtivo: { backgroundColor: '#CC5A00', borderColor: '#FFF' },
  textoToggle: { color: '#AAA', fontWeight: 'bold', fontSize: 16 },
  textoToggleAtivo: { color: '#FFF' },

  botaoExcluir: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111', padding: 15, borderRadius: 100, marginTop: 30, borderWidth: 2, borderColor: '#CC5A00' },
  textoExcluir: { fontSize: 18, fontWeight: 'bold', color: '#CC5A00', marginLeft: 10 }
});