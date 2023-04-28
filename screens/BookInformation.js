import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
// import Button from "../components/Button";
import ModalActionBook from "../components/ModalActionBook";

export default function BookInformation({ route }) {
	const { user } = useContext(AuthContext);
	// const { userInformation } = route.params;
	const { spotBooksInformation } = route.params;
	const [book, setbook] = useState([]);
	const { qrData } = route.params;

	const [isModalVisible, setModalVisible] = useState(false);
	const [chooseData, setchooseData] = useState();

	const changeModalVisible = (bool) => {
		setModalVisible(bool);
	};

	const urlLocalTunnel =
		"https://ten-meals-stare-90-112-199-68.loca.lt";

	const urlApi = urlLocalTunnel + "/api/v1/books/" + qrData;
	//alert(JSON.stringify(qrData));

	const getBook = async () => {
		try {
			const response = await fetch(urlApi);
			const data = await response.json();
			// alert(JSON.stringify(data));
			setbook(data);
			// if(response)
			// user.dataUser = data;
			// user.isLoged = true;
			// console.log(user.dataUser.name);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getBook();
	}, []);

	const setData = (data) => {
		setchooseData(data);
	};

	return (
		<View>
			<Text>welcome {user.name}</Text>
			<Text>spotBooks N°:{spotBooksInformation.id}</Text>
			<Text>Vous avez scanné le livre :{book.title}</Text>
			<View>
				<Text> Que voulez vous faire ? </Text>
			</View>

			<TouchableOpacity
				style={styles.buttonModal}
				onPress={() => {
					changeModalVisible(true);
				}}
			>
				<Text style={styles.text}>Déposer livre</Text>
			</TouchableOpacity>
			<Modal
				transparent={true}
				animationStyle="slide"
				visible={isModalVisible}
				nRequestClose={() => changeModalVisible(false)}
			>
				<ModalActionBook
					changeModalVisible={changeModalVisible}
					setData={setData}
				/>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
		marginTop: 30,
	},
	text: {
		backgroundColor: "orange",
	},
	buttonModal: {
		width: "25%",
	},
});
