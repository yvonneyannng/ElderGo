import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

console.disableYellowBox = true;

export default function Zoom (){


  return (
    <View style={styles.container}>

      <View style={styles.zoomWrapper}>
        <ReactNativeZoomableView
          zoomEnabled={true}
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.25}
          initialZoom={0.9}
          bindToBorders={true}
          style={styles.zoomableView}
        >
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
zoomWrapper: {
  flex: 1,
  overflow: 'hidden',
},
zoomableView: {
  padding: 10,
  backgroundColor: '#fff',
}
});
