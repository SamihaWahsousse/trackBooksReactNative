import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Button from "../components/Button";
import { AuthContext } from "../AuthContext";

export default function ScanSpotBooks({ navigation, route }) {
	const { user } = useContext(AuthContext);
	const { userInformation } = route.params;

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
		// alert(`${data} has been scanned!`);

		navigation.navigate("SpotInformation", {
			qrSpotData: data,
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
});
