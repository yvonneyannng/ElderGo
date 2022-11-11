import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import { kitty } from '../chatkitty';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

export default function CreateChannelScreen({ navigation }) {
  const [channelName, setChannelName] = useState('');

  function handleButtonPress() {
    if (channelName.length > 0) {
      kitty
        .createChannel({
          type: 'PUBLIC',
          name: channelName,
        })
        .then(() => navigation.navigate("聊天室"));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6f5643"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>新 建 聊 天 室</Title>
        <FormInput
          labelName="輸入名稱"
          value={channelName}
          onChangeText={(text) => setChannelName(text)}
          clearButtonMode="while-editing"
        />
        {/* <TextInput 
          style={styles.inputBlock} 
          placeholder={pholder}
          placeholderTextColor="#fff"
          onChangeText={setData}
          value={data}/> */}
        {/* <FormButton
          title="點擊創建"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={channelName.length === 0}
          style={styles.button}
        /> */}
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress()}>
          <Text style={styles.buttonText}>點 擊 創 建</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece6c2',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 50,
    color: '#6f5643',
    fontWeight: 'bold',
  },
  buttonLabel: {
    fontSize: 22,
  },
  button: {
    marginTop: 50,
    borderRadius: 10,
    backgroundColor: "#d2a24c",
    width: 200,
    height: 60,
  },
  buttonText: {
    fontSize: 25,
    color: "#6f5643",
    alignSelf: "center",
    marginTop: 14,
    fontWeight: "bold",
  }
});
