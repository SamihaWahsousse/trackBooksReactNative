import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	StatusBar,
} from "react-native";
import React, {
	useLayoutEffect,
	useState,
	useEffect,
	useContext,
} from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { ImageBackground } from "react-native";

const PlaceholderImage = require("../assets/images/bg_homeScreen.png");

const HomeScreen = () => {
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor="#fff" barStyle="dark-content" />

			<ImageBackground
				source={PlaceholderImage}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.viewButton}>
					<View>
						<Button
							label={"Login"}
							onPress={() =>
								navigation.navigate("ScanQRCode", {
									typeAction: "Profile",
								})
							}
						/>
					</View>
					<Button
						label={"Spots près de chez vous"}
						onPress={() => navigation.navigate("Map")}
					/>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	viewButton: {
		margin: 30,
		padding: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		shadowColor: "rgba(31, 38, 135, 0.37)",
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowRadius: 32,
		shadowOpacity: 1,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.18)",
	},
	filter: {
		// This style is required to enable backdrop filter on iOS
		// On Android, this has no effect
		backgroundColor: "rgba(0, 0, 0, 0.01)",
	},
	image: {
		flex: 1,
		justifyContent: "center",
	},
});
