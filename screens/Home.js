import { StatusBar } from "expo-status-bar";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from "react-native";

const image = require("../img/fundo.jpg");

export default function Home({ navigation }) {
  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <View style={styles.top}>
        <FontAwesomeIcon
          icon={faCloudShowersHeavy}
          style={styles.icon}
          size={100}
        />
        <Text style={styles.textTitle}>{`Choveu em
Santos?`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Graphic')}>
        <Text style={styles.text}>VEJA O GRÁFICO MENSAL DE CHUVA</Text>
      </TouchableOpacity>
      <StatusBar hidden={true}></StatusBar>
      <View style={styles.overlay} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    alignItems: "center",
  },
  textTitle: {
    color: "white",
    fontSize: 32,
    zIndex: 3,
    elevation: 2
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#1a1b1f",
    opacity: 0.4,
  },
  icon: {
    color: "#77A1D3",
    alignSelf: "center",
    zIndex: 3,
    marginTop: 40,
    elevation: 2
  },
  text: {
    fontSize: 16,
    zIndex: 3,
    color: "white",
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
    elevation: 2
  },
});
