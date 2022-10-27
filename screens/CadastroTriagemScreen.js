import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth, db } from "../config.js";
import { set, ref, push, child } from "firebase/database";

const CadastroTriagemScreen = ({ navigation }) => {

    const [ visivel, setVisivel ] = useState(false);
    const [hospital, setHospital]=useState("")
    const [dataDaTriagem, setDataDaTriagem]=useState("")
    const [temperatura, setTemperatura]=useState("")
    const [pressao, setPressao]=useState("")
    const [batimento, setBatimento]=useState("")
    const [observacao, setObservacao]=useState("")

    const onInit = async () => {
        auth.onAuthStateChanged((user) => {
          if (!user) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login'}]
            });
          }
        });
      };

      const cadastrar = async () => {
        try {
          const id = push(child(ref(db), 'items')).key
          set(ref(db, `/items/${id}`), {
            id: id,
            hospital: hospital,
            dataDaTriagem: dataDaTriagem,
            temperatura: temperatura,
            pressao: pressao,
            batimento: batimento,
            observacao: observacao,
            userId: auth.currentUser.uid
          })
          setVisivel(true)
        } catch(e) {
          console.log('login error', e)
          throw new Error("Erro na requisição")
        } finally {
        setHospital('')
        setDataDaTriagem('')
        setTemperatura('')
        setPressao('')
        setBatimento('')
        setObservacao('')
        navigation.replace('Home');
        }
      };

    useEffect(() => { onInit(); }, []);

    return (
        <View style={{backgroundColor: '#82B3A6', height: 800}}>
            <View style={styles.header}>
                <Ionicons name="ios-calendar-outline" size={30} style={styles.header_icon}/>
                <Text style={styles.header_text}>CADASTRE A TRIAGEM</Text>
            </View>

            <View style={styles.circle}/>

            <View style={styles.form}>
                <TextInput style={styles.input}
                    onChangeText={setHospital}
                    value={hospital}
                    maxLength={15}
                    placeholder = 'HOSPITAL'
                    placeholderTextColor={'#63877E'}/>
        
                <TextInput style={styles.input}
                    onChangeText={setDataDaTriagem}
                    value={dataDaTriagem}
                    placeholder = 'DATA DA VISITA'
                    placeholderTextColor={'#63877E'}/>

                <TextInput style={styles.input}
                    onChangeText={setTemperatura}
                    value={temperatura}
                    keyboardType='numeric'
                    placeholder = 'TEMPERATURA'
                    placeholderTextColor={'#63877E'}/>

                <TextInput style={styles.input}
                    onChangeText={setPressao}
                    value={pressao}
                    placeholder = 'PRESSÃO'
                    placeholderTextColor={'#63877E'}/>

                <TextInput style={styles.input}
                    onChangeText={setBatimento}
                    value={batimento}
                    placeholder = 'BATIMENTOS'
                    placeholderTextColor={'#63877E'}/>

                <TextInput style={styles.input}
                    onChangeText={setObservacao}
                    value={observacao}
                    placeholder = 'OBSERVAÇÕES'
                    placeholderTextColor={'#63877E'}/>
        
                <Pressable 
                    style={styles.botaoAcessar}
                    onPress={() => cadastrar()}>
                    <Text style={{color: '#FFF', fontWeight: '400', fontSize: 15}}>CONFIRMAR</Text>
                </Pressable>

                <Pressable 
                    style={styles.botaoAcessar}
                    onPress={() => navigation.replace('Home')}>
                    <Text style={{color: '#FFF', fontWeight: '400', fontSize: 15}}>VOLTAR</Text>
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
                        <Text style={styles.modal_title}>TRIAGEM CADASTRADA</Text>
                        <Text style={styles.modal_text}>A TRIAGEM FOI AGENDADA COM SUCESSO, ACOMPANHE PELO APP</Text>
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

export default CadastroTriagemScreen;

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