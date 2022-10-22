import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView, 
  StyleSheet,
} from 'react-native'
import React, { useState, useEffect } from 'react'

import home from '../assets/home.png'
import address from '../assets/address.png'
import user from '../assets/user.png'
import checked from '../assets/checked.png'
import line from '../assets/line.png'
import status from '../assets/status.png'

export default function ServiceRecord({ route, navigation }) {

  const [order, setOrder] = useState([]);

  // fetch the orders
  const getOrder = () => {
    const url = route.params.baseUrl + '/OrdersHistory/GetHelperHistory?' + new URLSearchParams({
      HelperId: route.params.userID,
    });
    fetch(url, {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setOrder(responseData);
      })
      .catch((error) => {
        console.log('error  ' + error);
      })
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{width: Math.round(Dimensions.get('window').width), paddingHorizontal: 25}}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>歷史訂單</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={home} style={styles.homeIcon} />
          </TouchableOpacity>
        </View>
        <View style={{height: 20}}></View>

        {order.map((type, index) => {
          return(
            <TouchableOpacity key={index} style={styles.recordCard} onPress={() => navigation.navigate("RecordDetail", {stat: type.statu, userID: route.params.userID, orderID: type.id})}>
              <Text key={index} style={styles.recordTitle}>{type.exeTime.substring(5, 7)}月{type.exeTime.substring(8, 10)}日  |  {type.exeTime.substring(11, 16)}</Text>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={checked} style={styles.recordIcon}/>
                <Text style={styles.recordText}>{type.mainType} → {type.typeDetail}</Text>
              </View>
              <Image source={line} style={styles.divider}/>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={user} style={styles.recordIcon}/>
                <Text style={styles.recordText}>{type.elderName}</Text>
              </View>
              <Image source={line} style={styles.divider}/>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={address} style={styles.recordIcon}/>
                <Text style={styles.recordText}>{type.place === "" ? "預設地址" : type.place}</Text>
              </View>
              <Image source={line} style={styles.divider}/>
              <View style={{flexDirection: "row", marginLeft: 10}}>
                <Image source={status} style={styles.recordIcon}/>
                <Text 
                  style={[
                    styles.recordText, 
                    {color: type.statu === 1 ? '#cc6849' : type.statu === 2 ? '#ece6c2' : '#52784c'}
                  ]}
                >
                  {type.statu === 1 ? "已接單" : type.statu === 2 ? "進行中" : "已完成"}
                </Text>
              </View>
              <View style={{height: 5}}></View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
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
    justifyContent: "space-between",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 8
  },
  recordCard: {
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 55,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignSelf: "center",
    marginBottom: 25,
  },
  recordTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    letterSpacing: 2,
    backgroundColor: "#6f5643",
    textAlign: "center",
    padding: 5,
    marginBottom: 15
  },
  recordText: {
    fontSize: 20,
    color: "#6f5643",
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    letterSpacing: 2,
    marginHorizontal: 20,
    // alignSelf: "center",
  },
  recordIcon: {
    width: 30,
    height: 30,
    tintColor: "#6f5643",
  },
  divider: {
    width: 30,
    height: 15,
    tintColor: "#6f5643",
    marginLeft: 10,
    marginVertical: 10
  }
});