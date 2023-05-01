import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Button from "../components/Button";

export default function Profile({ route, navigation }) {
	const { user, setUser } = useContext(AuthContext);

	const ScanSpotBooks = () => {
		navigation.navigate("ScanQRCode", {
			typeAction: "SpotInformation",
		});
	};
	const { qrData } = route.params;
	const urlLocalTunnel =
		"https://new-streets-sleep-90-112-199-68.loca.lt";

	const getProfile = async () => {
		try {
			const response = await fetch(
				urlLocalTunnel + "/api/v1/users/login",
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						uuid: qrData,
					}),
				}
			);
			const data = await response.json();
			setUser(data);
			console.log(user);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<Text>Page Profile</Text>
			{user ? (
				<Text>Welcome {user.name}</Text>
			) : (
				<Text>Veuillez vous connecter</Text>
			)}

			<Button label={"scan spotBooks"} onPress={ScanSpotBooks} />
			<Button label="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}
