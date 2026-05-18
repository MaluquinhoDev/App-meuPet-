import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { StatusBar } from 'expo-status-bar';

import TelaPesquisaPet from './TelaPesquisaPet';
import TelaDeLogin from './TelaDeLogin'; 
import TelaDeCadastro from './TelaDeCadastro'; 
import ListaDeCasas from './ListaDeCasas';
import TelaNovaCasa from './TelaNovaCasa'; 
import TelaExcluirCasa from './TelaExcluirCasa'; 
import ListaDePets from './ListaDePets'; 
import TelaNovoPet from './TelaNovoPet'; 
import TelaPerfilPet from './TelaPerfilPet'; 
import TelaAgendar from './TelaAgendar'; 
import TelaMetasCuidados from './TelaMetasCuidados'; 
import TelaPerfilUsuario from './TelaPerfilUsuario'; 

export default function App() { 
  const [message, setMessage] = useState('Bem-vindo ao MeuPets!'); 
  const [telaAtual, setTelaAtual] = useState('Principal');

  const [usuarioAtual, setUsuarioAtual] = useState({ id: 'user123', nome: 'Criador' });

  // 👉 NOVA MEMÓRIA: Guarda a preferência de notificações
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  const [casas, setCasas] = useState([
    { id: '1', nome: 'Minha casa', imagem: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=250&auto=format&fit=crop', adminId: 'user123' },
    { id: '2', nome: 'Casa do Vizinho', imagem: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=250&auto=format&fit=crop', adminId: 'outro_usuario_qualquer' }
  ]);
  const [casaAtual, setCasaAtual] = useState(null);

  const [pets, setPets] = useState([
    { id: '1', nome: 'Bolinha', imagem: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=250&auto=format&fit=crop', casaId: '1' }
  ]);
  
  const [petAtual, setPetAtual] = useState(null);

  const [metas, setMetas] = useState([
    { 
      petId: '1', comidaMeta: 3, comidaFeita: 0, comidaPeriodo: 'Diário', 
      passeioMeta: 2, passeioFeita: 0, passeioPeriodo: 'Diário', 
      curativoMeta: 0, curativoFeita: 0, curativoPeriodo: 'Mensal',
      vetMeta: 1, vetFeita: 0, vetPeriodo: 'Semestral'
    }
  ]);

  const [agendamentos, setAgendamentos] = useState([]);

  if (telaAtual === 'Login') return <TelaDeLogin setTelaAtual={setTelaAtual} />;
  if (telaAtual === 'Cadastro') return <TelaDeCadastro setTelaAtual={setTelaAtual} />; 
  if (telaAtual === 'Casas') return <ListaDeCasas setTelaAtual={setTelaAtual} casas={casas} setCasaAtual={setCasaAtual} />;
  if (telaAtual === 'NovaCasa') return <TelaNovaCasa setTelaAtual={setTelaAtual} casas={casas} setCasas={setCasas} usuarioAtual={usuarioAtual} />; 
  if (telaAtual === 'ExcluirCasa') return <TelaExcluirCasa setTelaAtual={setTelaAtual} casas={casas} setCasas={setCasas} pets={pets} setPets={setPets} casaAtual={casaAtual} setCasaAtual={setCasaAtual} usuarioAtual={usuarioAtual} />; 

  if (telaAtual === 'ListaDePets') return <ListaDePets setTelaAtual={setTelaAtual} pets={pets} casaAtual={casaAtual} setPetAtual={setPetAtual} />; 
  if (telaAtual === 'NovoPet') return <TelaNovoPet setTelaAtual={setTelaAtual} pets={pets} setPets={setPets} casaAtual={casaAtual} />; 

  if (telaAtual === 'Agendar') return <TelaAgendar setTelaAtual={setTelaAtual} petAtual={petAtual} agendamentos={agendamentos} setAgendamentos={setAgendamentos} />; 
  if (telaAtual === 'MetasCuidados') return <TelaMetasCuidados setTelaAtual={setTelaAtual} petAtual={petAtual} casaAtual={casaAtual} usuarioAtual={usuarioAtual} metas={metas} setMetas={setMetas} agendamentos={agendamentos} />; 
  
  // 👉 Passamos as notificações para a tela do Usuário!
  if (telaAtual === 'PerfilUsuario') return <TelaPerfilUsuario setTelaAtual={setTelaAtual} usuarioAtual={usuarioAtual} pets={pets} notificacoesAtivas={notificacoesAtivas} setNotificacoesAtivas={setNotificacoesAtivas} />; 
  if (telaAtual === 'PesquisaPet') return <TelaPesquisaPet setTelaAtual={setTelaAtual} />;
  return ( 
    <LinearGradient colors={['#F86F03', '#4F7FFF']} style={styles.container}> 
      <StatusBar style="auto" /> 
      <Text style={styles.versao}>v00.1</Text> 
      <Text style={styles.titulo}>Meu Pets</Text> 
      <Text style={styles.message}>{message}</Text>
      <View style={styles.botoesContainer}> 
        <TouchableOpacity style={styles.botaoLogin} onPress={() => setTelaAtual('Login')}> 
          <Text style={styles.textoBotaoLogin}>Login</Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoCadastrar} onPress={() => setTelaAtual('Cadastro')}> 
          <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text> 
        </TouchableOpacity>
      </View>
    </LinearGradient>
  ); 
}

const styles = StyleSheet.create({ 
  container: { flex: 1, justifyContent: 'center', padding: 30 }, 
  versao: { position: 'absolute', bottom: 10, left: 15, color: '#333', fontSize: 12, fontWeight: 'bold' }, 
  titulo: { fontSize: 60, fontWeight: '900', textAlign: 'center', marginBottom: 45, color: '#333' }, 
  message: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#333', fontWeight: 'bold' }, 
  botoesContainer: { marginTop: 20, gap: 15 }, 
  botaoLogin: { backgroundColor: '#F86F03', padding: 15, borderRadius: 10, alignItems: 'center' }, 
  textoBotaoLogin: { color: '#333', fontSize: 18, fontWeight: 'bold' }, 
  botaoCadastrar: { backgroundColor: '#F86F03', padding: 15, borderWidth: 2, borderColor: '#F86F03', borderRadius: 10, alignItems: 'center' }, 
  textoBotaoCadastrar: { color: '#333', fontSize: 18, fontWeight: 'bold' } 
});