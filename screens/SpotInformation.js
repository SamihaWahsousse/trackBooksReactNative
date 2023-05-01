import { View, Text } from "react-native";
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
		"https://new-streets-sleep-90-112-199-68.loca.lt";

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
		<View>
			<Text>Page SpotBooks</Text>
			{user ? (
				<Text>Welcome {user.name}</Text>
			) : (
				<Text>Veuillez vous connecter</Text>
			)}

			{/* {data.role === "admin" ? (
				<Text>welcome admin </Text>
			) : (
				<Text>Welcome guest</Text>
			)} */}
			<Text>
				Hi From SpotBooks N° : {spotBooks.id} {"\n"}
				Adress :{spotBooks.street} ,{spotBooks.zipcode}
			</Text>
			<Text>Choisir une action:</Text>

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

			<Button label="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}
