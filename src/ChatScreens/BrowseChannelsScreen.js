import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { getChannelDisplayName, kitty } from '../chatkitty';
import Loading from '../components/Loading';

import back from '../images/back.png';
import plus from '../images/plus.png';

export default function BrowseChannelsScreen({ navigation }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    kitty.getChannels({ filter: { joined: false } }).then((result) => {
      setChannels(result.paginator.items);

      if (loading) {
        setLoading(false);
      }
    });
  }, [isFocused, loading]);

  async function handleJoinChannel(channel) {
    const result = await kitty.joinChannel({ channel: channel });

    navigation.navigate('Chat', { channel: result.channel });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
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
            onPress={() => handleJoinChannel(item)}
            style={styles.chat}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ece6c2',
    flex: 1,
  },
  header: {
    flexDirection: "row", 
    marginTop: 20,
    // backgroundColor: "black",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
    marginTop: 70
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
    marginTop: 2
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
  chat: {
    marginTop: 15,
    backgroundColor: "#d2a24c",
    borderRadius: 10,
    width: Math.round(Dimensions.get('window').width) - 30,
    alignSelf: "center",
  },
  chatText: {
    color: "#6f5643",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
  },
  backIcon: {
    tintColor: "#6f5643",
    width: 30,
    height: 35,
    marginTop: 10,
    marginRight: 5
  },
  plusIcon: {
    tintColor: "#6f5643",
    width: 35,
    height: 35,
    marginTop: 10,
    marginLeft: 100
  }
});
