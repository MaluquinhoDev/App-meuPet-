import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';

export default function TelaMetasCuidados({ setTelaAtual, petAtual, casaAtual, usuarioAtual, metas, setMetas, agendamentos, onSalvarMeta }) {
  
  const isAdmin = casaAtual?.adminId === usuarioAtual?.id;
  const [configurando, setConfigurando] = useState(false);

  const metaDoPet = metas.find(m => m.petId === petAtual?.id) || {
    petId: petAtual?.id, 
    comidaMeta: 3, comidaFeita: 0, comidaPeriodo: 'Diário', 
    passeioMeta: 2, passeioFeita: 0, passeioPeriodo: 'Diário', 
    curativoMeta: 0, curativoFeita: 0, curativoPeriodo: 'Mensal',
    vetMeta: 1, vetFeita: 0, vetPeriodo: 'Semestral'
  };

  // 👉 Pega apenas os agendamentos desse pet
  const agendamentosDoPet = agendamentos?.filter(a => a.petId === petAtual?.id) || [];

  const alterarValor = (tipo, acao) => {
    const campo = configurando ? `${tipo}Meta` : `${tipo}Feita`;
    let novasMetas = [...metas];
    let index = novasMetas.findIndex(m => m.petId === petAtual?.id);

    if (index === -1) { novasMetas.push(metaDoPet); index = novasMetas.length - 1; }

    let novoValor = novasMetas[index][campo] + acao;
    if (novoValor < 0) novoValor = 0; 
    if (!configurando && novoValor > novasMetas[index][`${tipo}Meta`]) { novoValor = novasMetas[index][`${tipo}Meta`]; }

    novasMetas[index][campo] = novoValor;
    setMetas(novasMetas);
    onSalvarMeta(novasMetas[index]);
  };

  const alterarPeriodo = (tipo) => {
    const periodos = ['Diário', 'Semanal', 'Mensal', 'Semestral', 'Anual'];
    let novasMetas = [...metas];
    let index = novasMetas.findIndex(m => m.petId === petAtual?.id);

    if (index === -1) { novasMetas.push(metaDoPet); index = novasMetas.length - 1; }

    let periodoAtual = novasMetas[index][`${tipo}Periodo`];
    let proximoIndex = (periodos.indexOf(periodoAtual) + 1) % periodos.length;
    
    novasMetas[index][`${tipo}Periodo`] = periodos[proximoIndex];
    setMetas(novasMetas);
    onSalvarMeta(novasMetas[index]);
  };

  return (
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}>
      <StatusBar style="auto" />

      <FontAwesome5 name="paw" size={80} color="rgba(248, 111, 3, 0.4)" style={[styles.patinha, { bottom: 50, right: 30, transform: [{ rotate: '-20deg' }] }]} />
      
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => setTelaAtual('ListaDePets')}>
          <Ionicons name="arrow-undo-outline" size={40} color="#CC5A00" />
        </TouchableOpacity>

        {isAdmin && (
          <TouchableOpacity style={[styles.botaoConfigurar, configurando && styles.botaoConfigurandoAtivo]} onPress={() => setConfigurando(!configurando)}>
            <Feather name="settings" size={24} color={configurando ? "#FFF" : "#333"} />
            <Text style={[styles.textoConfig, configurando && { color: '#FFF' }]}>{configurando ? "Salvando..." : "Configurar Metas"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoPet}>
        <Image source={{ uri: petAtual?.imagem }} style={styles.imagemPet} />
        <Text style={styles.titulo}>Metas de: {petAtual?.nome}</Text>
      </View>

      <ScrollView style={styles.listaScroll} showsVerticalScrollIndicator={false}>
        
        {/* METAS */}
        <View style={styles.itemMeta}>
          <FontAwesome5 name="hotdog" size={40} color="#333" style={styles.iconeMeta} />
          <View style={styles.areaContador}>
            <Text style={styles.textoContador}>{configurando ? `Meta: ${metaDoPet.comidaMeta}` : `Feito: ${metaDoPet.comidaFeita} / ${metaDoPet.comidaMeta}`}</Text>
            <Text style={styles.textoPeriodo}>{metaDoPet.comidaPeriodo}</Text>
          </View>
          <View style={styles.botoesAcao}>
            {configurando && <TouchableOpacity style={styles.botaoPeriodo} onPress={() => alterarPeriodo('comida')}><Feather name="refresh-cw" size={18} color="#FFF" /></TouchableOpacity>}
            <TouchableOpacity style={styles.botaoAcao} onPress={() => alterarValor('comida', -1)}><Feather name="minus" size={22} color="#FFF" /></TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao} onPress={() => alterarValor('comida', 1)}><Feather name="plus" size={22} color="#FFF" /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemMeta}>
          <FontAwesome5 name="dog" size={40} color="#333" style={styles.iconeMeta} />
          <View style={styles.areaContador}>
            <Text style={styles.textoContador}>{configurando ? `Meta: ${metaDoPet.passeioMeta}` : `Feito: ${metaDoPet.passeioFeita} / ${metaDoPet.passeioMeta}`}</Text>
            <Text style={styles.textoPeriodo}>{metaDoPet.passeioPeriodo}</Text>
          </View>
          <View style={styles.botoesAcao}>
            {configurando && <TouchableOpacity style={styles.botaoPeriodo} onPress={() => alterarPeriodo('passeio')}><Feather name="refresh-cw" size={18} color="#FFF" /></TouchableOpacity>}
            <TouchableOpacity style={styles.botaoAcao} onPress={() => alterarValor('passeio', -1)}><Feather name="minus" size={22} color="#FFF" /></TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao} onPress={() => alterarValor('passeio', 1)}><Feather name="plus" size={22} color="#FFF" /></TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemMeta}>
          <FontAwesome5 name="stethoscope" size={40} color="#333" style={styles.iconeMeta} />
          <View style={styles.areaContador}>
            <Text style={styles.textoContador}>{configurando ? `Meta: ${metaDoPet.vetMeta}` : `Feito: ${metaDoPet.vetFeita} / ${metaDoPet.vetMeta}`}</Text>
            <Text style={styles.textoPeriodo}>{metaDoPet.vetPeriodo}</Text>
          </View>
          <View style={styles.botoesAcao}>
            {configurando && <TouchableOpacity style={styles.botaoPeriodo} onPress={() => alterarPeriodo('vet')}><Feather name="refresh-cw" size={18} color="#FFF" /></TouchableOpacity>}
            <TouchableOpacity style={styles.botaoAcao} onPress={() => alterarValor('vet', -1)}><Feather name="minus" size={22} color="#FFF" /></TouchableOpacity>
            <TouchableOpacity style={styles.botaoAcao} onPress={() => alterarValor('vet', 1)}><Feather name="plus" size={22} color="#FFF" /></TouchableOpacity>
          </View>
        </View>

        {/* 👉 NOVA SEÇÃO: CALENDÁRIO E AGENDAMENTOS */}
        <View style={styles.linhaSeparadora}></View>

        <Text style={styles.tituloSecao}>Próximos Compromissos</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carrosselAgendamentos}>
          {agendamentosDoPet.length > 0 ? (
            agendamentosDoPet.map((agendamento) => (
              <View key={agendamento.id} style={styles.cartaoCalendario}>
                <FontAwesome5 name="calendar-day" size={40} color="#CC5A00" />
                <Text style={styles.textoDataCartao}>{agendamento.data}</Text>
                <Text style={styles.textoCompromissoCartao}>{agendamento.compromisso}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.textoVazio}>Nenhum compromisso na agenda.</Text>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.botaoAgendarNovo} onPress={() => setTelaAtual('Agendar')}>
          <Text style={styles.textoBotaoAgendar}>Agendar</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 50 },
  patinha: { position: 'absolute', zIndex: 0 },
  cabecalho: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, zIndex: 1 },
  botaoConfigurar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderRadius: 20, borderWidth: 2, borderColor: '#333' },
  botaoConfigurandoAtivo: { backgroundColor: '#CC5A00', borderColor: '#FFF' },
  textoConfig: { marginLeft: 8, fontWeight: 'bold', color: '#333' },

  infoPet: { alignItems: 'center', marginBottom: 30, zIndex: 1 },
  imagemPet: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#333', marginBottom: 10 },
  titulo: { fontSize: 28, fontWeight: '900', color: '#333', textAlign: 'center' },

  listaScroll: { flex: 1, zIndex: 1 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)', padding: 15, borderRadius: 20, marginBottom: 15, borderWidth: 2, borderColor: '#333' },
  iconeMeta: { width: 50, textAlign: 'center' },
  areaContador: { flex: 1, paddingHorizontal: 10 },
  textoContador: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  textoPeriodo: { fontSize: 14, color: '#333', fontStyle: 'italic', marginTop: 2 }, 
  botoesAcao: { flexDirection: 'row', gap: 6 },
  botaoAcao: { backgroundColor: '#CC5A00', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#333' },
  botaoPeriodo: { backgroundColor: '#111', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#333' },

  // Estilos da Sessão de Calendário
  linhaSeparadora: { height: 2, backgroundColor: 'rgba(0,0,0,0.2)', marginVertical: 20 },
  tituloSecao: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 15, textAlign: 'center' },
  
  carrosselAgendamentos: { flexDirection: 'row', marginBottom: 20 },
  cartaoCalendario: { backgroundColor: '#333', width: 120, padding: 15, borderRadius: 20, alignItems: 'center', marginRight: 15, borderWidth: 2, borderColor: '#CC5A00' },
  textoDataCartao: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  textoCompromissoCartao: { color: '#CC5A00', fontSize: 12, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
  textoVazio: { color: '#333', fontStyle: 'italic', fontSize: 16, textAlign: 'center', width: '100%' },

  botaoAgendarNovo: { backgroundColor: '#111', padding: 15, borderRadius: 50, alignItems: 'center', borderWidth: 2, borderColor: '#CC5A00', marginHorizontal: 40 },
  textoBotaoAgendar: { color: '#CC5A00', fontSize: 18, fontWeight: 'bold' }
});