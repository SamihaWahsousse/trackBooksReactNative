import { View, Text, StyleSheet, alert } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import Button from "../components/Button";

export default function ScanUser() {
	// const [hasPermission, setHasPermission] = useState(null);
	// const [scanned, setScanned] = useState(false);
	// const [text, setText] = useState("Not yet Scanned");
	// const askForCameraPersmission = () => {
	// 	async () => {
	// 		const { status } =
	// 			await BarCodeScanner.requestPermissionsAsync();
	// 		setHasPermission(status == "granted");
	// 	};
	// };
	// //request Camera Permission
	// useEffect(() => {
	// 	askForCameraPersmission();
	// }, []);
	// //What happens when we scan the bar code
	// const handleBarCodeScanned = ({ type, data }) => {
	// 	setScanned(true);
	// 	setText(data);
	// 	alert(
	// 		`Bar code with type ${type} and data ${data} has been scanned!`
	// 	);
	// };
	// //check permissions and return the screens
	// if (hasPermission === null) {
	// 	return (
	// 		<View style={styles.containerSecondPage}>
	// 			<Text>Requisting for camera permission </Text>
	// 		</View>
	// 	);
	// }
	// if (hasPermission === false) {
	// 	return (
	// 		<View style={styles.containerSecondPage}>
	// 			<Text>No access to camera </Text>
	// 			<Button
	// 				label={"Allow Camera"}
	// 				onPress={() => askForCameraPersmission()}
	// 			/>
	// 		</View>
	// 	);
	// }
	// //return the view when the user click on the authentication button
	// return (
	// 	<View style={styles.container}>
	// 		<View style={styles.barCodeBox}>
	// 			<BarCodeScanner
	// 				onBarCodeScanned={
	// 					scanned ? undefined : handleBarCodeScanned
	// 				}
	// 				className="h-400 w-400"
	// 			/>
	// 		</View>
	// 		<Text style={styles.mainText}>{text}</Text>
	// 		{scanned && (
	// 			<Button
	// 				label={"Scan again"}
	// 				onPress={() => setScanned(false)}
	// 				color="tomato"
	// 			/>
	// 		)}
	// 	</View>
	// );

	///Expo doc
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

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
		alert(
			`Bar code with type ${type} and data ${data} has been scanned!`
		);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.containerSecondPage}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
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
	mainText: {
		fontSize: 16,
		margin: 20,
	},
});
