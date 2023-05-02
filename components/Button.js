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
		<TouchableOpacity
			onPress={onPress}
			style={styles.touchableOpacity}
		>
			<Text style={styles.buttonLabel}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	touchableOpacity: {
		height: 60,
		borderRadius: 30,
		width: 180,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fdfafa",
		marginTop: 10,
		marginBottom: 8,
		borderRadius: 12,
	},

	buttonLabel: {
		fontSize: 16,
		color: "#825144",
		fontWeight: "bold",
	},
});
