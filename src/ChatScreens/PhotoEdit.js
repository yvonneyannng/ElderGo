import React, { useState, useRef } from "react";
import {  Alert,Platform, StatusBar, Animated, SafeAreaView,TextInput, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, TouchableHighlight} from 'react-native';
import  { captureScreen }  from  "react-native-view-shot" ;
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { SaveFormat } from 'expo-image-manipulator';
import Draggable from 'react-native-draggable';
import Slider from '@react-native-community/slider';
import Tooltip from "react-native-walkthrough-tooltip";
import { startWalkthrough ,WalkthroughProvider ,WalkthroughElement } from 'react-native-walkthrough';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import font from '../images/font.png'
import palette from '../images/palette.png'
import happy from '../images/happy.png'
import checked from '../images/checked.png'

import diskette from '../images/diskette.png'
import { useEffect } from "react";
const BOTTOM_APPBAR_HEIGHT = 40;

console.disableYellowBox = true;
const WINDOW = Dimensions.get('window');

export default function PhotoEdit({ route }) {
  const { selectedImage } = route.params;
  const makeTooltipContent = (text) => (
    <View style={styles.tooltipView}>
      <Text style={styles.tooltipText}>{text}</Text>
    </View>
  );
  const [count, setCount] = useState(6);
  const colorboard = ["#FF0000", "#FF4500", "#FFFF00", "#008000", "#0000FF", "#800080", "#ff3ea5"];
  const [savedImagePath, setSavedImagePath] = useState(0);

  const [textsize, setTextSize] = useState(20);
  const [showTip, setTip] = React.useState(true);
  const [shouldShowText, setShouldShowText] = useState(false);
  const [shouldShowColor, setShouldShowColor] = useState(false);
  const [shouldShowSticker, setShouldShowSticker] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const [text, onChangeText] = React.useState("點這裡輸入文字...");

  const guiding = [
    {
      id: 'one-botton',
      content: makeTooltipContent("第一步: 點選【文字大小】功能"),
    },
    {
      id: 'one',
      content: makeTooltipContent("左右滑動調整文字大小"),
    },
    {
      id: 'two-botton',
      content: makeTooltipContent("第二步: 點選【文字顏色】功能"),
    },
    {
      id: 'two',
      content: makeTooltipContent("選擇文字顏色"),
    },
    {
      id: 'four-botton',
      content: makeTooltipContent("第三步: 點選【貼圖】功能"),
    },
    {
      id: 'four',
      content: makeTooltipContent("點擊加入貼圖"),
    },
    {
      id: 'five',
      content: makeTooltipContent("第四步: 保存編輯"),
    },
    {
      id: 'six',
      content: makeTooltipContent("最後，保存至相簿!"),
    },
  ];

  useEffect(() => {
    console.log('Updated State', savedImagePath)
  }, [savedImagePath])
  
  const SaveToPhone = () => {
    captureScreen({
    format: 'jpg',
    quality: 0.8, 
    }).then(
      uri =>  {setSavedImagePath(uri)},
      error => console.error("Oops, failed", error),
    )
  };
   
  const SaveToPhone2 = () => {
    ImageManipulator.manipulateAsync(savedImagePath, [{crop:{ height: WINDOW.height/1.4, originX: 0, originY: WINDOW.height/0.81  , width: 1125 }}], { compress: 1, format: SaveFormat.PNG })
    .then(pro=>MediaLibrary.saveToLibraryAsync(pro.uri))
  };

  const heartAnimatedValue = useRef(new Animated.Value(0)).current;
  const omeAnimatedValue = useRef(new Animated.Value(0)).current;
  const smileAnimatedValue = useRef(new Animated.Value(0)).current;
  const hlAnimatedValue = useRef(new Animated.Value(0)).current;

  const hlxVal = hlAnimatedValue.interpolate({inputRange: [0, 1],outputRange: [0, -50],});
  const hlyVal = hlAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, 200],});
  const hlanimStyle = {transform: [{translateY: hlyVal},{translateX: hlxVal}]};
  const movehl = () => {
    Animated.timing(hlAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const heartxVal = heartAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, 200]});
  const heartyVal = heartAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, -170]});
  const heartanimStyle = {transform: [{translateY: heartyVal,},{translateX: heartxVal,}]};
  const moveome = () => {
    Animated.timing(omeAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  
  const omexVal = omeAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, 75]});
  const omeyVal = omeAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, -180]});
  const omeanimStyle = {transform: [{translateY: omeyVal,},{translateX: omexVal,}]};
  const moveheart = () => {
    Animated.timing(heartAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const smilexVal = smileAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, -50]});
  const smileyVal = smileAnimatedValue.interpolate({inputRange: [0, 1], outputRange: [0, -180]});
  const smileanimStyle = {transform: [{translateY: smileyVal},{translateX: smilexVal}]};
  const movesmile = () => {
    Animated.timing(smileAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const colorPalette = (val, colorUri) => {
    return (
      <TouchableOpacity onPress={() => setCount(val)}>
        <Image style={styles.colorimage} source={{uri: colorUri}} />
      </TouchableOpacity>
    );
  }

  return(
    <WalkthroughProvider>
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.pickedimage}/>
        <Appbar
          style={[styles.bottom, {height: 70 + bottom, backgroundColor: '#cc6b49'}]}
          safeAreaInsets={{ bottom }}
        >
          <WalkthroughElement id="one-botton" >
            <TouchableOpacity style={styles.button} onPress={() => {setShouldShowText(!shouldShowText);setShouldShowColor(false);setShouldShowSticker(false);}}> 
              <Image source = {font} style={styles.buttonimage}></Image>
            </TouchableOpacity>
          </WalkthroughElement>

          <WalkthroughElement id="two-botton">
            <TouchableOpacity style={styles.button} onPress={() => {setShouldShowColor(!shouldShowColor);setShouldShowText(false);setShouldShowSticker(false);}}> 
              <Image source = {palette} style={styles.buttonimage}></Image>
            </TouchableOpacity>
          </WalkthroughElement>

          <WalkthroughElement id="four-botton">
            <TouchableOpacity style={styles.button} onPress={() => {setShouldShowSticker(!shouldShowSticker);setShouldShowColor(false);setShouldShowText(false);}}> 
              <Image source = {happy} style={styles.buttonimage}></Image>
            </TouchableOpacity>
          </WalkthroughElement>

          <WalkthroughElement id="five">
            <TouchableOpacity style={styles.button} onPress={() => {SaveToPhone();}}> 
              <Image source = {checked} style={styles.buttonimage}></Image>
            </TouchableOpacity>
          </WalkthroughElement>

          <WalkthroughElement id="six">
            <TouchableOpacity style={styles.button} onPress={() => SaveToPhone2()}> 
              <Image source = {diskette} style={styles.buttonimage}></Image>
            </TouchableOpacity>
          </WalkthroughElement>
        </Appbar>

        <WalkthroughElement id="one">
          {shouldShowText ? (
            <View style={styles.sliderstyle}>
              <Slider
                style={styles.slider}
                value = {textsize}
                minimumValue={10}
                maximumValue={40}
                onValueChange={value => setTextSize(value)}
                color="#cc6b49"
              >
              </Slider>
            </View>
          ) : null}
        </WalkthroughElement>

        <WalkthroughElement id="two">
          {shouldShowColor ? (
            <View style={styles.colorrow}>
              {colorPalette(0, 'https://bit.ly/3W3hgWa')}
              {colorPalette(1, 'https://bit.ly/3DwCUuU')}
              {colorPalette(2, 'https://bit.ly/3N2FhZC')}
              {colorPalette(3, 'https://bit.ly/3Ttrei5')}
              {colorPalette(4, 'https://bit.ly/3W3huN0')}
              {colorPalette(5, 'https://bit.ly/3ssh59p')}
              {colorPalette(6, 'https://bit.ly/3f84IMP')}
            </View> 
          ) : null}
        </WalkthroughElement>

        <Draggable x={WINDOW.width/4.5} y={WINDOW.height/7} renderSize={80}>
          <Animated.View style={[ hlanimStyle]}>
            <Tooltip
              isVisible={showTip}
              content={<View><Text style={styles.tooltipText}> 請先輸入文字 </Text></View>}
              placement="top"
              useInteractionManager={true} 
              topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
              onClose={() => setTip(false)}
            >
              <TextInput
                color = {colorboard[count]}
                LineHeight={textsize}
                fontSize={textsize}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                onSubmitEditing={()=>{{movehl()};{startWalkthrough(guiding)};}}
                style={styles.input}
                onChangeText={onChangeText}
                placeholderTextColor="#cc6b49" 
                placeholder={text}
              />
            </Tooltip>
          </Animated.View>
        </Draggable>

        <Draggable renderSize={60} x={80} y={520}>
          {shouldShowSticker ? (
            <WalkthroughElement id="four">
              <TouchableOpacity onPress={moveheart}>
                <Animated.View style={[styles.sticker, heartanimStyle]}>
                <Image source={require('../images/thumb.png')} style={styles.sticker}/>
                </Animated.View>
              </TouchableOpacity>
            </WalkthroughElement>
          ) : null}
        </Draggable>

        {shouldShowSticker ? (
          <Draggable renderSize={60} x={180} y={520}> 
            <TouchableOpacity onPress={moveome}>
              <Animated.View style={[styles.sticker, omeanimStyle]}>
                <Image source={require('../images/dancer.png')} style={styles.sticker}/>
              </Animated.View>
            </TouchableOpacity>
          </Draggable>
        ) : null}

        {shouldShowSticker ? (
          <Draggable renderSize={60} x={280} y={520}>
            <TouchableOpacity onPress={movesmile}>
              <Animated.View style={[styles.sticker, smileanimStyle]}>
                <Image source={require('../images/smile.png')} style={styles.sticker}/>
              </Animated.View>
            </TouchableOpacity>
          </Draggable>   
        ) : null}
        
      </SafeAreaView>
    </WalkthroughProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ece6c2'
  },
  buttonimage: {
    height: 40,
    width: 40
  },
  button: {
    alignItems: "center",
    padding: 15
  },
  bottom: {
    position: 'absolute',
    justifyContent: 'center',
    left: 20,
    right: 20,
    bottom: 25,
    borderRadius: 10
  },
  input: {
    height: 50,
    width: 240,
    margin: 10,
    padding: 10,
  },
  sticker:{
    width: 60,
    height:60,
  },
  tooltipView: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  tooltipText: {
    color: 'black',
    fontSize: 20,
    fontWeight:'bold'
  },
  sliderstyle:{
    alignItems: 'center', 
    justifyContent: 'center',
    margin : 10
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
  colorrow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorimage:{
    width:40,
    height:40,
    margin: 5,
    padding: 10,
    borderRadius:'50%',
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  pickedimage: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  }
});
