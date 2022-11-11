import { Text, View, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import anne from '../assets/anne.jpg'
import einstein from '../assets/einstein.jpg'
import musk from '../assets/musk.jpg'
import first from '../assets/first.png'
import second from '../assets/second.png'
import third from '../assets/third.png'

export default function LeaderboardCard({ id }) {
  const Card = (photo, medal, name, times) => {
    return (
      <View style={styles.cardContainer}>
        <Image style={styles.cardImgContainer} source={photo}/>
        <View style={{
          flexDirection: "row",
          marginHorizontal: 20,
          alignSelf: "center",
          justifyContent: "space-between",
        }}>
          <Image style={styles.medalIcon} source={medal}/>
          <View style={styles.leaderInfo}>
            <Text style={styles.leaderName}>{name}</Text>
            <Text style={styles.leaderDecription}>目前已累積{'\n'}{times}次服務經驗</Text>
          </View>
        </View>
      </View>
    )
  }

  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.podiums}>排行榜</Text>
      <View style={{height: 490}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollview}>
          <View style={{width: 25}}/>

          {/* fetch top scored volunteers' photo/name/points/focus category to fill in props */}
          {Card(einstein, first, "Einstein", 10)}
          {Card(anne, second, "Anne", 8)}
          {Card(musk, third, "Musk", 7)}
        </ScrollView>
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("ServiceType", {userID: id})}
      >
        <Text style={styles.buttonText}>開  始  下  訂  服  務</Text>
      </TouchableOpacity>
    </View>
  )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  cardContainer:{
    marginTop: 10,
    width: deviceWidth - 70,
    height: 470,
    borderRadius: 10,
    marginRight: 25,
    backgroundColor: "#d2a24c",
  },
  cardImgContainer:{
    height: 300,
    width: deviceWidth - 100,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15
  },
  medalIcon:{
    marginVertical: 27,
    height: 100,
    width: 80,
  },
  leaderInfo:{ 
    height: 150,
    width: 190,
    flexDirection: "column",
  },
  leaderName:{
    marginTop: 21,
    fontSize: 40,
    textAlign: "right",
    color: "white",
    fontWeight: "bold",
    fontFamily: "Avenir Next"
  },
  leaderDecription: {
    fontSize: 20,
    textAlign: "right",
    color: "white",
    fontWeight: "500"
  },
  podiums: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    color: "#cc6b49",
    marginLeft: 27,
    marginTop: 20,
    marginBottom: 5,
    letterSpacing: 2
  },
  scrollview: {
    alignSelf: "flex-start",
    // backgroundColor: "#ece",
    flex: 1
  },
  button: {
    backgroundColor: "#cc6b49",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: deviceWidth - 50,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    color: "white"
  },
  start: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "bold",
    color: "#6f5643",
    alignSelf: "center",
    marginTop: 20
  }
})
