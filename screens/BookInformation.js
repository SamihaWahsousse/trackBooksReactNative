import { View, Text, Modal, StyleSheet, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import ModalActionBook from "../components/ModalActionBook";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../components/Button";

export default function BookInformation({ route, navigation }) {
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
		"https://fair-eggs-warn-90-112-199-68.loca.lt";

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
			console.log("updatedBook " + updatedBook.id);
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
			console.log("message " + returnData.Message);
			setMessage(returnData.Message);
			changeModalVisible(true);
		} catch (error) {
			console.error(error);
		}
	}
	const uriBase =
		"https://raw.githubusercontent.com/SamihaWahsousse/Trackbook-api-images/master/images/couvertureLivre/";

	return (
		<View style={styles.maincontainer}>
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
				<View>
					<Text>
						<AntDesign
							name="user"
							style={{
								color: "#4F2916",
								fontSize: 18,
								fontWeight: "bold",
							}}
						/>
						{user.name}
					</Text>
				</View>
				<Text style={{ fontSize: 16, marginLeft: "10%" }}>
					spot Books : {SpotInformation.street},{SpotInformation.city}
				</Text>
				<View>
					<View style={{ height: 500 }}>
						<Text
							style={{
								fontSize: 16,
								marginLeft: "20%",
								margin: 10,
							}}
						>
							Titre : {book.title}
						</Text>
						<View style={{ alignItems: "center" }}>
							<Image
								style={styles.imageContainer}
								source={{
									uri: uriBase + book?.cover,
								}}
							/>
						</View>
						<View>
							<Text style={{ fontSize: 16, alignItems: "center" }}>
								Résumé : {book.summary}
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={{ margin: 40 }}>
				<Button
					label={"Quitter"}
					onPress={() => navigation.navigate("OnboardingScreen")}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	maincontainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "#AE806A",
	},

	buttonModal: {
		width: "25%",
	},
	imageContainer: {
		width: 200,
		height: 300,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		margin: 10,
	},
});
