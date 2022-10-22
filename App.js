import * as React from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'

// ================= shared screens ================= //
import SignIn from './SharedScreens/SignIn';
import SignUp from './SharedScreens/SignUp';
import Settings from './SharedScreens/Settings';

// ================= screens for elderly ================= //
import Home from './ElderScreens/Home';
import ServiceRoot from './ElderScreens/ServiceRoot';
import ServiceType from './ElderScreens/ServiceType';
import ServiceList from './ElderScreens/ServiceList';
import OrderDetail from './ElderScreens/OrderDetail';
import Chat from './ElderScreens/Chat';
import OrderRecord from './ElderScreens/OrderRecord';

// ================= screens for volunteer ================= //
import VolunteerHome from './VolunteerScreens/VolunteerHome';
import UnpickedOrders from './VolunteerScreens/UnpickedOrders';
import ServiceDetail from './VolunteerScreens/ServiceDetail';
import ServiceRecord from './VolunteerScreens/ServiceRecord';
import RecordDetail from "./VolunteerScreens/RecordDetail";

const Stack = createStackNavigator();

export default function App() {

  const url = "https://192b-2001-b011-800c-12d4-4a5-8318-927e-58f1.jp.ngrok.io"
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="VolunteerHome" 
          component={VolunteerHome} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="ServiceRoot" 
          component={ServiceRoot} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="ServiceType" 
          component={ServiceType} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="ServiceList" 
          component={ServiceList} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="OrderDetail" 
          component={OrderDetail} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="OrderRecord" 
          component={OrderRecord} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="Chat" 
          component={Chat} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="UnpickedOrders" 
          component={UnpickedOrders} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="ServiceDetail" 
          component={ServiceDetail} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="ServiceRecord" 
          component={ServiceRecord} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="RecordDetail" 
          component={RecordDetail} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />

        <Stack.Screen 
          name="Settings" 
          component={Settings} 
          options={{headerShown: false}} 
          initialParams={{ baseUrl: url}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
