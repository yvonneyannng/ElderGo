import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native'
import React, { useState, useContext } from 'react'
import * as Linking from "expo-linking"

import FunctionTab from '../components/FunctionTab'

import orders from '../assets/orders.png'
import chat from '../assets/chat.png'
import settings from '../assets/settings.png'
import service from '../assets/service.png'
import game from '../assets/game.png'

import { AuthContext } from '../navigation/AuthProvider';

export default function Home({ route, navigation }) {
  const elderID = route.params.msg
  console.log("elderID: " + route.params.msg)

  const [str, setStr] = useState([])
  const getData = async () => { }

  const { login, logout, loading } = useContext(AuthContext);

  // logout alert
  const logOut = () => {
    Alert.alert(
      "確認",
      "是否要登出?",
      [
        { text: "是", onPress: () => { logout(), navigation.navigate("SignIn") } },
        { text: "否", onPress: () => console.log("No Pressed") }
      ]
    )
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>首頁</Text>
        <TouchableOpacity onPress={logOut}>
          <Image source={require('../assets/logout.png')} style={styles.logout} />
        </TouchableOpacity>
      </View>

      {/* ALL THE FUNCTIONS */}
      <View
        style={{
          marginTop: 15,
        }}
      >
        <FunctionTab text="服務下訂" description="下訂想要使用的服務" screen="ServiceRoot" icon={service} id={elderID} />
        <FunctionTab text="歷史訂單" description="查看所有訂單記錄" screen="OrderRecord" icon={orders} id={elderID} />
        <FunctionTab text="聊天室" description="與他人互動" screen="聊天室" icon={chat} id={elderID} />
        <FunctionTab text="遊戲" description="活動大腦" screen="紙牌遊戲" icon={game} id={elderID} />
        <FunctionTab text="設定" description="修改會員資料" screen="Settings" icon={settings} id={elderID} baseUrl={route.params.baseUrl} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2',
  },
  header: {
    flexDirection: "row",
    marginTop: 65,
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
  },
  button: {
    backgroundColor: "#d2a24c",
    alignItems: "center",
    justifyContent: "space-between",
    height: 120,
    width: Math.round(Dimensions.get('window').width) - 50,
    marginTop: 25,
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 30
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643"
  },
  buttonIcon: {
    height: 70,
    width: 70
  },
  buttonDescription: {
    fontSize: 20,
    fontFamily: "Avenir Next",
    color: "#ece6c2",
    fontWeight: "600"
  }
});