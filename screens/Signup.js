import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
  Modal,
  Pressable,
  ToastAndroid
} from "react-native";

const axios = require('axios')

const image = require("../img/fundo.jpg");

async function postPhoneNumber(phoneNumber){
  axios.post('https://db-numbers.herokuapp.com/phonenumber',{
      phoneNumber: phoneNumber
  })
  .then(function(response){
      console.log(response.data)
  })
  .catch(function(error){
      console.log(error)
  })
}

export default function Signup() {
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState('');

  const showToast = () => {
    ToastAndroid.show("Cadastro concluído com sucesso!", ToastAndroid.SHORT);
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={styles.modalText}
            >{`Ao cadastrar seu número, você vai\nreceber uma mensagem via WhatsApp\nem tempo real indicando em qual\nregião de Santos está chovendo.`}</Text>
            <Pressable
              style={[styles.modalButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Insira seu número de telefone com DDD"
          keyboardType="numeric"
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => postPhoneNumber(text).then(showToast())}>
            <Text style={styles.textButton}>CADASTRAR</Text>
        </TouchableOpacity> 
        <Text style={styles.text} onPress={() => setModalVisible(true)}>
          COMO FUNCIONA?
        </Text>
      </View>
      <StatusBar hidden={true}></StatusBar>
      <View style={styles.overlay} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#1a1b1f",
    opacity: 0.8,
  },
  input: {
    height: 50,
    width: 320,
    borderRadius: 10,
    zIndex: 3,
    backgroundColor: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#77A1D3",
    width: 325,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 370,
    elevation: 2,
    marginTop: 15,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    color: "white",
    zIndex: 4,
    alignSelf: "center",
    marginTop: 20,
  },
  modalText: {
    fontSize: 16,
    color: "white",
  },
  modalButton: {
    backgroundColor: "#77A1D3",
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1a1b1f",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontSize: 24,
    color: "white",
  },
});
