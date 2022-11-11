import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Button, Dialog, Text, List, Portal } from 'react-native-paper';

import { getChannelDisplayName, kitty } from '../chatkitty';
import Loading from '../components/Loading';
import ActionSheet from 'react-native-actionsheet'

import list from '../images/list.png';
import logout from '../assets/logout.png';
import back from '../assets/back.png';
import home from '../assets/home.png';
import menu from '../assets/menu.png';

export default function HomeScreen({ navigation }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaveChannel, setLeaveChannel] = useState(null);

  const actionSheet = useRef();
  const options = ['圖片 DIY', '加入 / 建立公共聊天室', '取消'];

  const showActionSheet = () => {
    actionSheet.current.show();
  }

  function handleLeaveChannel() {
    kitty.leaveChannel({ channel: leaveChannel }).then(() => {
      setLeaveChannel(null);

      kitty.getChannels({ filter: { joined: true } }).then((result) => {
        setChannels(result.paginator.items);
      });
    });
  }

  function handleDismissLeaveChannel() {
    setLeaveChannel(null);
  }

  const isFocused = useIsFocused();

  useEffect(() => {
    let isCancelled = false;

    kitty.getChannels({ filter: { joined: true } }).then((result) => {
      if (!isCancelled) {
        setChannels(result.paginator.items);

        if (loading) {
          setLoading(false);
        }
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [isFocused, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>聊天室</Text>
          </View>
        <TouchableOpacity onPress={showActionSheet}>
          <Image source={menu} style={styles.homeIcon}/>
        </TouchableOpacity>
      </View>

      {/* RECORD LIST */}
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <List.Item
            title={getChannelDisplayName(item)}
            description={item.type === 'DIRECT' ? '私人' : '群組'}
            titleNumberOfLines={1}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            descriptionNumberOfLines={1}
            onPress={() => navigation.navigate('Chat', { channel: item })}
            onLongPress={() => { setLeaveChannel(item) }}
            style={styles.chat}
          />
        )}
      />
      <Portal>
        <Dialog visible={leaveChannel} onDismiss={handleDismissLeaveChannel} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>確定離開此聊天室?</Dialog.Title>
          <Dialog.Actions style={{alignSelf: "center"}}>
            <TouchableOpacity onPress={handleDismissLeaveChannel} style={styles.button}>
              <Text style={styles.buttonText}>  取 消  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLeaveChannel} style={styles.button}>
              <Text style={[styles.buttonText, {color: "#cc6b49"}]}>  確 定  </Text>
            </TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ActionSheet
        ref={actionSheet}
        options={options}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index === 0) {
            navigation.navigate('圖片DIY');
          } else if (index === 1) {
            navigation.navigate('公共聊天室');
          }
        }}
      >
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ece6c2',
  },
  header: {
    flexDirection: "row", 
    marginTop: 65,
    // backgroundColor: "black",
    justifyContent: "space-between",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    // marginRight: 190,
    justifyContent: "center",
  },
  homeIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 8
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 20,
    height: 30,
    marginRight: 10,
    marginTop: 11,
  },
  listTitle: {
    fontSize: 25,
    marginLeft: 2,
    color: '#000000',
  },
  listDescription: {
    fontSize: 20,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  dialog: {
    borderRadius: 10,
    backgroundColor: '#ece6c2'
  },
  chat: {
    marginTop: 15,
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 55,
    alignSelf: "center",
  },
  chatText: {
    color: "#6f5643",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
  },
  button: {
    marginBottom: 8,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  buttonText: {
    color: "#6f5643",
    fontSize: 25,
    fontWeight: "bold",
  },
  dialogTitle: {
    fontSize: 25,
    alignSelf: "center",
    color: "#6f5643",
    fontWeight: "bold",
    marginTop: 25
  }
});
