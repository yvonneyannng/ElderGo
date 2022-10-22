import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Alert, 
  Image, 
  Dimensions, 
  KeyboardAvoidingView, 
} from 'react-native'
import React, { useState, useEffect } from 'react'

import home from '../assets/home.png'

export default function Settings({ route, navigation }) {
  // const [newName, setName] = useState(route.params.name)
  // const [phone, setPhone] = useState(route.params.phone)
  // const [address, setAddress] = useState(route.params.address)
  // 傳入姓名、電話、地址做為預設值
  const [newName, setName] = useState('name')
  const [phone, setPhone] = useState('phone')
  const [address, setAddress] = useState('addr')
  const [comeIn, setComeIn] = useState(0)

  // save new user data
  const save = () => {
    const url = route.params.baseUrl + '/Members/EditMember';
    if(newName === '' || phone === '' || address === '') {
      Alert.alert(
        "噢不...", 
        "有空白欄位!",
        [
          {
            text: "確定", 
            onPress: () => console.log("Confirm Pressed")
          }
        ]
      )
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: route.params.userID,
          name: newName,
          phone: phone,
          address: address
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if(responseData.isSuccess) {
            Alert.alert(
              "儲存成功", 
              "姓名："+newName+"\n聯絡號碼："+phone+"\n預設地址："+address,
              [
                {
                  text: "確定", 
                  onPress: () => console.log("Confirm Pressed")
                }
              ]
            )
          }
        })
        .catch((error) => {
          console.log('error  ' + error);
        })
      setComeIn(1)
      navigation.goBack()
    }
  }

  useEffect(() => {
    if(comeIn === 1) {
      save();
    }
  }, []);
  // ===========================

  // alert for user clicking 'logout' button
  // yes: back to sign in
  // no: stay in settings
  const logout = () => {
    Alert.alert(
      "確認", 
      "是否確定要登出?",
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

  const Input = (icon, title, pholder, data, setData) => {
    return(
      <View style={styles.inputContainer}>
        <View style={{flexDirection: "row", alignItems: "center", marginLeft: 5}}>
          <Image source={icon} style={{height: 30, width: 30, tintColor: "#cc6b49"}}></Image>
          <Text style={styles.inputTitle}>{title}</Text>
        </View>
        <TextInput 
          style={styles.inputBlock} 
          placeholder={pholder}
          placeholderTextColor="#fff"
          onChangeText={setData}
          value={data}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>設定</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={home} style={styles.home} />
        </TouchableOpacity>
      </View>
      <View style={{height: 10}}></View>

      {/* Name, Phone number, Address */}
      {Input(require("../assets/card.png"), "姓名", "姓名", newName, setName)}
      {Input(require("../assets/phone.png"), "聯絡號碼", "聯絡號碼", phone, setPhone)}
      {Input(require("../assets/address.png"), "預設地址", "預設地址", address, setAddress)}

      {/* Save and Logout button, triggering 'save' and 'logout' alert*/}
      <View style={{flexDirection: "row", marginTop: 30}}>
        <TouchableOpacity style={styles.button} onPress={save}>
          <Text style={[styles.buttonText, {color: "white"}]}>儲     存</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={[styles.buttonText, {color: "white"}]}>登     出</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

// const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2',
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
  home: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 10
  },
  inputContainer: {
    alignSelf: "center",
    marginBottom: 30,
    // backgroundColor: "brown",
    borderRadius: 10,
  },
  inputTitle:{
    fontSize: 25,
    // marginTop: 10,
    marginLeft: 5,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    letterSpacing: 1,
    padding: 10
  },
  inputBlock: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    width: 360,
    padding: 15,
    backgroundColor: "#d2a24c",
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
  },
  button: {
    backgroundColor: "#cc6b49",
    marginHorizontal: 15,
    paddingVertical: 13,
    width: 165,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Avenir Next",
    fontWeight: "600"
  }
});