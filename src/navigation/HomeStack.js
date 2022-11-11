import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect,useState } from 'react';
import { Platform,View, Text, Button } from 'react-native';
import { IconButton } from 'react-native-paper';

import Tooltip from "react-native-walkthrough-tooltip";
import { getChannelDisplayName, kitty } from '../chatkitty';

// ================= chat screens ================= //
import HomeScreen from '../ChatScreens/HomeScreen';
import BrowseChannelsScreen from '../ChatScreens/BrowseChannelsScreen';
import ChatScreen from '../ChatScreens/ChatScreen';
import CreateChannelScreen from '../ChatScreens/CreateChannelScreen';
import PhotoHome from '../ChatScreens/PhotoHome';
import PhotoEdit from '../ChatScreens/PhotoEdit';

// ================= shared screens ================= //
import SignIn from '../SharedScreens/SignIn';
import SignUp from '../SharedScreens/SignUp';
import Settings from '../SharedScreens/Settings';

// ================= screens for elderly ================= //
import Home from '../ElderScreens/Home';
import ServiceRoot from '../ElderScreens/ServiceRoot';
import ServiceType from '../ElderScreens/ServiceType';
import ServiceList from '../ElderScreens/ServiceList';
import OrderDetail from '../ElderScreens/OrderDetail';
import Chat from '../ElderScreens/Chat';
import OrderRecord from '../ElderScreens/OrderRecord';

// ================= screens for volunteer ================= //
import VolunteerHome from '../VolunteerScreens/VolunteerHome';
import UnpickedOrders from '../VolunteerScreens/UnpickedOrders';
import ServiceDetail from '../VolunteerScreens/ServiceDetail';
import ServiceRecord from '../VolunteerScreens/ServiceRecord';
import RecordDetail from "../VolunteerScreens/RecordDetail";


const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      kitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          'expo-push-token': token,
        };

        return user;
      });
    });
  }, []);

  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen
        name="ChatApp"
        component={withInAppNotification(ChatComponent)}
      />
      <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
    </ModalStack.Navigator>
  );
}

function ChatComponent({ navigation, showNotification }) {
  const [showTip, setTip] = useState(true);
  
  const [shouldShowGifhy, setShouldShowGifhy] = useState(false);
  useEffect(() => {
    return kitty.onNotificationReceived((notification) => {
      showNotification({
        title: notification.title,
        message: notification.body,
        onPress: () => {
          switch (notification.data.type) {
            case 'USER:SENT:MESSAGE':
            case 'SYSTEM:SENT:MESSAGE':
              kitty.getChannel(notification.data.channelId).then((result) => {
                navigation.navigate('Chat', { channel: result.channel });
              });
              break;
          }
        },
      });
    });
  }, [navigation, showNotification]);

  const url = "https://cab5-2001-b011-800c-146b-c461-7c30-3e16-f28c.jp.ngrok.io"
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6f5643' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontSize: 22 }
      }}
    >
      {/* <Stack.Screen name="SignIn" component={SignIn} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUp" component={SignUp} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/> */}
      <Stack.Screen name="Home" component={Home} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="VolunteerHome" component={VolunteerHome} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="ServiceRoot" component={ServiceRoot} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="ServiceType" component={ServiceType} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="ServiceList" component={ServiceList} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderDetail" component={OrderDetail} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderRecord" component={OrderRecord} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="UnpickedOrders" component={UnpickedOrders} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="ServiceRecord" component={ServiceRecord} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="RecordDetail" component={RecordDetail} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="Settings" component={Settings} initialParams={{ baseUrl: url }} options={{ headerShown: false }}/>
      <Stack.Screen name="聊天室" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="圖片DIY" component={PhotoHome} />
      <Stack.Screen name="編輯圖片" component={PhotoEdit}/>
      <Stack.Screen
        name="公共聊天室"
        component={BrowseChannelsScreen}
        options={(options) => ({
          headerRight: () => (
            <IconButton
              icon="plus"
              size={28}
              color="#ffffff"
              onPress={() => options.navigation.navigate("CreateChannel")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Chat"
        component={withInAppNotification(ChatScreen)}
        options={ ({ route }) => ({
          title: getChannelDisplayName(route.params.channel),
        })}
      />
    </Stack.Navigator>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice && Platform.OS !== 'web') {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
