import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import Button from "../components/Button";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SpotInformation({ route, navigation }) {
	const { user } = useContext(AuthContext);
	const [spotBooks, setSpotBooks] = useState([]);
	const { qrData } = route.params;

	const urlLocalTunnel =
		"https://6675-2a01-cb15-8280-1a00-29be-42ec-4e2b-ade3.ngrok-free.app";

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
			{user ? (
				<View
					style={{
						justifyContent: "center",
						width: "95%",
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "flex-end",
						height: 35,
					}}
				>
					<Text>
						<AntDesign
							name="user"
							style={{
								color: "#4F2916",
								fontSize: 18,
								fontWeight: "bold",
							}}
						/>
					</Text>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: "#4F2916",
						}}
					>
						{user.name}
					</Text>
				</View>
			) : (
				<Text>Veuillez vous connecter !</Text>
			)}

			<Text style={styles.textInformationSpot}>
				Vous êtes sur le Spot Books :{"\n"}
			</Text>
			<View
				style={{
					backgroundColor: "#825144",
					width: "90%",
					alignItems: "center",
					borderRadius: 5,
					marginLeft: 15,
					height: "10%",
					justifyContent: "center",
					marginTop: "5%",
				}}
			>
				<Text style={{ color: "white" }}>
					N° : {spotBooks.id}
					{"\n"}
					Adress : {spotBooks.street}, {spotBooks.zipcode}
				</Text>
			</View>

			<View style={styles.viewButton}>
				<Text style={{ fontSize: 20, color: "#4F2916" }}>
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
					label="Page précédente"
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
		backgroundColor: "#AE806A",
	},

	textInformationSpot: {
		fontSize: 23,
		marginLeft: 50,
		color: "white",
		alignContent: "center",
		height: 40,
		marginTop: 30,
	},
	viewButton: {
		margin: 30,
		padding: 30,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%",
	},
});
