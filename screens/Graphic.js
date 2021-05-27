import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const axios = require('axios')
const image = require("../img/fundo.jpg");

const screenWidth = Dimensions.get("window").width;
const source = "https://db-raindata.herokuapp.com/raindata/1"


export default function Graphic({ navigation }) {

  const [daysOfMonth, setDaysOfMonth] = useState([])
  const [rainMeasurement, setRainMeasurement] = useState([])
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    fetch(source)
      .then((response) => response.json())
      .then((res) => {
          setDaysOfMonth(res.daysOfMonth),
          setRainMeasurement(res.rainMeasurement),
          setMonth(res.month),
          setYear(res.year)
        }
      )
  }, [])

  const data = {
    labels: daysOfMonth.length > 0 ? daysOfMonth : [0, 0],
    datasets: [
      {
        data: rainMeasurement.length > 0 ? rainMeasurement : [0, 0],
        color: (opacity = 1) => `rgba(26, 27, 31, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Dias que ocorreram chuva no mês"]
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <Text style={styles.textStyle}>
        {`Gráfico de chuva do mês de ${month} de ${year}`}
      </Text>
      <LineChart
        bezier
        width={screenWidth}
        data={data}
        height={220}
        chartConfig={chartConfig}
        style={styles.graphic}
        yAxisSuffix="mm"
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.text}>
          CADASTRE-SE PARA RECEBER ALERTAS DE CHUVA
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>RECOMENDAÇÕES DA PREFEITURA DE SANTOS</Text>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          style={{ zIndex: 4 }}
        >
          <View style={styles.informationBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              style={styles.icon}
            />
            <Text
              style={styles.informationText}
            >{`Se estiver numa tempestade, procure um abrigo\nimediatamente (de preferência uma edificação\nou veículo)`}</Text>
          </View>
          <View style={styles.informationBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              style={styles.icon}
            />
            <Text
              style={styles.informationText}
            >{`Se estiver em um local cercado de água, saia\nimediatamente`}</Text>
          </View>
          <View style={styles.informationBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              style={styles.icon}
            />
            <Text
              style={styles.informationText}
            >{`Mantenha distância de objetos altos, tais como\nárvores, postes, antenas e afins`}</Text>
          </View>
          <View style={styles.informationBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              style={styles.icon}
            />
            <Text
              style={styles.informationText}
            >{`Afaste-se de objetos metálicos grande e que\ntenham exposição aberta`}</Text>
          </View>
          <View style={styles.informationBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              style={styles.icon}
            />
            <Text
              style={styles.informationText}
            >{`Desconecte todos os seus aparelhos eletrô-\nnicos das tomadas (ou desligue o disjuntor)`}</Text>
          </View>
          <View style={styles.informationBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              style={styles.lastIcon}
            />
            <Text
              style={styles.informationText}
            >{`Não utilizar aparelhos conectados a fiação\n elétrica`}</Text>
          </View>      
          <View style={styles.lastBox}>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              size={45}
              marginTop={10}
              style={styles.icon}
            />
            <Text
              style={styles.informationText}
            >{`ATENÇÃO\n`}</Text>
            <Text
              style={styles.informationText}
            >{`Para moradores de área de risco, se depararem\ncom algumas dos seguintes sinais:\n\n- Sinais de deslizamentos, trincas e rachaduras no solo;\n\n- Aparecimento de degrau ou rebaixamento do terreno;\n\n- Inclinação de árvores, cercas ou muros;\n\n- Valas com águas mais barrentas do que o normal;\n\n- Muros estufados, estalos ou aumento das trincas\n em paredões rochosos\n\n`}
            </Text>
            <Text
              style={styles.informationText}
            >
              {`LIGUE IMEDIATAMENTE PARA 199`}
            </Text>
          </View>     
        </ScrollView>
      </View>
      <StatusBar hidden={true}></StatusBar>
      <View style={styles.overlay} />
    </ImageBackground>
  );
}

const chartConfig = {
  backgroundColor: "#77A1D3",
  backgroundGradientFrom: "#77A1D3",
  backgroundGradientTo: "#77A1D3",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#1a1b1f",
  },
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
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
  textStyle: {
    color: "white",
    zIndex: 3,
    marginTop: 40,
    fontSize: 16,
  },
  graphic: {
    zIndex: 3,
    marginTop: 9,
    marginVertical: 8,
    borderRadius: 8,
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
  text: {
    color: "white",
    fontSize: 13,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#1a1b1f",
    width: Dimensions.get("window").width,
    zIndex: 3,
    marginTop: 5,
    opacity: 0.8,
    alignItems: "center",
  },
  title: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    zIndex: 10,
  },
  informationBox: {
    height: 76,
    width: 320,
    borderRadius: 10,
    borderColor: "#77A1D3",
    borderWidth: 1,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  informationText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  icon: {
    color: "#FF0000",
    marginLeft: 9,
  },
  lastBox: {
    height: 350,
    width: 320,
    borderRadius: 10,
    borderColor: "#77A1D3",
    borderWidth: 1,
    marginTop: 10,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20
  },
  lastIcon: {
    color: "#FF0000",
    marginLeft: 9,
    marginTop: 10
  },
  graphicLegend: {
    color: "white",
    zIndex: 3
  }
});
