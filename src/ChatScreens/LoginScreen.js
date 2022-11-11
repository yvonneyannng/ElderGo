import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import * as Linking from 'expo-linking';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

import message from '../images/message.gif';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, loading} = useContext(AuthContext);

  const url = "https://fd03-2001-b011-800c-1a77-d00f-5842-369d-8b20.jp.ngrok.io/Members/Login"
  const signin = () => {
    login("222@gmail.com", "123456");
  }

  useEffect(() => {
    signin();
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image source={message}></Image>
      <FormButton
        title="進 入 聊 天 室 →"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => signin()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ece6c2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
    color: '#fff',
  },
  navButtonText: {
    fontSize: 16,
  },
});
