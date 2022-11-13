import React, { Component, useState, useEffect, useRef } from "react";
import { View, FlatList, Image, Text, TouchableOpacity, Alert, Dimensions } from "react-native";
import Question from '../assets/question-circle.png';

export default function GameScreen({ route, navigation }) {
    const username = route.params.username;
    const [cards, setCards] = useState([]);
    const [selected_pairs, setSelected_pairs] = useState([]);
    const [score, setScore] = useState(0);
    const [currentS, setCurrentS] = useState([]);
    const [start, setStart] = useState(new Date());
    const [time, setTime] = useState(0);
    const timeRef = useRef();
    const getCards = () => {
        //這裡的網址
        const url = route.params.baseUrl + '/Game/GetRandomImages';
        fetch(url, { method: 'GET' })
            .then((response) => response.json())
            .then((responseData) => {
                setCards(responseData)
            })
            .catch((error) => {
                console.log('error  ' + error);
            })
    }

    const renderCard = ({ item }) => {
        var src;
        if (item.isOpen == true) {
            //這裡的網址
            var imageUrl = route.params.baseUrl + item.url;
            src = { uri: imageUrl };
        }
        else {
            src = Question;
        }
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => clickCard({ item }, item.num)}
                    key={item.num}
                >
                    <Image style={styles.tinyLogo} source={src} />
                </TouchableOpacity>
            </View>
        );
    };

    //點擊後邏輯
    const clickCard = (onclick, num) => {
        var temp = [...cards];
        let select = [...selected_pairs];
        var current = [...currentS];
        if (current.length >= 2) {
            clearTimeout()
            close(current)
        }
        if (onclick.item.isOpen == false) {
            temp[num].isOpen = true;
            current = current.concat(num);
            setCards(temp);
            setCurrentS(current);
            if (current.length == 2) {
                if (cards[current[0]].url == cards[current[1]].url) {
                    if (score == 7) {
                        setScore(0);

                        Alert.alert("Awesome!", "You won the game\n並且耗時" + Math.floor(timeRef.current / 60) + '分' + Math.floor(timeRef.current % 60) + '秒');
                        stopTheGame();
                        return;
                    }
                    setScore(score + 1);
                    setSelected_pairs(select.concat(cards[current[1]].url));
                    setCurrentS([])
                }
                else {
                    setTimeout(() => {
                        close(current)
                    }, 1000);
                }
            }
        }
    }
    const stopTheGame = () => {
        const body = JSON.stringify({
            email: account,
            password: password,
            discriminator: activeTab === "一般用戶" ? 0 : 1
        })
        const url = ''
        fetch(url, { method: "POST" })
    }
    const close = (current) => {
        var temp = [...cards];
        while (current.length > 0) {
            var index = current[current.length - 1];
            temp[index].isOpen = false;
            current.pop();
        }
        setCards(temp)
        setCurrentS([])

    }

    const elapseTime = () => {
        var currentTime = new Date();
        setTime((currentTime - start) / 1000);
    }
    const getTime = () => {
        return time;
    }
    useEffect(() => {
        getCards();
        setStart(new Date())
        const interval = setInterval(() => {
            elapseTime();
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        cards.forEach((item) => {
            renderCard({ item })
        });
    }, [cards]);
    useEffect(() => {
        timeRef.current = time
    }, [time]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.pageTitle}>紙牌遊戲</Text>

            </View>
            <View style={styles.body}>
                <FlatList
                    data={cards}
                    renderItem={renderCard}
                    numColumns={4}
                    keyExtractor={item => item.num}
                    columnWrapperStyle={styles.flatlistRow}
                />
            </View>
            <View style={styles.bottomContent}>
                <View style={styles.score_container}>
                    <Text style={styles.score}>分數：{score}</Text>
                    <Text style={styles.username}>{username}</Text>
                </View>
            </View>
            <View style={[styles.score_container]}>
                <Text style={styles.score} >花費時間：{Math.floor(timeRef.current / 60)}:{Math.floor(timeRef.current % 60)}</Text>
            </View>
        </View>
    )
}

const styles = {
    header: {
        flexDirection: "row",
        marginTop: 65,
        alignSelf: "center",
        width: Math.round(Dimensions.get('window').width) - 55,

    },
    pageTitle: {
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: "Avenir Next",
        color: "#6f5643",
        letterSpacing: 2,
        marginLeft: 5,
        marginTop: 2,
        alignSelf: "center"
    },
    flatlistRow: {
        flex: 1,
        padding: 10
    },
    topContent: {
        flex: 1,
        justifyContent: "center"
    },
    bigText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    mainContent: {
        flex: 1
    },
    label: {
        marginBottom: 5,
        fontSize: 15,
        fontWeight: "bold",
        color: "#333"
    },
    tinyLogo: {
        width: 72,
        height: 72,
        margin: 3,
        borderRadius: 8,
    },
    card: {
        backgroundColor: "#d2a24c",
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        width: 75,
        height: 80,
    },
    text_field: {
        width: 200,
        height: 40,
        borderColor: "#bfbfbf",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: '#ece6c2'
    },
    body: {
        marginTop: 10
    },
    bottomContent: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    flatlistRow: {
        flex: 1,
        padding: 10
    },
    username: {
        fontSize: 20
    },
    score: {
        fontSize: 25,
        fontWeight: "bold"
    },
    score_container: {
        flex: 1,
        alignItems: "center"
    }
};
