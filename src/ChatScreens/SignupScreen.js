import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import Tooltip from "react-native-walkthrough-tooltip";
import {startWalkthrough ,WalkthroughProvider ,WalkthroughElement, goToWalkthroughElementWithId, dispatchWalkthroughEvent  } from 'react-native-walkthrough';
import PopoverTooltip from 'react-native-popover-tooltip';

export default function SignupScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);
  const [showTip, setTip] = useState(true);
  const makeTooltipContent = (text) => (
    <View style={styles.tooltipView}>
      <Text style={styles.tooltipText}>{text}</Text>
    </View>
  );
  const guiding = [
    {
      id: 'one',
      content: makeTooltipContent("輸入使用者名稱"),
      
    },
    {
      id: 'two',
      content: makeTooltipContent("輸入帳號"),
    },
    {
      id: 'three',
      content: makeTooltipContent("輸入密碼"),
    },
    
    {
      id: 'four',
      content: makeTooltipContent("輸入完成後點擊註冊"),
    },
    {
      id: 'five',
      content: makeTooltipContent("回到上一頁"),
    },
   
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <WalkthroughProvider>
    <View style={styles.container}>
    {/* <PopoverTooltip
          
          buttonComponent={
            <View style={{width:100, height:50, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
              <Text>
                點我看說明
              </Text>
            </View>
          }
          items={[
            {
              label: '~',
            },
           
          ]}
          animationType='spring' 
          springConfig={{tension: 100, friction: 3}} 
          /> */}
    {/* <FormButton
        title="點我看教學"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onPress={() => startWalkthrough(guiding)}
      /> */}
      <Title style={styles.titleText}>創建帳號</Title>
      <WalkthroughElement id="one">
        <FormInput
          labelName="使用者名稱"
          value={displayName}
          autoCapitalize="none"
          onChangeText={(userDisplayName) => setDisplayName(userDisplayName)}
        />
      </WalkthroughElement>
      <WalkthroughElement id="two">
        <FormInput
          labelName="帳號名稱"
          value={email}
          autoCapitalize="none"
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
      </WalkthroughElement>

      <WalkthroughElement id="three">
        <FormInput
          labelName="密碼"
          value={password}
          secureTextEntry={true}
          onChangeText={(userPassword) => setPassword(userPassword)}
        />
      </WalkthroughElement>

      <WalkthroughElement id="four">
        <FormButton
          title="註冊"
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onPress={() => register(displayName, email, password)}
        />
      </WalkthroughElement>

      <WalkthroughElement id="five">
        <IconButton
          icon="keyboard-backspace"
          size={30}
          style={styles.navButton}
          color="#5b3a70"
          onPress={() => navigation.goBack()}
        />
      </WalkthroughElement>
    </View>
    </WalkthroughProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
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
  },
  navButtonText: {
    fontSize: 18,
  },
  navButton: {
    marginTop: 10,
  },
});
