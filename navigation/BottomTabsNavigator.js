import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {Text, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from "../screens/HomeScreen";
import AgendarVisitaScreen from "../screens/AgendarVisitaScreen";
import ConsultaVisitaScreen from "../screens/ConsultaVisitasScreen";
import ChatBotScreen from "../screens/ChatBotScreen";

export default () => {
    const BottomTab = createBottomTabNavigator();

    return(
        <BottomTab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarShowLabel: false,
                    tabBarStyle: { height: Platform.OS === 'ios' ? 100 : 50 },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <BottomTab.Screen 
                    name="HomeTab" 
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <>
                                <Ionicons
                                    name='home-outline'
                                    size={20}
                                    color={focused ? '#82B3A6' : '#91A2AD'}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: focused ? '#82B3A6' : '#91A2AD',
                                        width: 50,
                                        fontSize: 11,
                                        textAlign: 'center'
                                    }}>
                                    Home
                                </Text>
                            </>
                        )
                    }}            
                />
                <BottomTab.Screen
                    name="AgendarTab"
                    component={AgendarVisitaScreen} 
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <>
                                <Ionicons
                                    name='ios-calendar-outline'
                                    size={20}
                                    color={focused ? '#82B3A6' : '#91A2AD'}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: focused ? '#82B3A6' : '#91A2AD',
                                        width: 50,
                                        fontSize: 11,
                                        textAlign: 'center'
                                    }}>
                                    Cadastro
                                </Text>
                            </>
                        )
                    }}
                />
                <BottomTab.Screen
                    name="ConsultaVisitaTab"
                    component={ConsultaVisitaScreen} 
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <>
                                <Ionicons
                                    name='newspaper-outline'
                                    size={20}
                                    color={focused ? '#82B3A6' : '#91A2AD'}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: focused ? '#82B3A6' : '#91A2AD',
                                        width: 50,
                                        fontSize: 11,
                                        textAlign: 'center'
                                    }}>
                                    Agenda
                                </Text>
                            </>
                        )
                    }}
                />
                <BottomTab.Screen
                    name="ChatBotTab"
                    component={ChatBotScreen} 
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <>
                                <Ionicons
                                    name='chatbubbles'
                                    size={20}
                                    color={focused ? '#82B3A6' : '#91A2AD'}
                                />
                                <Text
                                    allowFontScaling={false}
                                    style={{
                                        color: focused ? '#82B3A6' : '#91A2AD',
                                        width: 50,
                                        fontSize: 11,
                                        textAlign: 'center'
                                    }}>
                                    Chatbot
                                </Text>
                            </>
                        )
                    }}
                />
            </BottomTab.Navigator>
    );
}