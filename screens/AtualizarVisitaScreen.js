import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';


const AtualizarVisitaScreen = ({ navigation, route }) => {

    const [ visivel, setVisivel ] = useState(false);
    const [ data, setData ] = useState([]);

    const [nomePaciente, setNomePaciente]=useState(route.params.info.nome)
    const [hospital, setHospital]=useState(route.params.info.hospital)
    const [dataDaVisita, setDataDaVisita]=useState(route.params.info.dataDaVisita)
    const [relacaoFamilia, setRelacaoFamilia]=useState(route.params.info.relacaoFamilia)
    const [motivo, setMotivo]=useState(route.params.info.motivo)

    const onInit = async () => {
        try {
          const lista = await AsyncStorage.getItem('list')
            if(lista != null) {
            const listaJson = JSON.parse(lista)
            const listaFiltrada = listaJson.filter(item => item.id !== route.params.info.id)
            setData(listaFiltrada)
          } 
        } catch (e) {
          console.log('erro na requisição' + e)
        }
      };

    async function criar() {
        try {
            data.push(criarObjeto());
            const json = JSON.stringify(data)
            await AsyncStorage.setItem('list', json)
        } catch {
            console.log(error);
            throw new Error("Erro para gravar usuário");
        }
        limparDados()
        navigation.navigate('HomeTab');
    }

    function criarObjeto() {
        let item = {
            id: route.params.info.id,
            nome: nomePaciente,
            hospital: hospital,
            dataDaVisita: dataDaVisita,
            relacaoFamilia: relacaoFamilia,
            motivo: motivo,
        }
        return item;
    }

    function limparDados() {
        setNomePaciente(null)
        setHospital(null)
        setDataDaVisita(null)
        setRelacaoFamilia(null)
        setMotivo(null)
    }

    useEffect(() => { onInit(); }, []);

return (
    <View style={{backgroundColor: '#82B3A6', height: 800}}>
        <View style={styles.header}>
            <Ionicons name="ios-calendar-outline" size={30} style={styles.header_icon}/>
            <Text style={styles.header_text}>EDITE SUA VISITA</Text>
        </View>

        <View style={styles.circle}/>

        <View style={styles.form}>
            <TextInput style={styles.input}
                onChangeText={setNomePaciente}
                value={nomePaciente}
                placeholder = 'NOME DO PACIENTE'
                placeholderTextColor={'#63877E'}/>
    
            <TextInput style={styles.input}
                onChangeText={setHospital}
                value={hospital}
                placeholder = 'HOSPITAL DA VISITA'
                placeholderTextColor={'#63877E'}/>

            <TextInput style={styles.input}
                onChangeText={setDataDaVisita}
                value={dataDaVisita}
                placeholder = 'dataDaVisita DA VISITA'
                placeholderTextColor={'#63877E'}/>

            <TextInput style={styles.input}
                onChangeText={setRelacaoFamilia}
                value={relacaoFamilia}
                placeholder = 'RELAÇÃO FAMILIAR'
                placeholderTextColor={'#63877E'}/>

            <TextInput style={styles.input}
                onChangeText={setMotivo}
                value={motivo}
                placeholder = 'MOTIVO DA VISITA'
                placeholderTextColor={'#63877E'}/>
    
            <Pressable 
                style={styles.botaoAcessar}
                onPress={() =>  criar()}>
                <Text style={{color: '#FFF', fontWeight: '400', fontSize: 15}}>CONFIRMAR</Text>
            </Pressable>

            <View style={styles.observ}>
                <Text style={{fontWeight: '200', padding: 10, textAlign: 'justify'}}>OBS: A CONFIRMAÇÃO DA VISITA FICA PENDENTE DE APROVAÇÃO DO HOSPITAL E DO PACIENTE </Text>
            </View>
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={visivel}
            onRequestClose={() => setVisivel(false)}>
            <View style={styles.container_modal}>
                <View style={styles.modal}>
                    <Text style={styles.modal_title}>VISITA MARCADA</Text>
                    <Text style={styles.modal_text}>SUA VISITA FOI AGENDADA COM SUCESSO E ENVIADA PARA APROVAÇÃO, ACOMPANHE O ANDAMENTO PELO APP</Text>
                    <Pressable
                    style={styles.modal_button}
                    onPress={() => setVisivel(false)}
                    >
                        <Text>OK</Text> 
                    </Pressable>
                </View>  
            </View>
            
        </Modal>
        
    </View>
);
}

export default AtualizarVisitaScreen;

const styles = StyleSheet.create({
header: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 20,
    alignItems: 'center'
},
header_text: {
    fontSize: 25,
    fontWeight: '200',
    marginLeft: 10
},
circle: {
    height: 1000,
    backgroundColor: '#FFF',
    borderRadius: 500,
    width: 700,
    position: 'absolute',
    bottom: -330,
    left: -150
   },
form: {
    height: 530,
    marginTop: 100,
    alignItems: 'center'
   },
input: {
    backgroundColor: '#FFF',
    width: 320,
    height: 50,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    marginTop: 10,    
  },
botaoAcessar: {
    width: 320,
    height: 40,
    backgroundColor: '#82B3A6',
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  observ: {
      height: 75,
      width: 320,
      backgroundColor: '#82B3A6',
      marginTop: 30,
      borderRadius: 10
  },
  container_modal: {
      position: 'absolute',
      height: 9700,
      width: 400,
      backgroundColor: 'rgba(0,0,0,0.2)'
  },
  modal: {  
    backgroundColor: '#B9FFEE',
    height: 220,
    width: 330,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 270,
    marginLeft: 30
  },
  modal_title: {
      fontSize: 20,
      marginTop: 20,
      fontWeight: '400'
  },
  modal_text: {
      fontSize: 15,
      fontWeight: '300',
      textAlign: 'justify',
      padding: 10,
      marginTop: 20
  },
  modal_button: {
    backgroundColor: '#82B3A6',
    height: 40,
    width: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
})