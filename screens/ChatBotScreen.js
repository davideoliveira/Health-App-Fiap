import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from 'expo-av';
import axios from "axios";




export default function ChatBotScreen() {
  // Onde armazena as mensagens
  const [messages, setMessages] = useState([]);
  const [session_id, setSession_id] = useState('')
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);

  const getWatson = async (props) => {
    try {
        const response = await fetch(`https://healthappchatbot.herokuapp.com/conversa?mensagem=${props}&session_id=${session_id}`)
        const json = await response.json()
        return json

    } catch (error) {
        console.log(error)
    }  
  }

  const responseWatson = async (props) => {
    const resposta = await getWatson(props)
    setSession_id(resposta.session_id)
    onSend([
        {
            _id: messageIdGenerator(),
            text: resposta.text,
            createdAt: new Date(),
            user: {
              _id: 2,
            },
          }
    ])
  }

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      file: recording.getURI()
    });

    setRecordings(updatedRecordings);
    onSend([
      {
          _id: messageIdGenerator(),
          createdAt: new Date(),
          user: {
            _id: 1,
          },
          audio: recording.getURI(),
          sound: sound
        }
    ])

    const formData = new FormData();
    formData.append("file", {
      uri: recording.getURI(),
      name: "test.wav",
      type: "audio/wav",
    });
    formData.append("sessionId", session_id)
    axios
      .post(url='https://healthappchatbot.herokuapp.com/postaudio', data=formData, {
        responseType: 'json',
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then( async function (response) {
        const resposta = response.data.text
        setSession_id(response.data.session_id)
        onSend([
          {
              _id: messageIdGenerator(),
              text: resposta,
              createdAt: new Date(),
              user: {
                _id: 2,
              },
            }
      ])
        

      })
      .catch(function (error) {
        console.log(error);
        console.error(error.response);
      });
    console.log(formData);
  }


  const renderAudio = props => {
    return !props.currentMessage.audio ? (
        <View />
    ) : (
            <Ionicons
                name="ios-play"
                size={35}
                color={recording ? "red" : "blue"}
                style={{
                    left: 15,
                    position: "relative",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.5,
                    backgroundColor: "transparent"
                }}
                onPress={() => {
                  props.currentMessage.sound.replayAsync()
                }}
            />
        );
  };


  const messageIdGenerator = () => {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        let r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

  // Callback quando estiver enviando a mensagem
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  // Onde vai ser feito o armazenamento das mensagens
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Olá! Eu sou a assistente virtual do HealthApp! \nComo posso ajuda-lo?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
    
  }, []);

  
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) =>{onSend(messages), console.log(messages[0].text), responseWatson(messages[0].text)}}
      alwaysShowSend
      showUserAvatar
      isAnimated
      renderMessageAudio={renderAudio}
      messageIdGenerator={() => messageIdGenerator()}
      renderActions={() => {
        return (
          <Ionicons
            name="ios-mic"
            size={35}
            hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
            color={recording ? "red" :"black"}
            style={{
              bottom: 50,
              right: 0,
              position: "absolute",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              zIndex: 2,
              backgroundColor: "transparent"
            }}

            onPress={recording ? stopRecording : startRecording}
          />
        );
      }}
      user={{
        _id: 1,
      }}
    />
  );
}