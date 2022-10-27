import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config.js";

const LoginScreen = ({ navigation }) => {

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const onInit = async () => {
    // Se já estiver autenticado, redirecionar para a tela de Lista
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Home');
      }
    });
  };

  const login = async () => {
      // Fazer o login. 
      signInWithEmailAndPassword(auth, inputUsername, inputPassword)
      .then(() => navigation.replace('Home'))
      .catch((erro) => alert(erro.message))
  };

  useEffect(() => { onInit(); }, []);
   
  return (
    <View style={styles.container}>
      <Image source={require('../img/logoPequeno.png')} style={styles.logo}/>

      <View style={styles.content}>
        <Text style={styles.text_content}>ENTRE NA SUA CONTA</Text>

        <TextInput style={styles.input}
          placeholder = 'E-MAIL'
          placeholderTextColor={'#63877E'}
          value={inputUsername}
          onChangeText={(value) => setInputUsername(value)}    />

        <TextInput style={styles.input}
          placeholder = 'SENHA'
          placeholderTextColor={'#63877E'}
          value={inputPassword}
          secureTextEntry={true}
          onChangeText={(value) => setInputPassword(value)} />

        <Pressable 
          style={styles.botaoAcessar}
          onPress={() => login()}>
          <Text style={{color: '#FFF', fontWeight: '400', fontSize: 15}}>ACESSAR</Text>
        </Pressable> 
        
      </View>

      <View style={styles.content_logo}>
        <Text>OU ENTRE COM</Text>
        <View style={styles.social_media}>
          <Icon name="gmail" size={45} color='#63877E' style={styles.icons}/>
          <Icon name="apple" size={45} color='#63877E' style={styles.icons}/>
          <Icon name="microsoft" size={45} color='#63877E' style={styles.icons}/>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style= {{fontSize: 15, fontWeight: '400'}}>ESQUECEU A SENHA?</Text>
        <View style={styles.footer_content}>
          <Pressable 
          onPress={() => navigation.replace('Cadastro')}>
          <Text style= {{fontSize: 15, fontWeight: 'bold', color: '#63877E'}}>CADASTRAR</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F1F5F4'
  },
  logo: {
    height: 200,
    width: 300,
  },
  content: {
    width: '100%',
    marginTop: 20,
    marginLeft: 25
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
  text_content: {
    marginBottom: 10,
    fontWeight: '300',
    fontSize: 13
  },
  content_logo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
    height: 20
  },
  social_media: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  icons: {
    margin: 25
  },
  footer: {
    alignItems: 'center',
    width: 350,
  },
  footer_content: {
    width: 400,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});