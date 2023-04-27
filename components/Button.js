import {
	View,
	Text,
	StyleSheet,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React from "react";

export default function Button({ label, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonLabel}>{label}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	// buttonContainer: {
	// 	width: 200,
	// 	height: 30,
	// 	borderRadius: 30,
	// 	justifyContent: "center",
	// },
	button: {
		// alignItems: "center",
		// justifyContent: "center",
		borderRadius: 8,
		paddingVertical: 14,
		paddingHorizontal: 10,
	},
	buttonLabel: {
		fontSize: 16,
		color: "blue",
		fontWeight: "bold",
	},
});
