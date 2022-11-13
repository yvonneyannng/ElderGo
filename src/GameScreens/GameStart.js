import React from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import back from '../assets/back.png'

export default function GameStart({ route, navigation }) {
    console.log(route);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={back} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>首頁</Text>

            </View>

            <View style={styles.mainContent}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigation.navigate("Game", {
                        username: route.params.name
                    })
                }}>
                    <Text style={styles.buttonText}>開始遊戲</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>查看排行榜</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>教學指南</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ece6c2',
    },
    header: {
        flexDirection: "row",
        marginTop: 65,
        // backgroundColor: "black",
        alignSelf: "center",
        width: Math.round(Dimensions.get('window').width) - 55,
    },
    backIcon: {
        tintColor: "#6f5643",
        width: 30,
        height: 30,
        marginRight: 10,
        marginTop: 11,
    },
    pageTitle: {
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: "Avenir Next",
        color: "#6f5643",
        letterSpacing: 2,
        marginLeft: 5,
        marginTop: 2
    },
    mainContent: {
        marginTop: 15
    },
    button: {
        backgroundColor: "#d2a24c",
        alignItems: "center",
        justifyContent: "space-between",
        height: 120,
        width: Math.round(Dimensions.get('window').width) - 50,
        marginTop: 25,
        borderRadius: 10,
        flexDirection: "row",
        paddingHorizontal: 30
    },
    buttonText: {
        fontSize: 30,
        fontFamily: "Avenir Next",
        fontWeight: "600",
        color: "#6f5643"
    },
};
