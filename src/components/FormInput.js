import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { TextInput } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      numberOfLines={1}
      {...rest}
      placeholder={"輸入名稱"}
      color="#6f5643"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
    borderRadius: 10,
    backgroundColor: 'transparent',
    paddingLeft: 15,
    fontSize: 25,
    borderColor: '#d2a24c',
    borderWidth: 3,
    fontWeight: '500',
  },
});
