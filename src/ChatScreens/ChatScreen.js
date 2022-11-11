import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  Modal,
  TouchableHighlight,
  View,
  LogBox,
  Image,
  Dimensions 
} from 'react-native';
LogBox.ignoreLogs(['djk']);
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Actions,
  ActionsProps,
  Avatar,
  Bubble,
  GiftedChat,
} from 'react-native-gifted-chat';
import { Text, Button, overlay } from 'react-native-paper';
import PopoverTooltip from 'react-native-popover-tooltip';
import { kitty } from '../chatkitty';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';

import { TooltipMenu } from 'react-native-tooltip-menu';
import Overlay from 'react-native-modal-overlay';

import Tooltip from "react-native-walkthrough-tooltip";
import { startWalkthrough ,WalkthroughProvider ,WalkthroughElement } from 'react-native-walkthrough';

import zhtw from 'dayjs/locale/zh-tw'
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import close from '../images/close.png';
import cancel from '../images/cancel.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ChatScreen({ route, navigation, showNotification }) {
  const { user } = useContext(AuthContext);
  const { channel } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [messagePaginator, setMessagePaginator] = useState(null);
  const [typing, setTyping] = useState(null);

  const [showTip, setTip] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [shouldShowGifSlide, setShouldShowGifSlide] = useState(false);

  const [fileResult, setfileResult] = useState();
  const [shouldShowGif, setShouldShowGif] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const action = (buttonText) => {
    const [status, setStatus] = useState(0);
    return(
      <Text style={styles.textStyle}>{buttonText}</Text>
    )
  }

  const makeTooltipContent = (text) => (
    <View style={styles.tooltipView}>
      <Text style={styles.tooltipText}>{text}</Text>
    </View>
  );

  const speaking= [{
    id: 'speak',
    content: makeTooltipContent("長按可以聆聽訊息"),
  },]
 
  useEffect(() => {
    const startChatSessionResult = kitty.startChatSession({
      channel: channel,
      onReceivedMessage: (message) => {
        setMessages((currentMessages) =>
          GiftedChat.append(currentMessages, [mapMessage(message)])
        );
      },
      onTypingStarted: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(typingUser);
        }
      },
      onTypingStopped: (typingUser) => {
        if (typingUser.id !== user.id) {
          setTyping(null);
        }
      },
      onParticipantEnteredChat: (participant) => {
        showNotification({
          title: `${participant.displayName} 進入聊天室`,
        });
      },
      onParticipantLeftChat: (participant) => {
        showNotification({
          title: `${participant.displayName} 離開聊天室`,
        });
      },
    });

    kitty
      .getMessages({
        channel: channel,
      })
      .then((result) => {
        setMessages(result.paginator.items.map(mapMessage));
        setMessagePaginator(result.paginator);
        setLoadEarlier(result.paginator.hasNextPage);
        setLoading(false);
      });

    return startChatSessionResult.session.end;
  }, [user, channel, showNotification]);

  async function handleSend(pendingMessages) {
    await kitty.sendMessage({
      channel: channel,
      body: pendingMessages[0].text,
    });
  }

  async function handleLoadEarlier() {
    if (!messagePaginator.hasNextPage) {
      setLoadEarlier(false);
      return;
    }
    setIsLoadingEarlier(true);
    const nextPaginator = await messagePaginator.nextPage();
    setMessagePaginator(nextPaginator);
    setMessages((currentMessages) =>
      GiftedChat.prepend(currentMessages, nextPaginator.items.map(mapMessage))
    );
    setIsLoadingEarlier(false);
  }

  function handleInputTextChanged(text) {
    kitty.sendKeystrokes({
      channel: channel,
      keys: text,
    });
  }

  function renderBubble(props) {
    return (
      <WalkthroughProvider>
        <WalkthroughElement id = 'speak'>
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: '#fff',
                },
              }}
            />
        </WalkthroughElement>
      </WalkthroughProvider>
    );
  }

  const opts = {
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  };

  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => <Ionicons name="ios-attach" size={24} color="#6f5643" />}
      options={{
        '選張圖片': async () => {
          const fileResult = await ImagePicker.launchImageLibraryAsync({type:'image'});
          if (fileResult != null) {
            await kitty.sendMessage({
              channel: channel,
              file:  {
                name: fileResult.uri,
                type: 'image',
                uri: fileResult.uri,
                size: fileResult.width*fileResult.height,
              },
              progressListener: {
                onStarted: () => {
                  setLoading(true);
                },

                onProgress: (progress) => {
                  console.log('Upload progress: ' + progress * 100 + '%');
                },

                onCompleted: (result) => {
                  setLoading(false);
                },
              },
            });
          }
        },
        '取消': () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#6f5643"
    />
  );

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    return (
      <View style={styles.video}>
        <Video
          resizeMode="contain"
          shouldPlay={true}
          source={{ uri: currentMessage.video }}
        />
      </View>
    );
  };
  function renderAvatar(props) {
    return (
      <Avatar
        {...props}
        onPressAvatar={(clickedUser) => {
          kitty
            .createChannel({
              type: 'DIRECT',
              members: [{ id: clickedUser._id }],
            })
            .then((result) => {
              navigation.navigate("Chat", { channel: result.channel });
            });
        }}
      />
    );
  }

  function renderFooter() {
    if (typing) {
      return (
        <View style={styles.footer}>
          <Text>{typing.displayName} 正在輸入...</Text>
        </View>
      );
    }

    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <WalkthroughProvider>
      <View style={styles.container}>
        <Tooltip
          isVisible={showTip}
          content={
            <View style={styles.tooltipView}>
              <Text style={styles.tooltipText}> 點擊探索更多功能 </Text>
            </View>
          }
          placement="bottom"
          topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
          onClose={() => {setTip(false)}}
        >
          <TouchableOpacity style={styles.orderCard} onPress={() => setModalVisible(true)}>
            <Text style={styles.orderCardTextStyle}>小      幫      手</Text>
          </TouchableOpacity>
        </Tooltip>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.cancel} onPress={() => {setModalVisible(!modalVisible);}}>
                <Image source={cancel} style={styles.cancelIcon}/>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.orderTipCard} onPress={() => {setZoom(!zoom);setShouldShowGif(true);setModalVisible(!modalVisible);}}>
                <Text style={styles.modalText}>縮放聊天室畫面</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.orderTipCard} onPress={() => {setShouldShowGifSlide(true);setModalVisible(!modalVisible);}}>
                <Text style={styles.modalText}>右滑回上一頁</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.orderTipCard} onPress={() => {startWalkthrough(speaking);setModalVisible(!modalVisible);}}>
                <Text style={styles.modalText}>長按對話框聆聽訊息</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {shouldShowGif ? (
          <View>
            <TouchableOpacity onPress={() => setShouldShowGif(false)}>
              <Image
                source={require('../images/teach2.gif')}  
                style={{
                  backgroundColor: 'transparent',
                  width: windowWidth - 100,
                  height: 250,
                  alignSelf: 'center',
                  marginTop: 150
                }}
              />
            </TouchableOpacity>
          </View>
          ) : null}

          {shouldShowGifSlide ? (
            <View>
              <TouchableOpacity onPress={() => setShouldShowGifSlide(false)}>
                <Image
                  source={require('../images/teach3.gif')}  
                  style={{
                    backgroundColor: 'transparent',
                    height: 250,
                    alignSelf: 'center',
                    marginTop: 150
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <ReactNativeZoomableView
            zoomEnabled={zoom}
            maxZoom={1.5}
            minZoom={1.0}
            zoomStep={0.25}
            initialZoom={1}
            bindToBorders={true}
          >

          <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={mapUser(user)}
            locale={zhtw}
            loadEarlier={loadEarlier}
            isLoadingEarlier={isLoadingEarlier}
            onLoadEarlier={handleLoadEarlier}
            onInputTextChanged={handleInputTextChanged}
            renderBubble={renderBubble}
            renderAvatar={renderAvatar}
            renderFooter={renderFooter}
            renderActions={renderActions}
            renderMessageVideo={renderMessageVideo}
          />
        </ReactNativeZoomableView>
      </View>
    </WalkthroughProvider>
  );
}

function mapMessage(message) {
  let giftedMessage = {
    _id: message.id,
    text: message.body,
    createdAt: new Date(message.createdTime),
    user: mapUser(message.user),
  };

  let file = message.file;

  if (file) {
    if (/image\/*/.test(file.contentType)) {
      giftedMessage.image = file.url;
    }

    if (/video\/*/.test(file.contentType)) {
      giftedMessage.video = file.url;
    }
  }

  return giftedMessage;
}


function mapUser(user) {
  return {
    _id: user.id,
    name: user.displayName,
    avatar: user.displayPictureUrl,
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ece6c2',
    flex: 1,
  },
  tooltipText: {
    color: 'black',
    fontSize: 20,
    fontWeight:'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  orderCardTextStyle: {
    color: "#6f5643",
    fontWeight: "bold",
    textAlign: "center",
    alignContent:"center",
    justifyContent:"center",
    fontSize: 25,
  },
  modalText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight:'bold',
    marginVertical: 12,
    color: "#6f5643"
  },
  orderTipCard: {
    backgroundColor: "#d2a24c",
    marginBottom: 15,
    width: 300,
    borderRadius: 10,
    padding: 5,
  },
  orderCard: {
    backgroundColor: "#d2a24c",
    marginVertical: 15,
    width: 250,
    borderRadius: 10,
    padding: 15,
    alignSelf: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ece6c2",
    borderRadius: 20,
    paddingVertical: 5,
    alignItems: "center",
    width: 340,
  },
  video: {
    padding: 20,
  },
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: '#ece6c2',
  },
  zoomWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  zoomableView: {
    padding: 100,
    backgroundColor: '#f5f5f5',
  },
  cancel: {
    marginLeft: 275,
    marginBottom: 15,
    marginTop: 10
  },
  cancelIcon: {
    tintColor: '#6f5643',
    width: 35,
    height: 35,
  }
});
