import { 
  Text, 
  StyleSheet, 
  View, 
  TextInput, 
  Image, 
  TouchableOpacity,
  ScrollView, 
  KeyboardAvoidingView, 
  Dimensions,
  Alert
} from 'react-native'

import React, { useState, useEffect } from 'react'
import SelectRole from '../components/SelectRole'

import user from '../assets/user.png'
import lock from '../assets/lock.png'
import login from '../assets/login.png'

export default function SignIn({ route, navigation }) {
  // fetch user's name, phone number, and address from database to set as default values
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState("一般用戶")
  const [comeIn, setComeIn] = useState(0)

  const checkTextInput = () => {
    // Check for empty input
    if (!account.trim() || !password.trim()) {
      Alert.alert(
        "錯誤", 
        "有空白欄位未填寫!",
        [
          {
            text: "好", 
            onPress: () => console.log("OK Pressed")
          }
        ]
      )
      return;
    }

    // Navigation 
    else{
      const url = route.params.baseUrl + '/Members/Login';
      const body = JSON.stringify({
        email: account,
        password: password,
        discriminator: activeTab === "一般用戶" ? 0 : 1
      })
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: body
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          if(responseData.isSuccess == true){
            activeTab === "一般用戶" ? navigation.navigate("Home", {msg: responseData.id}) : navigation.navigate("VolunteerHome", {msg: responseData.id})
          }else{
            if (responseData.errorMessage == "密碼錯誤"){
              Alert.alert(
                "錯誤", 
                "密碼錯誤!",[{
                  text: "好", 
                  onPress: () => console.log("OK Pressed")
                }]
              )
            } else if (responseData.errorMessage == "無此帳號或身分別錯誤"){
              Alert.alert(
                "錯誤", 
                "帳號不存在/身份別錯誤!",[{
                  text: "好", 
                  onPress: () => console.log("OK Pressed")
                }]
              )
            }
          }
        })
        .catch((error) => {
          console.log('login error: ' + error);
        })
      setComeIn(1)
    }
  }

  useEffect(() => {
    if(comeIn === 1) {
      checkTextInput();
    }
  }, []);

  const textInput = (icon, placeholder, onChangeText, value, secure) => {
    return(
      <View style={styles.inputBlock}>
        <Image source={icon} style={styles.inputIcon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="white"
          onChangeText={onChangeText}
          value={value}
          style={styles.textInput}
          secureTextEntry={secure}
        />
      </View>
    )
  }

  const deviceWidth = Math.round(Dimensions.get('window').width);
  const signIn = () => {
    return(
      // () => {checkTextInput, login(account, password)}
      // <TouchableOpacity style={styles.singInButton} onPress={checkTextInput}>
      //   <Text style={styles.singInButtonText}>登入</Text>
      //   <Image source={login} style={styles.buttonIcon} />
      // </TouchableOpacity>
      <TouchableOpacity style={styles.singInButton} onPress={() => {navigation.navigate("Home")}}>
        <Text style={styles.singInButtonText}>登入</Text>
        <Image source={login} style={styles.buttonIcon} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: deviceWidth}}>
          <Text style={styles.pageTitle}>登入</Text>

          <View style={{height: 20}}></View>
          <SelectRole activeTab={activeTab} setActiveTab={setActiveTab} />

          <View style={{height: 30}}></View>
          {/* blocks for username, password input */}
          {textInput(user, '帳號（Email）', setAccount, account, false)}
          {textInput(lock, '密碼', setPassword, password, true)}
          
          {signIn(account, password)}

          {/* sign up button */}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>新用戶註冊</Text>
            </View>
          </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ece6c2'
  },
  pageTitle: {
    fontSize: 45, 
    fontWeight: "bold",
    marginTop: 130,
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 8
  },
  inputBlock: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    paddingHorizontal: 10,
    marginBottom: 50,
    backgroundColor: "#d2a24c",
    fontSize: 20,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "black",
    letterSpacing: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  textInput: {
    fontSize: 20,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    letterSpacing: 1,
    shadowColor: "black",
    flexDirection: "row",
    flex: 1
  },
  inputIcon: {
    width: 28,
    height: 28,
    tintColor: "white",
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 12
  },
  singInButton: {
    width: 330,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#cc6b49",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center"
  },
  singInButtonText: {
    fontSize: 28,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    alignSelf: "center",
    letterSpacing: 20,
    marginHorizontal: 5
  },
  buttonIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
    marginHorizontal: 5
  },
  signUpButtonText: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    alignSelf: "center",
    letterSpacing: 20,
    marginLeft: 20
  },
  signUpButton: {
    borderColor: "#cc6b49", 
    borderWidth: 3, 
    alignContent: "center",
    marginTop: 25,
    width: 330,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  }
})