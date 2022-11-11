import React, { useState } from "react";
import { 
	ScrollView, 
	Image, 
	StyleSheet, 
	Text, 
	View, 
	Dimensions,
	TouchableOpacity, 
	TouchableHighlight,
	Platform, 
	StatusBar,
} from 'react-native';
import Tooltip from "react-native-walkthrough-tooltip";
import { WalkthroughProvider } from 'react-native-walkthrough';
import { getTheme } from 'react-native-material-kit';

const windowWidth = Dimensions.get('window').width;
import morning from '../images/morning.jpg';
import afternoon from '../images/afternoon.jpg';
import night from '../images/night.jpeg';
import dragon from '../images/dragon.jpg';
import newyear from '../images/newyear.jpg';
import rice from '../images/rice.jpg';
import sun from '../images/sun.png';
import fan from '../images/fan.png';
import mid from '../images/mid.jpg';

export default function PhotoHome({ navigation }) {

  const theme = getTheme();
  const [showTip, setTip] = useState(true);

	const template = (img, uri) => {
		return (
			<TouchableOpacity 
				onPress={() => navigation.navigate("編輯圖片", {selectedImage: {localUri: uri}})} 
				style={styles.card}
			>
				<Image source={img} style={styles.cardImage} />
			</TouchableOpacity>
		)
	}
  return (
    <WalkthroughProvider>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<View style={styles.detailTitleView}>
					<Image source={fan} style={styles.detailIcon}/>
					<Text style={styles.detailTitle}>節日應景</Text>
				</View>
				<View style={styles.card}>
					<Tooltip
						isVisible={showTip}
						content={
							<View>
								<Text style={styles.tooltipText}> 選擇圖片模板 </Text>
							</View>
						}
						placement="top"
						useInteractionManager={true} 
						topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
						onClose={() => setTip(false)}
					>
						<TouchableOpacity onPress={() => navigation.navigate("編輯圖片", {selectedImage: {localUri: 'https://bit.ly/3TPZ9kQ'}})}>
							<Image source={{uri: 'https://bit.ly/3TPZ9kQ'}} style={styles.cardImage}/>
						</TouchableOpacity>
					</Tooltip>
				</View>
				{template(dragon, "https://bit.ly/3FevFcd")}
				{template(mid, "https://bit.ly/3SHXCwo")}
				
				<View style={styles.detailTitleView}>
					<Image source={sun} style={styles.detailIcon}/>
					<Text style={styles.detailTitle}>早晚日常</Text>
				</View>
				
				{template(morning, 'https://bit.ly/3VTHbQl')}
				{template(afternoon, 'https://bit.ly/3N6kYKA')}
				{template(night, 'https://bit.ly/3fa70uJ')}
			</ScrollView>
    </WalkthroughProvider>
  );
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: '#ece6c2',
  },
	header: {
    flexDirection: "row", 
    marginTop: 78,
    // backgroundColor: "black",
    alignSelf: "center",
    width: Math.round(Dimensions.get('window').width) - 55,
		alignItems: "center",
		backgroundColor: '#ece6c2',
  },
  pageTitle: {
    fontSize: 35, 
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#6f5643",
    letterSpacing: 2,
		marginLeft: 5,
  },
  logout: {
    tintColor: "#6f5643",
    width: 35,
    height: 35
  },
	tooltipText: {
		color: 'black',
		fontSize: 20,
		fontWeight:'bold'
	},
	card: {
		height: 190,
		width: Math.round(Dimensions.get('window').width) - 55,
		borderRadius: 10,
		alignSelf: 'center',
		marginBottom: 20
	},
	cardImage:{
		height: 190,
		width: Math.round(Dimensions.get('window').width) - 55,
		borderRadius: 10,
		alignSelf: 'center',
		marginBottom: 20
	},
	model:{
		marginTop: 12,
		borderRadius: 8,
		backgroundColor: "#f4e8c0"
	},
	modeltitle:{
		alignItems: 'center',
		fontSize: 30,
		color:'#000000',
		fontWeight: "bold",
		padding: 4,
		borderBottomColor: "#666",
		borderBottomWidth: StyleSheet.hairlineWidth
	},
  detailIcon: {
    height: 40, 
    width: 40,
    marginLeft: 5,
  },
  detailTitle: {
    fontSize: 30,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    color: "#cc6b49",
    letterSpacing: 1,
    marginLeft: 10,
  },
  detailTitleView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
		marginLeft: 27,
    marginTop: 20,
    marginBottom: 10,
  },
});
