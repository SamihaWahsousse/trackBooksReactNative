import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import ModalActionBook from "../components/ModalActionBook";

export default function BookInformation({ route }) {
	const { user } = useContext(AuthContext);
	const { SpotInformation } = route.params;
	const { userChoice } = route.params;

	const [book, setbook] = useState([]);
	const { qrData } = route.params;

	const [isModalVisible, setModalVisible] = useState(false);
	const [chooseData, setchooseData] = useState();
	const [message, setMessage] = useState("");

	const changeModalVisible = (bool) => {
		setModalVisible(bool);
	};

	const urlLocalTunnel =
		"https://true-pillows-smile-90-112-199-68.loca.lt";

	const urlApi = urlLocalTunnel + "/api/v1/books/" + qrData;

	//get Book function
	const getBook = async () => {
		try {
			const response = await fetch(urlApi);
			const data = await response.json();
			setbook(data);
			console.log(data);
			if (data) {
				userChoice === "buttonBorrow"
					? borrowBook(data)
					: userChoice === "buttonReturn"
					? returnBook(data)
					: null;
			}
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

	//Borrow Book function
	async function borrowBook(updatedBook) {
		try {
			const response = await fetch(
				urlLocalTunnel +
					"/api/v1/books/" +
					updatedBook.id +
					"/borrowBook",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: user.id,
					}),
				}
			);

			const borrowData = await response.json();
			// console.log(borrowData);
			setMessage(borrowData.Message);
			changeModalVisible(true);
		} catch (error) {
			console.error(error);
		}
	}

	//return book function
	async function returnBook(updatedBook) {
		try {
			const response = await fetch(
				urlLocalTunnel +
					"/api/v1/books/" +
					updatedBook.id +
					"/return",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id: user.id,
					}),
				}
			);
			const returnData = await response.json();
			console.log(returnData.Message);
			setMessage(returnData.Message);
			changeModalVisible(true);
		} catch (error) {
			console.error(error);
		}
	}
	const uriBase =
		"https://raw.githubusercontent.com/SamihaWahsousse/Trackbook-api-images/master/images/couvertureLivre/";

	return (
		<View>
			<Modal
				transparent={true}
				animationStyle="slide"
				visible={isModalVisible}
				nRequestClose={() => changeModalVisible(false)}
			>
				<ModalActionBook
					changeModalVisible={changeModalVisible}
					setData={setData}
					returnedMessage={message}
					returnedBookInformation={book.title}
				/>
			</Modal>
			<View>
				<Text>welcome {user.name}</Text>
				<Text>spotBooks N°:{SpotInformation.id}</Text>
				<Text>book title :{book.title}</Text>
				<View>
					<Image
						style={styles.imageContainer}
						source={{
							uri: uriBase + book?.cover,
						}}
					/>
					<Text>Résumé du livre : {book.summary}</Text>
				</View>
			</View>
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
	imageContainer: {
		width: 200,
		height: 300,
		justifyContent: "center",
		alignItems: "center",
		// borderRadius: 50,
	},
});
