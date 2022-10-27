import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { icons } from '../constants'

import { auth, db } from "../config.js";
import { set, ref, onValue, remove, update, equalTo, query, orderByChild, push, child } from "firebase/database";


const DetalheTriagemScreen = ({ navigation, route }) => {

    const deletar = (id) => {
        remove(ref(db, `/items/${id}`))
        .then(
            navigation.replace('Home')
        )
        .catch((err) => {
          alert(err.message);
        })
      };

    return (
        <ScrollView>
        <View style={styles.container}>

            <View style={styles.header}>
                <Pressable onPress={() => navigation.replace('Home')}>
                    <Ionicons name="chevron-back" size={40} style={{marginLeft: 15}}/>
                </Pressable>
                <Text style={styles.text_header}>DETALHES DA TRIAGEM</Text>
            </View>

            <View style={styles.background}>

            <View>
            <Pressable style={styles.delete}
                    onPress={() =>  navigation.navigate('AtualizarTriagem', {info: route.params.info})}>
               <Text style={{fontSize: 12, fontWeight: '300'}}>EDITAR</Text>
            </Pressable>

            <Pressable style={styles.delete}
                    onPress={() => deletar(route.params.info.id)}>
               <Text style={{fontSize: 12, fontWeight: '300'}}>DELETAR</Text>
            </Pressable>
            </View>
           

               <View style={styles.content_info}>
                   <View style={styles.content_icon}>
                        <Image source={icons.temperatura}/>  
                   </View>
                   <View style={styles.content_text}>
                        <Text style={styles.text_info}>TEMPERATURA</Text>
                        <Text style={styles.text_value}>{route.params.info.temperatura}</Text>
                   </View>
               </View>

               <View style={styles.content_info}>
                   <View style={styles.content_icon}>
                        <Image source={icons.pressao}/>  
                   </View>
                   <View style={styles.content_text}>
                        <Text style={styles.text_info}>PRESSÃO</Text>
                        <Text style={styles.text_value}>{route.params.info.pressao}</Text>
                   </View>
               </View>

               <View style={styles.content_info}>
                   <View style={styles.content_icon}>
                        <Image source={icons.batimento}/>  
                   </View>
                   <View style={styles.content_text}>
                        <Text style={styles.text_info}>BATIMENTOS</Text>
                        <Text style={styles.text_value}>{route.params.info.batimento}</Text>
                   </View>
               </View>

               <Text style={{marginLeft: 100, marginTop: 40, color: '#FFF', fontWeight: '400', fontSize: 15}}>OBSERVAÇÕES DO MÉDICO</Text>

               <View style={styles.info_desc}>
                    <Text style={styles.desc_med}>{route.params.info.observacao}</Text>
               </View>
            </View>

        </View>
        </ScrollView>
        
        
    );
}

export default DetalheTriagemScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 70
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        marginTop: 20
    },
    text_header: {
        fontSize: 35,
        textAlign: 'right',
        fontWeight: '200',
    },
    background: {
        marginTop: 50,
        backgroundColor: '#5CBFA6',
        height: 700,
        width: 480,
        borderRadius: 100
    },
    content_info: {
        flexDirection: 'row',
        marginTop: 40,
    },
    content_icon: {
        height: 80,
        width: 80,
        backgroundColor: '#B9FFEE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 20
    },
    content_text: {
        height: 80,
        width: 230,
        backgroundColor: '#B9FFEE',
        borderRadius: 15,
    },
    text_info: {
        fontWeight: '100',
        fontSize: 20,
        marginLeft: 6,
        marginTop: 5
    },
    text_value: {
        fontSize: 30,
        fontWeight: '200',
        marginTop: 5,
        marginLeft: 6
    },
    info_desc: {
        height: 120,
        width: 325,
        backgroundColor: '#FFF',
        marginTop: 30,
        marginLeft: 30,
        borderRadius: 20
    },
    desc_med: {
        marginLeft: 10,
        marginTop: 15,
        marginRight: 10,
        textAlign: 'justify'
    },
    delete: {
        marginTop: 10,
        height: 40,
        width: 70,
        backgroundColor: '#FFF',
        right: 0,
        marginLeft: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    }
  })