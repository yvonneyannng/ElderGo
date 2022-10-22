import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import lena from '../assets/lena.jpg'

export default function FunctionTab({ text, description, screen, icon, id, baseUrl }) {
  const navigation = useNavigation();
  const [newName, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  // const url = baseUrl + '/Members/GetMember?' + new URLSearchParams({
  //   id: id,
  // });
  // fetch(url, {method: 'GET'})
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     // console.log(responseData);
  //     setName(responseData.name);
  //     setPhone(responseData.phone);
  //     setAddress(responseData.address);
  //   })
  //   .catch((error) => {
  //     console.log('get member error -> ' + error);
  //   })

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(screen, {userID: id, name: newName, phone: phone, address: address})}>
      <View>
        <Text style={styles.buttonText}>{text}</Text>
        <Text style={styles.buttonDescription}>{description}</Text>
      </View>
      
      <Image source={icon} style={styles.buttonIcon}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
})