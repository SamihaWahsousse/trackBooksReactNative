import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import ScanQRCode from "../components/ScanQRCode";

export default function SpotInformation({ route, navigation }) {
	const { user } = useContext(AuthContext);
	const [spotBooks, setSpotBooks] = useState([]);
	const { qrData } = route.params;

	const urlLocalTunnel =
		"https://true-pillows-smile-90-112-199-68.loca.lt";

	const urlApi = urlLocalTunnel + "/api/v1/spotbooks/" + qrData;
	//test

	const getSpot = async () => {
		try {
			const response = await fetch(urlApi);
			const json = await response.json();
			setSpotBooks(json);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getSpot();
	}, [user]);

	return (
		<View style={styles.mainContainer}>
			{/* <Text>Bienvenue sur la page spot Books </Text> */}
			{user ? (
				<View
					style={{
						backgroundColor: "green",
						justifyContent: "center",
					}}
				>
					<Text>Utilisateur connecté : {user.name}</Text>
				</View>
			) : (
				<Text>Veuillez vous connecter ! </Text>
			)}

			{/* {data.role === "admin" ? (
				<Text>welcome admin </Text>
			) : (
				<Text>Welcome guest</Text>
			)} */}
			<Text style={styles.textInformationSpot}>
				Vous êtes sur le Spot Books :{"\n"}
			</Text>
			<View style={{ backgroundColor: "red" }}>
				<Text>
					N° : {spotBooks.id}
					{"\n"}
					Adress : {spotBooks.street}, {spotBooks.zipcode}
				</Text>
			</View>

			<View style={styles.viewButton}>
				<Text style={{ fontSize: 20 }}>
					Veuillez choisir une action:
				</Text>
				<Button
					label={"Emprunter Livre"}
					onPress={() =>
						navigation.navigate("ScanQRCode", {
							typeAction: "BookInformation",
							SpotInformation: spotBooks,
							userChoice: "buttonBorrow",
						})
					}
				/>
				<Button
					label={"Déposer Livre"}
					onPress={() =>
						navigation.navigate("ScanQRCode", {
							typeAction: "BookInformation",
							SpotInformation: spotBooks,
							userChoice: "buttonReturn",
						})
					}
				/>

				<Button
					label="Page précedente"
					onPress={() => navigation.goBack()}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		width: 150,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
	},
	mainContainer: {
		flex: 1,
		backgroundColor: "pink",
	},
	userInformationContainer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		marginTop: 50,
	},
	textInformationSpot: {
		fontSize: 20,
		padding: 20,
		color: "#825144",
		fontWeight: "bold",
	},
	viewButton: {
		// borderBottomColor: "#fff",
		margin: 30,
		padding: 30,
		justifyContent: "center",
		alignItems: "center",
	},
});
