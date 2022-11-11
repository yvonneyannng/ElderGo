import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import home from '../assets/home.png'
import back from '../assets/back.png'

export default function ServiceList({ route, navigation }) {

  const [typeList, setTypeList] = useState([]);
  console.log("[LIST] userID: " + route.params.userID)

  const getTypeList = async () => {
    const url = route.params.baseUrl + '/OrderType/GetAllOrderType';
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setTypeList(responseData);
      })
      .catch((error) => {
        console.log('error  ' + error);
      })
  };

  useEffect(() => { getTypeList() }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* header section: backIcon, pageTitle, homeIcon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{route.params.msg}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={home} style={styles.homeIcon} />
        </TouchableOpacity>
      </View>
      <View style={{height: 10}}/>

      {/* detail services of the type */}
      {typeList.map((type, index) => {
        if(type.mainType === route.params.msg){
          return (
            <TouchableOpacity 
              style={[styles.button, {backgroundColor: "#d2a24c"}]} 
              onPress={() => navigation.navigate("OrderDetail", {
                mType: type.mainType, 
                detail: type.detail, 
                orderId: type.typeId,
                userID: route.params.userID
              })}
              key={index} 
            >
              <Text style={[styles.buttonText, {color: "#6f5643"}]}>{type.detail}</Text>
            </TouchableOpacity>
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
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginRight: 240,
    justifyContent: "center",
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 6
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 5
  },
  button: {
    flexDirection: "row",
    paddingVertical: 18.5,
    alignSelf: "stretch",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15, 
  },
  buttonText: {
    fontSize: 28,
    fontFamily: "Avenir Next",
    marginHorizontal: 15,
    letterSpacing: 2,
    fontWeight: "600"
  }
})