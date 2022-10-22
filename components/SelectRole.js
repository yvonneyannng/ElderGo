import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SelectRole(props) {
  const RadioButton = (props) => (
    <TouchableOpacity
      style={{
        backgroundColor: props.activeTab === props.text ? "#cc6b49" : "transparent",
        borderColor: props.activeTab === props.text ? "transparent" : "#cc6b49",
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 10, 
        marginHorizontal: 10
      }}
      onPress={() => props.setActiveTab(props.text)}
    >
      <Text style={{color: props.activeTab === props.text ? "#fff" : "#cc6b49", fontSize: 25, fontWeight: "600", letterSpacing: 2.5, marginLeft: 2.5}}>{props.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flexDirection: "row", alignSelf: "center", marginBottom: 25}}>
      <RadioButton
        text="一般用戶"
        btnColor="#cc6b49"
        textColor="white"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <RadioButton
        text="志工人員"
        btnColor="white"
        textColor="#cc6b49"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}