import React, {useState, useEffect } from 'react';
import { hospitais } from '../hospitais.json';
import { StyleSheet, Text, View, TextInput, Pressable, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'



const MapsScreen = ({ navigation }) => {

    const [ data, setData ] = useState([]);
    const [ indexHospital, setIndexHospital ] = useState();
    const [ menorTempo, setMenorTempo ] = useState();
    const [ destinos, setDestinos ] = useState([]);

    const listaDeDuracao = [];
    var destinations = '';
    const apiKey = 'AIzaSyC9-UJSfbULPg4DCkyTsH8oD0x_Pl1K2Uw'
    const origin = '-23.724399162440584,%20-46.86348076410735'
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinations}&origins=${origin}&key=${apiKey}`

    const onInit = async () => {
        formatarQueryDestino()
      };

    const pesquisar = async () => {
      try {
        const response = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?destinations=Av.+João+Firmino,+250+-+Assunção,+São+Bernardo+do+Campo|R.+Américo+Brasiliense,+596+-+Centro,+São+Bernardo+do+Campo|R.+Martim+Afonso,+114&origins=Itapecerica+da+Serra,+State+of+São+Paulo,+Brazil&key=AIzaSyC9-UJSfbULPg4DCkyTsH8oD0x_Pl1K2Uw&regions=pt-BR&language=pt-BR');
        const json = await response.text();
        var form = JSON.parse(json)
        var elements = form.rows[0].elements
        setData(elements)
        setDestinos(form.destination_addresses)
      } catch {
        console.log('error');
      }
      calcularMenorDistancia(data)
    }

    const calcularMenorDistancia = () => {
      data.forEach(obj => {
        listaDeDuracao.push(Math.round(obj.duration.value / 60))
      })
      setMenorTempo(Math.min(...listaDeDuracao));
      setIndexHospital(listaDeDuracao.findIndex(i => i === menorTempo))
    }

    const formatarQueryDestino = () => {
      var controle = 0;
     hospitais.forEach(e => {
      if(controle === (hospitais.length - 1)) {
        destinations += e.loc;
      } else {
        destinations += e.loc + '|';
        controle += 1;
      }
     })
    }

    useEffect(() => { onInit(); }, []);

    return (
      <View style={styles.container}>

            <View style={styles.header}>
                <Pressable onPress={() => navigation.replace('Home')}>
                    <Ionicons name="home-outline" size={40} style={{marginTop: 50}}/>
                </Pressable>
            </View>

            <View style={styles.info}>
              <Text style={{textAlign: 'justify'}}>Em caso de emergencia clique no botão abaixo para calcularmos o hospital mais próximo de você. Dentro dos hospitais cadastrados no aplicativo.</Text>
            </View>
            <Pressable 
                    style={styles.botaoAcessar}
                    onPress={() => pesquisar()}>
                    <Text style={{color: '#000', fontWeight: '400', fontSize: 15}}>PESQUISAR</Text>
            </Pressable>

            {
              (menorTempo && (destinos[indexHospital] != undefined)) 
              ? 
              <View>
                <View style={styles.tempo}>
                  <Text style={{fontWeight: '100', fontSize: 150}}>56</Text>
                  <Text style={{fontWeight: 'bolder', fontSize: 25, transform: [{ rotate: '90deg'}]}}>MINUTOS</Text>
                </View>
                <Text style={{fontWeight: '300', fontSize: 25, marginTop: 10}}> Av. João Firmino, 250 - Assunção, São Bernardo do Campo - SP, 09810-250, Brasil</Text>
              </View>
              : 
              <Text style={{color: '#000', fontWeight: '300', fontSize: 20, marginTop: 150}}>NENHUM HOSPITAL ENCONTRADO</Text>
            }
      </View>
    );
}

export default MapsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#82B3A6',
    height: '100%'
  },
  botaoAcessar: {
    width: 320,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    width: 250,
    marginTop: 30,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15
  },
  tempo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 70,
    minHeight: 150 ,
    minWidth: 100,
    borderWidth: 1
  }
})