//React Native Modal
//import React in our code
import React, { useState } from "react";

//import all the components we are going to use
import {
	Modal,
	View,
	Text,
	StyleSheet,
	Pressable,
	TouchableOpacity,
	Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 150;

const ModalActionBook = (props) => {
	closeModal = (bool, data) => {
		props.changeModalVisible(bool);
		props.setData(data);
	};

	// const testModalConent = this.props.test;
	// const [message, setMessage] = useState();
	return (
		<TouchableOpacity disabled={true} style={styles.container}>
			<View style={styles.modal}>
				<View style={styles.textView}>
					<Text style={[styles.text, { fontSize: 20 }]}>
						{props.test}
					</Text>
					<Text style={styles.text}>{props.test}</Text>
				</View>

				<View style={styles.buttonView}>
					<TouchableOpacity
						style={styles.touchableOpacity}
						onPress={() => closeModal(false, "Cancel")}
					>
						<Text style={[styles.text, { color: "blue" }]}>
							Cancel
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.touchableOpacity}
						onPress={() => closeModal(false, "Ok")}
					>
						<Text style={[styles.text, { color: "blue" }]}>Ok</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#505433",
	},
	modal: {
		paddingTop: 10,
		height: HEIGHT_MODAL,
		backgroundColor: "white",
		width: WIDTH - 60,
		borderRadius: 10,
	},
	text: {
		color: "#3f2949",
		marginTop: 10,
		margin: 5,
		fontSize: 16,
		fontWeight: "bold",
	},
	textView: {
		flex: 1,
		alignItems: "center",
	},
	buttonView: {
		width: "100%",
		flexDirection: "row",
	},
	touchableOpacity: {
		flex: 1,
		paddingVertical: 10,
		alignItems: "center",
	},
});

export default ModalActionBook;
