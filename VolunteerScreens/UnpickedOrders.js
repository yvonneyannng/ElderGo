import { SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import home from '../assets/home.png'

export default function UnpickedOrders({ route, navigation }) {

  const [order, setOrder] = useState([]);

  // fetch the orders
  const getOrder = async () => {
    const url = route.params.baseUrl + '/Orders/GetPublishedOrder';
    fetch(url)
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
          <Text style={styles.pageTitle}>待接服務</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={home} style={styles.homeIcon} />
          </TouchableOpacity>
        </View>
        <View style={{height: 20}}></View>
        {order.map((type, index) => {
          return(
            <View>
              <TouchableOpacity
                style={styles.orderCard}
                onPress={() => navigation.navigate(
                  'ServiceDetail', {
                    id: type.orderId, 
                    detail: type.typeDetail,
                    time: type.exeTime,
                    name: type.elderName,
                    descript: type.descript,
                    place: type.place,
                    helper: route.params.userID,
                  })}
                key={index}
              >
                <Text style={styles.orderCardTextStyle}>{type.typeDetail}</Text>
                <Text style={styles.orderCardTextStyle}>{type.exeTime.substring(11, 16)}, {type.exeTime.substring(5, 10)}</Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 10
  },
  orderCard: {
    backgroundColor: "#d2a24c",
    marginBottom: 20,
    width: Math.round(Dimensions.get('window').width) - 50,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center"
  },
  orderCardTextStyle: {
    color: "#6f5643",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
  }
});