import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'

import FunctionTab from '../components/FunctionTab'

import logout from '../assets/logout.png'
import orders from '../assets/orders.png'
import chat from '../assets/chat.png'
import settings from '../assets/settings.png'
import service from '../assets/service.png'
import game from '../assets/game.png'
// import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Home({ route, navigation }) {

  const elderID = route.params.msg
  console.log("elderID: " + route.params.msg)

  const [str, setStr] = useState([])
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key')
      if(value !== null) {
        setStr(value)
      }
    } catch(e) {
      console.log(e)
    }
  }

  // logout alert
  const logOut = () => {
    Alert.alert(
      "確認", 
      "是否要登出?",
      [
        {
          text: "是", 
          onPress: () => navigation.navigate("SignIn")
        },
        {
          text: "否", 
          onPress: () => console.log("No Pressed")
        }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={getData}>
          <Text style={styles.pageTitle}>首頁</Text>
        </TouchableOpacity>
        <Text>{str}</Text>
        <TouchableOpacity onPress={logOut}>
          <Image source={logout} style={styles.logout} />
        </TouchableOpacity>
      </View>
      <FunctionTab text="服務下訂" description="下訂想要使用的服務" screen="ServiceRoot" icon={service} id={elderID} />
      <FunctionTab text="歷史訂單" description="查看所有訂單記錄" screen="OrderRecord" icon={orders} id={elderID} />
      <FunctionTab text="聊天室" description="與他人互動" screen="Chat" icon={chat} id={elderID} />
      <FunctionTab text="遊戲" description="活動大腦" screen="Chat" icon={game} id={elderID} />
      <FunctionTab text="設定" description="修改會員資料" screen="Settings" icon={settings} id={elderID} baseUrl={route.params.baseUrl} />
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
  logout: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 10
  },
  pageSubtitle: {
    fontSize: 25, 
    fontWeight: "600",
    marginTop: 18,
    marginLeft: 22,
    alignSelf: "flex-start",
    fontFamily: "Avenir Next",
    color: "#fff",
    letterSpacing: 2
  }
});