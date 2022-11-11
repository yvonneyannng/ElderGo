import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import LeaderboardCard from '../components/Leaderboard'

import back from '../assets/back.png'

export default function ServiceRoot({ route }) {

  console.log("[ROOT] userID: " + route.params.userID);
  const userID = route.params.userID;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>服務下訂</Text>
      </View>
      
      {/* consists of leaderboard and button for going to category page */}
      <LeaderboardCard id={userID}/>
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
    marginTop: 65,
    // backgroundColor: "black",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginLeft: 5,
    marginTop: 2
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 35,
    marginTop: 10
  }
});