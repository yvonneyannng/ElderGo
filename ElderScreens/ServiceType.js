import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image, Dimensions, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'

import home from '../assets/home.png'
import food from '../assets/food.png'
import clothes from '../assets/clothes.png'
import edu from '../assets/edu.png'
import entertainment from '../assets/entertainment.png'
import housing from '../assets/housing.png'
import transpo from '../assets/transpo.png'
import medical from '../assets/medical.png'
import beauty from '../assets/beauty.png'

const icons = [food, clothes, housing, transpo, medical, beauty, edu, entertainment]

export default function ServiceType({ route, navigation }) {

  console.log("[TYPE] userID: " + route.params.userID)
  const [mainType, setMainType] = useState([]);

  const getMainType = async () => {
    const url = route.params.baseUrl + '/OrderType/GetMainType';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setMainType(responseData);
      })
      .catch((error) => {
        console.log('error  ' + error);
      })
  };

  useEffect(() => {
    getMainType();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>選擇類別</Text>
        <TouchableOpacity onPress={() => navigation.pop(2)}>
          <Image source={home} style={styles.homeIcon} />
        </TouchableOpacity>
      </View>
      <View style={{height: 20}}/>

      {/* index, type */}
      {mainType.map((type, index) => {
        if(index % 2 === 0){
          return(
            <View style={styles.view} key={index+20}>
              <TouchableOpacity 
                style={[styles.button, {backgroundColor: "#d2a24c"}]} 
                onPress={() => navigation.navigate("ServiceList", {msg: mainType[index], userID: route.params.userID})}
                key={index}
              >
                <Text style={[styles.buttonText, {color: "#6f5643"}]}>{mainType[index]}</Text>
                <Image source={icons[index]} style={styles.icon}/>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, {backgroundColor: "#d2a24c"}]} 
                onPress={() => navigation.navigate("ServiceList", {msg: mainType[index + 1], userID: route.params.userID})}
                key={index + 1}
              >
                <Text style={[styles.buttonText, {color: "#6f5643"}]}>{mainType[index + 1]}</Text>
                <Image source={icons[index + 1]} style={styles.icon}/>
              </TouchableOpacity>
            </View>
          )
        }
      })}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2'
  },
  header: {
    flexDirection: "row", 
    marginTop: 20,
    // backgroundColor: "black",
    justifyContent: "space-between",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 6
  },
  button: {
    paddingVertical: 15,
    alignSelf: "stretch",
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 5,
    //   height: 5
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    // elevation: 5,
    marginHorizontal: 12,
    marginVertical: 10,
    width: 170,
  },
  buttonText: {
    fontSize: 40,
    fontFamily: "Avenir Next",
    marginLeft: 20,
    letterSpacing: 2,
    fontWeight: "600"
  },
  view: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    // backgroundColor: "#000"
  },
  icon: {
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    marginRight: 15,
  }
})