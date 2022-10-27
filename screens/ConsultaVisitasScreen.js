import React, {useState, useEffect } from 'react';
import { Text, View , StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconMaterial from 'react-native-vector-icons/AntDesign'



const ConsultaVisitasScreen = ({ navigation }) => {

    const [ data, setData ] = useState([]);

    const onInit = async () => {
        try {
          const lista = await AsyncStorage.getItem('list')
          if(lista != null) {
            setData(JSON.parse(lista))
          } 
        } catch (e) {
          console.log('erro na requisição' + e)
        }
      };

    const removerItem = async (id) => {
      try {
        const newData = data.filter(item => item.id !== id);
        setData(newData)

        let json = JSON.stringify(newData)
        await AsyncStorage.setItem('list', json);
      } catch {
        throw new Error("Erro ao apagar dados")
      }
    }
    
    useEffect(() => { onInit(); }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Consulta de Visitas</Text>
        

            <FlatList
            style={styles.flatList}  
            data = {data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
            <View style={styles.card}>
              <View style={{width: 200}}>
                <Text style={styles.textContent}>Nome do Paciente: {item.nome}</Text>
                <Text style={styles.textContent}>Hospital: {item.hospital}</Text>
                <Text style={styles.textContent}>Data da visita: {item.dataDaVisita}</Text>
              </View>
               
              <View style={{flex: 1, flexDirection: 'row'}}>
                <IconMaterial name="edit" size={20} color='#63877E' style={{marginRight: 20, marginLeft: 25}} onPress={() => navigation.navigate('Atualizar', {info: item, id: item.id})}/>
                <IconMaterial name="delete" size={20} color='#63877E' onPress={() => {removerItem(item.id)}}/>
              </View>
            </View>
            
            )}
            />

        </View>
    );
}

export default ConsultaVisitasScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5CBFA6',
    height:'100%'
  },
  titulo: {
    fontSize: 35,
    marginTop: 70,
    marginLeft: 25,
    fontWeight: '300',
    color: '#B9FFEE'
  },
  flatList: {
    marginTop: 10,
    padding: 30
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#B9FFEE',
    padding: 15,
    marginTop: 15,
    width: 320
  },
  textContent: {
    fontWeight: '300'
  }
})