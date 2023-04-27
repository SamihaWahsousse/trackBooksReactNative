import { View, Text } from "react-native";
import React from "react";

export default function TestqrCode({ route }) {
	const { qrData } = route.params;
	return (
		<View>
			<Text>Welcome {qrData} </Text>
		</View>
	);
}
