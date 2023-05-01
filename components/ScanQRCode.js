import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import Profile from "../screens/Profile";
import ListBooks from "../screens/ListBooks";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/native";

export default function ScanQRCode({ navigation, route }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const isFocused = useIsFocused();

	const { typeAction } = route.params;
	const { SpotInformation } = route.params;
	const { userChoice } = route.params;
	//alert("userChoice " + userChoice);

	// const { typeAction } = params != .typeAction;

	//alert(typeAction?.typeAction ? "defined" : "undefined");
	/* const { SpotInformation } = route.params?.SpotInformation
		? route.params.SpotInformation
		: "";*/

	//ici fetch de tout les endpoint (all books/all users/all spots)->stocker dans un array key->valeur(navigation->screen adéquat)
	// alert(typeAction);
	// setScanned(false);
	useEffect(() => {
		setScanned(false);
	}, []);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } =
				await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);

		navigation.navigate(typeAction, {
			qrData: data,
			SpotInformation: SpotInformation,
			userChoice: userChoice,
		});
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.containerSecondPage}>
			{isFocused ? (
				<BarCodeScanner
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={StyleSheet.absoluteFillObject}
				/>
			) : null}

			{scanned && (
				<Button
					label={"Tap to Scan Again"}
					onPress={() => setScanned(false)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	containerSecondPage: {
		backgroundColor: "#505433",
		flex: 1,
		marginTop: 30,
		position: "relative",
	},
	barCodeBox: {
		alignItems: "center",
		justifyContent: "center",
		height: 300,
		width: 300,
		overflow: "hidden",
		borderRadius: 30,
		backgroundColor: "tomato",
	},
});
