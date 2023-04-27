import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function Button({ label, onPress }) {
	return (
		<View style={styles.buttonContainer}>
			<Pressable style={styles.button} onPress={onPress}>
				<Text style={styles.buttonLabel}>{label}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: 200,
		height: 30,
		borderRadius: 30,
		justifyContent: "center",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
	},

	buttonLabel: {
		fontSize: 16,
		color: "blue",
	},
});
