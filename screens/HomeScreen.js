import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, {
	useLayoutEffect,
	useState,
	useEffect,
	useContext,
} from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const HomeScreen = () => {
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		// <SafeAreaView>

		/* <View>
				<Text className="font-bold text-lg text-center text-[#E6C89D]">
					Authentication
				</Text>

				<View className="bg-[#878C5C] w-80 h-80 ">
					<Button
						label={"S'authentifier"}
						onPress={() =>
							navigation.navigate("ScanQRCode", {
								typeAction: "Profile",
							})
						}
					/>
					<Button
						label={"Spots près de chez vous"}
						onPress={() => navigation.navigate("Map")}
					/>
				</View>
			</View> */

		// </SafeAreaView>
		<SafeAreaView style={styles.container}>
			<View style={styles.viewButton}>
				<Button
					label={"S'authentifier"}
					onPress={() =>
						navigation.navigate("ScanQRCode", {
							typeAction: "Profile",
						})
					}
				/>
				<Button
					label={"Spots près de chez vous"}
					onPress={() => navigation.navigate("Map")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#505433",
		flex: 1,
		marginTop: 300,
		// position: "relative",
	},
	viewButton: {
		justifyContent: "center",
		alignItems: "center",
	},
});
