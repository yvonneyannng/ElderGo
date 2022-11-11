import { SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

import back from '../assets/back.png'

// 單筆訂單細節顯示
export default function RecordDetail({ navigation, route }) {

  const [status, setStatus] = useState('');

  console.log("[DETAIL] status: " + route.params.stat);
  console.log("[DETAIL] user: " + route.params.userID);
  console.log("[DETAIL] order: " + route.params.orderID);
  console.log("-----------------------");

  const update = () => {
    const url = route.params.baseUrl + '/Orders/ProcessingOrder?' + new URLSearchParams({
      id: route.params.orderID,
      helper: route.params.userID
    });
    fetch(url, { method: 'PUT'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log('update error -> ' + error);
      })
    navigation.navigate("VolunteerHome", { msg: route.params.userID });
  }

  const complete = () => {
    const url = route.params.baseUrl + '/Orders/FinishedOrder?' + new URLSearchParams({
      id: route.params.orderID,
      helper: route.params.userID
    });
    fetch(url, { method: 'PUT'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log('update error -> ' + error);
      })
    navigation.navigate("VolunteerHome", { msg: route.params.userID });
  }

  const home = () => {
    navigation.navigate("VolunteerHome", { msg: route.params.userID });
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>訂單內容</Text>
      </View>

      {/* display order, time, location, name... here */}

      <TouchableOpacity 
        style={styles.button} 
        onPress={route.params.stat === 1 ? update : route.params.stat === 2 ? complete : home}
      >
        <Text style={styles.buttonText}>
          {route.params.stat === 1 ? "開始服務" : route.params.stat === 2 ? '完成訂單' : '返   回'}
        </Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 70,
    // backgroundColor: "black",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginRight: 20,
    justifyContent: "center",
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 5
  },
  button: {
    width: 330,
    height: 65,
    borderRadius: 10,
    backgroundColor: "#cc6b49",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 28,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    letterSpacing: 20,
    marginLeft: 10
  },
});