import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import back from '../assets/back.png'

// id: type.orderId, 
// detail: type.typeDetail,
// time: type.exeTime,
// name: type.elderName,
// descript: type.descript,
// place: type.place

export default function ServiceDetail({ route, navigation }) {

  const orderID = route.params.id;
  const helperID = route.params.helper;

  const receive = ( buttonText ) => {
    return(
      <TouchableOpacity
        style={styles.button}
        onPress={updateOrder}
      >
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    )
  }

  const updateOrder = () => {
    const url = route.params.baseUrl + '/Orders/ReceiveOrder?' + new URLSearchParams({
      id: orderID,
      helper: helperID
    });
    fetch(url, { method: 'PUT'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log('error  ' + error);
      })
    navigation.navigate("VolunteerHome", { msg: helperID });
  }

  const detail = ( title, content ) => {
    if(!content.trim()){
      content = "無"
    }
    return(
      <View style={styles.detailView}>
        <Text style={styles.detailTitle}>{title}</Text>
        <View style={styles.detailContent}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop(2)}>
          <Image source={back} style={styles.homeIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>訂單內容</Text>
      </View>

      <View style={{height: 10}}/>
      {/* {detail("訂單編號", route.params.id)} */}
      {detail("項目", route.params.detail)}
      {detail("服務對象", route.params.name)}
      {detail("時間", route.params.time.substring(11, 16) + ", " + route.params.time.substring(0, 10))}
      {detail("地點", route.params.place)}
      {detail("訂單備註", route.params.descript)}

      {receive("接   單")}
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
    justifyContent: "flex-start",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginTop: 1
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 35,
    marginTop: 10,
    marginRight: 15
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#cc6b49",
    width: Math.round(Dimensions.get('window').width) - 55,
    height: 60,
    marginHorizontal: 15,
    justifyContent: "center",
    marginTop: 15
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Avenir Next",
    letterSpacing: 20,
    marginLeft: 20
  },
  detailView: {
    // backgroundColor: "#4a5846",
    alignItems: "flex-start",
    marginBottom: 20,
    borderRadius: 10,
  },
  detailTitle: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    letterSpacing: 1,
    alignSelf: "flex-start",
    padding: 8,
    marginLeft: 5,
  },
  detailContent: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 55,
    paddingVertical: 10,
    backgroundColor: "#d2a24c",
    alignItems: "flex-start",
  },
  contentText: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
    marginLeft: 12,
  }
});