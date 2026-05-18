import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// 👉 Recebe o usuarioAtual aqui!
export default function TelaNovaCasa({ setTelaAtual, casas, setCasas, usuarioAtual }) {
  const [nomeDaCasa, setNomeDaCasa] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const escolherImagem = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissao.granted === false) {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 1, 1 ], 
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagemSelecionada(resultado.assets[ 0 ].uri); 
    }
  };

  const handleCriarCasa = () => {
    if (nomeDaCasa.trim() === '') {
      alert('Digite o nome da casa!');
      return;
    }

    const imagemFinal = imagemSelecionada ? imagemSelecionada : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=250&auto=format&fit=crop';

    const novaCasa = {
      id: Math.random().toString(),
      nome: nomeDaCasa,
      imagem: imagemFinal,
      // 👉 MÁGICA DE PERMISSÃO: Quem cria vira o Admin!
      adminId: usuarioAtual.id
    };

    setCasas([...casas, novaCasa]);
    setNomeDaCasa('');
    setTelaAtual('Casas');
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

      <Text style={styles.titulo}>Nova Casa</Text>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.areaFoto}>
          <TouchableOpacity style={styles.bolinhaBotao} onPress={escolherImagem}>
            {imagemSelecionada ? (
              <Image source={{ uri: imagemSelecionada }} style={styles.imagemPreview} />
            ) : (
              <View style={styles.placeholderFoto}>
                <Feather name="camera" size={40} color="#333" />
                <Text style={styles.textoFoto}>Adicionar</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Casa dos avós"
          placeholderTextColor="rgba(248, 111, 3, 0.5)"
          value={nomeDaCasa}
          onChangeText={setNomeDaCasa}
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={handleCriarCasa}>
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  cabecalho: { marginBottom: 10, zIndex: 1, alignItems: 'flex-start' },
  titulo: { fontSize: 45, fontWeight: '900', textAlign: 'center', marginBottom: 40, color: '#333' },
  formContainer: { flex: 1, zIndex: 1 },
  areaFoto: { alignItems: 'center', marginBottom: 25 },
  bolinhaBotao: { width: 140, height: 140, borderRadius: 70, backgroundColor: '#CC5A00', borderWidth: 4, borderColor: '#333', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  imagemPreview: { width: '100%', height: '100%' },
  placeholderFoto: { alignItems: 'center' },
  textoFoto: { color: '#333', fontWeight: 'bold', marginTop: 5 },
  label: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 15, marginBottom: 5 },
  input: { backgroundColor: '#333', padding: 15, borderRadius: 20, fontSize: 18, color: '#F86F03', marginBottom: 25 },
  botaoSalvar: { backgroundColor: '#111', padding: 15, borderRadius: 1000, alignItems: 'center' },
  textoBotao: { color: '#CC5A00', fontSize: 18, fontWeight: 'bold' }
});