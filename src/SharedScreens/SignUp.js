import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  KeyboardAvoidingView, 
  Alert 
} from 'react-native'
import SelectRole from '../components/SelectRole'
import React, { useState } from 'react'

import signup from '../assets/signup.png'
import user from '../assets/user.png'
import phone from '../assets/phone.png'
import card from '../assets/card.png'
import address from '../assets/address.png'
import lock from '../assets/lock.png'
import mail from '../assets/mail.png'
// import { ScrollView } from 'react-native-gesture-handler';

export default function SignUp({ route, navigation }) {

  // fetch user's name, phone number, and address from database to set as default values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [addr, setAddr] = useState('')

  const [activeTab, setActiveTab] = useState("一般用戶");

  const checkTextInput = () => {
    // Check for empty input
    if (!name.trim() || !id.trim() || !phoneNumber.trim() || !addr.trim() || !email.trim() || !confirm.trim() || !password.trim()) {
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
    
    // Check for password match
    if(confirm != password){
      Alert.alert(
        "⚠️", 
        "密碼不一致!",
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
      const url = route.params.baseUrl + '/Members/Register';
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          phone: phoneNumber,
          address: addr,
          idNumber: id,
          discriminator: activeTab === "一般用戶" ? 0 : 1
          // 0: elder, 1: helper
        })
      })
      navigation.navigate("SignIn")
    }
  }

  const inputBlock = (icon, placeholder, onChangeText, value, secure) => {
    return(
      <View style={styles.inputContainer}>
        <Image source={icon} style={styles.inputIcon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#fff"
          onChangeText={onChangeText}
          value={value}
          style={styles.inputBlock}
          secureTextEntry={secure}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
        <ScrollView showsVerticalScrollIndicator={false}>
        
          <Text style={styles.pageTitle}>註冊</Text>

          <SelectRole activeTab={activeTab} setActiveTab={setActiveTab} />

          <View style={{height: 3}}/>
          {/* icon, placeholder, setData, data */}
          {inputBlock(mail, 'Email（登入帳號）', setEmail, email, false)}
          {inputBlock(lock, '密碼', setPassword, password, true)}
          {inputBlock(lock, '確認密碼', setConfirm, confirm, true)}
          {inputBlock(user, '姓名', setName, name, false)}
          {inputBlock(card, '身分證字號（年齡驗證）', setId, id, false)}
          {inputBlock(phone, '手機號碼', setPhoneNumber, phoneNumber, false)}
          {inputBlock(address, '預設地址', setAddr, addr, false)}

          <TouchableOpacity style={styles.button} onPress={checkTextInput}>
            <Text style={styles.buttonText}>建立帳號</Text>
            <Image source={signup} style={styles.buttonIcon} />
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
    fontSize: 40, 
    fontWeight: "bold",
    marginTop: 67,
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 8
  },
  inputContainer: {
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#d2a24c",
    fontSize: 20,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "black",
    letterSpacing: 1,
    flexDirection: "row",
    alignSelf: "center"
  },
  inputBlock: {
    fontSize: 20,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    letterSpacing: 1,
    shadowColor: "black",
    flexDirection: "row",
    width: 248
  },
  inputIcon: {
    width: 25,
    height: 25,
    tintColor: "white",
    marginVertical: 15,
    marginLeft: 10,
    marginRight: 12
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
    marginHorizontal: 5
  },
  buttonIcon: {
    width: 40,
    height: 40,
    tintColor: "white",
    marginHorizontal: 5
  }
})