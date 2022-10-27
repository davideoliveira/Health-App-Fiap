import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from '../screens/LoginScreen';
import DetalheScreen from '../screens/DetalheTriagemScreen'
import CadastroScreen from '../screens/CadastroScreen';
import BottomTabsNavigator from './BottomTabsNavigator';
import AtualizarVisitaScreen from '../screens/AtualizarVisitaScreen';
import ConsultaVisitasScreen from '../screens/ConsultaVisitasScreen';
import MapsScreen from '../screens/MapsScreen';
import CadastroTriagemScreen from '../screens/CadastroTriagemScreen';
import AtualizarTriagemScreen from '../screens/AtualizarTriagemScreen';

const Stack = createNativeStackNavigator();

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor: '#ee125a',
                },
            }}
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Cadastro' component={CadastroScreen} />
            <Stack.Screen name='Detalhes' component={DetalheScreen}/>
            <Stack.Screen name='Consulta' component={ConsultaVisitasScreen}/>
            <Stack.Screen name='Atualizar' component={AtualizarVisitaScreen}/>
            <Stack.Screen name='Maps' component={MapsScreen}/>
            <Stack.Screen name='CadastroTriagem' component={CadastroTriagemScreen}/>
            <Stack.Screen name='AtualizarTriagem' component={AtualizarTriagemScreen}/>
            <Stack.Screen name='Home' component={BottomTabsNavigator} />
        </Stack.Navigator>
    );
}