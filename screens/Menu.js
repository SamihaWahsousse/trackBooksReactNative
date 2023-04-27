import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, {
	useLayoutEffect,
	useState,
	useEffect,
	useContext,
} from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
// import { AuthContext } from "../context/AuthContext";

const Menu = () => {
	// const { user } = useContext(AuthContext);
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	const testAuthen = () => {
		navigation.navigate("WelcomePage", {
			qrData: "e33fb95a-1037-409d-b413-982cf1ceaf580021",
		});
	};
	return (
		<SafeAreaView style={styles.containerSecondPage}>
			<View>
				<Text className="font-bold text-lg text-center text-[#E6C89D]">
					Authentication
				</Text>
				<View className="bg-[#878C5C] w-80 h-80 ">
					<Button
						label={"S'authentifier"}
						onPress={() =>
							navigation.navigate("ScanCard", {
								typeAction: "WelcomePage",
							})
						}
					/>
					<Button
						label={"afficher tous les livres"}
						onPress={() => navigation.navigate("ListBooks")}
					/>
					<Button label={"Test Buttun"} onPress={testAuthen} />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Menu;

const styles = StyleSheet.create({
	containerSecondPage: {
		backgroundColor: "#505433",
		flex: 1,
		marginTop: 30,
		position: "relative",
	},
});
