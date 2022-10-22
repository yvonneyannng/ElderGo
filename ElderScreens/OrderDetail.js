import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  Dimensions, 
  Alert, 
  KeyboardAvoidingView, 
  ScrollView, 
 } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'

import home from '../assets/home.png'
import back from '../assets/back.png'
import colon from '../assets/colon.png'
import slash from '../assets/slash.png'
import lena from '../assets/lena.jpg'
import camera from '../assets/camera.png'

export default function OrderDetail({ route, navigation }) {

  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')

  const [month, setMonth] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  console.log("[DETAIL] userID: " + route.params.userID)

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [imageType, setImageType] = useState(null)

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status === 'granted')
    })()
  })

  // input section for month, date, hour, minute
  const timeInputBlock = (placeholder, onChangeText, value) => {
    return(
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#fff"
        onChangeText={onChangeText}
        value={value}
        style={styles.timeInput}
        maxLength={2}
        keyboardType="numeric"
      />
    )
  }

  // submit the order, passing order information to API
  const submit = () => {
    const url = route.params.baseUrl + '/Orders/PostOrder';
    
    if(month === '' || date === '' || hour === '' || minute === ''){
      Alert.alert(
        "錯誤", 
        "請填寫服務時間!",
        [
          {
            text: "好", 
            onPress: () => console.log("OK Pressed")
          }
        ]
      )
    }else{
      console.log("[DETAIL] userID: " + route.params.userID)
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          elderId: route.params.userID,
          orderTypeId: route.params.orderId,
          place: location,
          descript: description,
          month: month,
          day: date,
          hour: hour,
          min: minute
        })
      })
        .then((response) => response.json())
        .then(() => {
          upload()
        })
        .then((responseData) => {
          console.log(responseData);
        })
        .catch((error) => {
          console.log('order post error -> ' + error);
        })

      // for image
      
      navigation.navigate("Home", {msg: route.params.userID})
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log(result)
    if (!result.cancelled) {
      setImage(result.uri)
      setImageName(result.fileName)
      setImageType(result.type)
    }
  }

  const upload = () => {
    // UPLOAD TO SERVER
    const urlImg = route.params.baseUrl + '/Orders/Image';
    const formData = new FormData();
    formData.append('image', {type: imageType, uri: image, name: imageName});
    fetch(urlImg, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((ex) => {
      console.error("error here" + ex)
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={0}>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: Math.round(Dimensions.get('window').width), paddingHorizontal: 25}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={back} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>訂單內容</Text>
            <TouchableOpacity onPress={() => navigation.pop(4)}>
              <Image source={home} style={styles.homeIcon} />
            </TouchableOpacity>
          </View>

          {/* print selected service type and detail */}
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>項目：</Text>
            <View style={[styles.inputBlock, {height: 55, paddingTop: 10}]}>
              <Text style={styles.service}>
                {/* 類別 → 項目 */}
                {route.params.mType} → {route.params.detail}
              </Text>
            </View>
          </View>

          {/* pick a time */}
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>時間：（必填）</Text>
            <View style={styles.timeInputBlock}>
              {timeInputBlock("月", setMonth, month)}
              <Image source={slash} style={styles.icon} />
              {timeInputBlock("日", setDate, date)}
              <View style={{width: 50}}></View>
              {timeInputBlock("時", setHour, hour)}
              <Image source={colon} style={styles.icon} />
              {timeInputBlock("分", setMinute, minute)}
            </View>
          </View>

          {/* specify location */}
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>地點：</Text>
            <TextInput
              placeholder="輸入地址或地標"
              placeholderTextColor="#fff"
              onChangeText={setLocation}
              value={location}
              style={styles.inputBlock}
              multiline={true}
              maxLength={100}
            />
          </View>

          {/* for detail desscription */}
          <View style={styles.detailView}>
            <Text style={styles.detailTitle}>詳細需求 / 備註：（選填）</Text>
            <TextInput
              placeholder="上限50字"
              placeholderTextColor="#fff"
              onChangeText={setDescription}
              value={description}
              style={styles.inputBlock}
              multiline={true}
              maxLength={50}
            />
          </View>

          <TouchableOpacity onPress={() => pickImage()}>
            <Image 
              source={camera} 
              style={styles.camera}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {image && 
              <Image source={{ uri: image }} style={styles.image} />
            }
          </View>

          {/* submit button */}
          <TouchableOpacity style={styles.submit} onPress={submit}>
            <Text style={styles.submitText}>送出訂單</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginRight: 120
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 25,
    height: 30,
    marginTop: 3,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 18.5,
    alignSelf: "stretch",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 11, 
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5
  },
  buttonText: {
    fontSize: 28,
    fontFamily: "Avenir Next",
    marginHorizontal: 15,
    letterSpacing: 2,
    fontWeight: "600"
  },
  submit: {
    backgroundColor: "#cc6b49",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: Math.round(Dimensions.get('window').width) - 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 35
  },
  submitText: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "white",
    letterSpacing: 30,
    marginLeft: 30
  },
  timeInputBlock: {
    flexDirection: "row", 
    justifyContent: "center", 
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 50,
  },
  timeInput: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
    shadowColor: "black",
    flexDirection: "row",
    width: 63,
    height: 55,
    alignSelf: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 50,
    alignSelf: "center",
    tintColor: "#6f5643"
  },
  detailView: {
    alignItems: "flex-start",
    marginTop: 20,
    borderRadius: 10,
    // backgroundColor: "#d2a24c",
  },
  detailTitle: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    letterSpacing: 1,
    alignSelf: "flex-start",
    padding: 10,
    marginLeft: 5,
  },
  inputBlock: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
    flexDirection: "row",
    width: Math.round(Dimensions.get('window').width) - 50,
    height: 105,
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingTop: 15,
    borderRadius: 10,
    justifyContent: "flex-start",
    backgroundColor: "#d2a24c"
  },
  service: {
    fontSize: 25,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#6f5643",
    letterSpacing: 1,
  },
  imageContainer: {
    width: Math.round(Dimensions.get('window').width) - 50,
    height: 200, 
    padding: 10, 
    borderRadius: 15, 
    backgroundColor: "#d2a24c", 
    alignSelf: "center" 
  },
  image: {
    width: Math.round(Dimensions.get('window').width) - 70,
    height: 180, 
    alignSelf: "center", 
    borderRadius: 10
  },
  camera: {
    tintColor: "#cc6b49",
    height: 30, 
    width: 30
  }
})