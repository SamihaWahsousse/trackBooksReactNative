// import { View, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";

export default function BorrowBook({ route }) {
	const user = useContext(AuthContext);
	// const { userInformation } = route.params;
	const { spotBooksInformation } = route.params;
	const qrData = route.param;

	const urlLocalTunnel =
		"https://true-planets-fail-90-112-199-68.loca.lt";

	const urlApi =
		urlLocalTunnel + "/api/v1/books/" + qrData + "/borrowBook";

	const borrowBook = async () => {
		try {
			const response = await fetch(urlApi, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id_book: qrData,
				}),
			});
			const data = await response.json();
			// if(response)
			user.dataUser = data;
			user.isLoged = true;
			console.log(user.dataUser.name);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		borrowBook();
	}, []);

	return (
		<View>
			<Text>welcome {user.dataUser.name}</Text>
			<Text>spotBooks {spotBooksInformation.id}</Text>
			<Text>
				{/* Vous avez déposer/ emprunter le livre :{BookInformation.title} */}
			</Text>
		</View>
	);
}
