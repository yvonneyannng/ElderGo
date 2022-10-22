import { SafeAreaView, Text, StyleSheet, Image, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import home from '../assets/home.png'

export default function Chat({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>聊天室</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={home} style={styles.homeIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#687664'
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
    color: "white",
    letterSpacing: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5
  },
  homeIcon: {
    tintColor: "white",
    width: 35,
    height: 35,
    marginTop: 10
  }
});