import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
} from "react-native";
import React, { useLayoutEffect, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { AuthContext } from "../AuthContext";

const PlaceholderImage = require("../assets/images/bgImage.png");

const OnboardingScreen = ({ navigation }) => {
	const { user } = useContext(AuthContext);

	const navigation1 = useNavigation();
	useLayoutEffect(() => {
		navigation1.setOptions({
			headerShown: false,
		});
	}, []);
	return (
		<SafeAreaView
			style={styles.ViewContainer}
			className=" items-center justify-center w-200 h-200 bg-slate-500"
		>
			<Image source={PlaceholderImage} className="w-80 h-80" />
			<Text>TrackBook Application </Text>
			<View>
				<Text>
					Emprunter et déposer des livres dans un spot livres d'une
					façon simple et fluide.
				</Text>
			</View>

			<View style={styles.ViewButton}>
				{/* Second section*/}
				<Button
					label={"Get Started"}
					onPress={() => navigation.navigate("HomeScreen")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	// containerHomePage: {
	// 	backgroundColor: "#505433",
	// 	flex: 1,
	// 	marginTop: 30,
	// 	// position: "relative",
	// },
	ViewContainer: {
		backgroundColor: "#505433",
		flex: 1,
	},
	ViewButton: {
		// width: 400,
		backgroundColor: "#E4C89D",
		borderRadius: 10,
	},
});
