import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function ListaDePets({ setTelaAtual, pets, casaAtual, setPetAtual }) {
  
  // 👉 1. BANCO DE DADOS MELHORADO (Com descrições únicas e reais para cada animal!)
  const bancoDeRacas = [
    { id: '1', nome: 'Vira-lata (Cachorro)', descricao: 'Cães sem raça definida são únicos, extremamente leais e cheios de amor para dar. Cada um tem uma personalidade especial e costumam ser muito espertos!', expectativa: '12 a 15 anos', problemas: 'Geralmente muito saudáveis (possuem o chamado vigor híbrido).', dica: 'Muito amor, brincadeiras e passeios diários!' },
    { id: '2', nome: 'Vira-lata (Gato)', descricao: 'Gatos SRD são caçadores natos, espertos e se adaptam incrivelmente bem a qualquer ambiente doméstico. São grandes companheiros.', expectativa: '15 a 20 anos', problemas: 'Muito resistentes, mas precisam de vacinas anuais.', dica: 'Gostam de lugares altos, arranhadores e caixas de papelão.' },
    { id: '3', nome: 'Siamês', descricao: 'Conhecidos por seus olhos azuis e pelagem marcante, são gatos muito inteligentes, apegados ao dono e extremamente comunicativos.', expectativa: '15 a 20 anos', problemas: 'Podem ter problemas respiratórios ou estrabismo.', dica: 'São muito vocais, prepare-se para "conversar" com ele todos os dias!' },
    { id: '4', nome: 'Golden Retriever', descricao: 'Cães dóceis, brincalhões, pacientes e muito inteligentes. São excelentes companheiros para famílias e crianças.', expectativa: '10 a 12 anos', problemas: 'Tendência a displasia de quadril e problemas de pele/alergias.', dica: 'Precisam de muito exercício para não ficarem ansiosos e destruírem coisas.' },
    { id: '5', nome: 'Betta', descricao: 'Um peixe ornamental belíssimo, com nadadeiras longas e coloridas. São territoriais e preferem viver de forma solitária.', expectativa: '2 a 5 anos', problemas: 'Sensíveis à mudança brusca de temperatura e má qualidade da água.', dica: 'Nunca junte dois machos no mesmo aquário, pois eles vão brigar!' },
    { id: '6', nome: 'Calopsita', descricao: 'Aves amigáveis, interativas e que adoram assobiar músicas. São ótimas companheiras para quem vive em apartamento.', expectativa: '10 a 15 anos', problemas: 'Podem ter doenças respiratórias se ficarem em correntes de vento.', dica: 'Adoram sementes variadas, frutas e brinquedos para bicar.' }
  ];

  const [pesquisa, setPesquisa] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const petsDestaCasa = pets.filter((pet) => pet.casaId === casaAtual?.id);

  // 👉 2. AUTOCOMPLETAR CORRIGIDO
  const handlePesquisa = (textoDigitado) => {
    setPesquisa(textoDigitado);
    setResultado(null); 

    if (textoDigitado.trim().length > 0) {
      const filtro = bancoDeRacas.filter(raca => 
        raca.nome.toLowerCase().includes(textoDigitado.toLowerCase())
      );
      setSugestoes(filtro);
    } else {
      setSugestoes([]);
    }
  };

  // 👉 3. QUANDO O USUÁRIO CLICA NA SUGESTÃO
  const selecionarRaca = (racaEscolhida) => {
    setPesquisa(racaEscolhida.nome); 
    setSugestoes([]); // Esconde a lista flutuante
    setCarregando(true);

    setTimeout(() => {
      // Agora ele puxa a ficha técnica ÚNICA do animal que você clicou
      setResultado(racaEscolhida);
      setCarregando(false);
    }, 1500);
  };

  // 👉 4. SE O USUÁRIO APERTAR A LUPA MANUALMENTE (Para animais que não estão na lista)
  const buscarManual = () => {
    if (pesquisa.trim() === '') return;
    setSugestoes([]);
    setCarregando(true);

    setTimeout(() => {
      const racaEncontrada = bancoDeRacas.find(r => r.nome.toLowerCase().includes(pesquisa.toLowerCase()));

      if (racaEncontrada) {
        setResultado(racaEncontrada);
      } else {
        // RESPOSTA GENÉRICA INTELIGENTE: Se a IA não tiver a raça no banco de dados
        setResultado({
          nome: pesquisa.toUpperCase(),
          descricao: `Ainda não temos dados profundos sobre "${pesquisa}" em nosso banco de dados, mas sabemos que todo pet é especial e merece cuidado!`,
          expectativa: 'Consulte um médico veterinário.',
          problemas: 'Recomendamos acompanhamento profissional regular.',
          dica: 'Dê muito carinho, água limpa fresca e alimentação de qualidade.'
        });
      }
      setCarregando(false);
    }, 1500);
  };

  const fecharPesquisa = () => {
    setPesquisa('');
    setSugestoes([]);
    setResultado(null);
  };

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      <FontAwesome5 name="paw" size={60} color="rgba(248, 111, 3, 0.3)" style={[styles.patinha, { bottom: 150, right: 100, transform: [{ rotate: '-10deg' }] }]} />

      <Text style={styles.versao}>v0.01</Text>

      <View style={styles.cabecalho}>
        <TouchableOpacity style={styles.infoCasa} onPress={() => setTelaAtual('Casas')}>
          <Text style={styles.textoCasaAtual}>Casa atual:</Text>
          <Image source={{ uri: casaAtual?.imagem }} style={styles.imagemCasaMini} />
          <Text style={styles.textoNomeCasa}>{casaAtual?.nome}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTelaAtual('PerfilUsuario')}>
          <Feather name="menu" size={40} color="#CC5A00" style={{ marginTop: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.areaBuscaInteligente}>
        {/* BARRA DE PESQUISA */}
        <View style={styles.barraPesquisa}>
          <TextInput
            style={styles.inputPesquisa}
            placeholder="Ex: Siamês, Betta..."
            placeholderTextColor="rgba(51, 51, 51, 0.6)"
            value={pesquisa}
            onChangeText={handlePesquisa}
          />
          {/* A lupa agora chama a função manual! */}
          <TouchableOpacity onPress={buscarManual}>
            <Feather name="search" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {/* 👉 CAIXA DE SUGESTÕES FLUTUANTE (Não empurra mais a tela para baixo!) */}
        {sugestoes.length > 0 && (
          <View style={styles.areaSugestoes}>
            {sugestoes.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemSugestao} onPress={() => selecionarRaca(item)}>
                <Feather name="search" size={18} color="#F86F03" />
                <Text style={styles.textoSugestao}>{item.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {carregando && (
          <View style={styles.cartaoIA}>
            <ActivityIndicator size="large" color="#CC5A00" />
            <Text style={styles.textoCarregando}>A IA está buscando dados sobre "{pesquisa}"...</Text>
          </View>
        )}

        {resultado && !carregando && (
          <View style={styles.cartaoIA}>
            <TouchableOpacity style={styles.botaoFecharIA} onPress={fecharPesquisa}>
              <Feather name="x" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.topoCartaoIA}>
              <FontAwesome5 name="robot" size={24} color="#CC5A00" />
              <Text style={styles.tituloRaca}>{resultado.nome}</Text>
            </View>

            <Text style={styles.textoInfoIA}><Text style={styles.labelIA}>🐾 Sobre:</Text> {resultado.descricao}</Text>
            <Text style={styles.textoInfoIA}><Text style={styles.labelIA}>⏳ Vida:</Text> {resultado.expectativa}</Text>
            <Text style={styles.textoInfoIA}><Text style={styles.labelIA}>🏥 Saúde:</Text> {resultado.problemas}</Text>

            <View style={styles.dicaIA}>
              <Text style={styles.textoDicaIA}>💡 Dica: {resultado.dica}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.areaPrincipalPets}>
        <View style={styles.areaScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listaRolavel}>
            {petsDestaCasa.length > 0 ? (
              petsDestaCasa.map((pet) => (
                <TouchableOpacity key={pet.id} style={styles.itemPet} onPress={() => { setPetAtual(pet); setTelaAtual('MetasCuidados'); }}>
                  <Image source={{ uri: pet.imagem }} style={styles.imagemPet} />
                  <Text style={styles.textoPet}>{pet.nome}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.textoVazio}>Nenhum pet nesta casa ainda!</Text>
            )}
          </ScrollView>
        </View>

        <View style={styles.areaBotaoFixo}>
          <TouchableOpacity style={styles.botaoAdicionarPet} onPress={() => setTelaAtual('NovoPet')}>
            <Ionicons name="add" size={55} color="#333" />
          </TouchableOpacity>
          <Text style={styles.textoPetBotao}>Novo pet</Text> 
        </View>
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

  // A área de busca agora tem prioridade de "camada" (zIndex) alta para a sugestão flutuar sobre os pets
  areaBuscaInteligente: { zIndex: 10, marginHorizontal: 30, marginTop: 30, position: 'relative' },
  barraPesquisa: { backgroundColor: '#CC5A00', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 100, borderWidth: 3, borderColor: '#333' },
  inputPesquisa: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#333' },
  
  // 👉 MÁGICA: A caixa de sugestões agora é "absolute". Ela flutua sobre a tela sem quebrar o layout!
  areaSugestoes: { 
    position: 'absolute', 
    top: 60, // Fica logo abaixo da barra
    left: 0, 
    right: 0, 
    backgroundColor: '#222', 
    borderRadius: 15, 
    padding: 10, 
    borderWidth: 2, 
    borderColor: '#555',
    zIndex: 20, // Garante que fique acima de tudo
    elevation: 5
  },
  itemSugestao: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#444' },
  textoSugestao: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 12 },

  cartaoIA: { backgroundColor: '#333', marginTop: 15, borderRadius: 20, padding: 20, borderWidth: 2, borderColor: '#CC5A00', position: 'relative' },
  textoCarregando: { color: '#FFF', textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 16 },
  botaoFecharIA: { position: 'absolute', top: 10, right: 10, zIndex: 3, backgroundColor: '#111', borderRadius: 15, padding: 5 },
  topoCartaoIA: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#555', paddingBottom: 10, marginRight: 20 },
  tituloRaca: { fontSize: 20, fontWeight: '900', color: '#CC5A00', marginLeft: 10, flex: 1 },
  
  textoInfoIA: { color: '#FFF', fontSize: 14, lineHeight: 22, marginBottom: 10 },
  labelIA: { fontWeight: 'bold', color: '#F86F03' },
  dicaIA: { backgroundColor: '#111', padding: 10, borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: '#F86F03' },
  textoDicaIA: { color: '#FFF', fontSize: 13, fontStyle: 'italic' },

  areaPrincipalPets: { alignItems: 'center', marginTop: 30, zIndex: 1, flex: 1 },
  areaScroll: { width: '100%', marginBottom: 30 },
  listaRolavel: { alignItems: 'center', gap: 20, paddingHorizontal: 30 },
  itemPet: { alignItems: 'center' },
  imagemPet: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#333' },
  textoPet: { fontSize: 16, fontWeight: 'bold', color: '#D1D1D1', marginTop: 10 },
  textoVazio: { fontSize: 16, color: '#333', fontStyle: 'italic', marginTop: 20 },
  
  areaBotaoFixo: { alignItems: 'center', paddingBottom: 30 },
  botaoAdicionarPet: { width: 90, height: 90, borderRadius: 50, backgroundColor: '#CC5A00', borderWidth: 4, borderColor: '#333', justifyContent: 'center', alignItems: 'center' },
  textoPetBotao: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 10 }
});