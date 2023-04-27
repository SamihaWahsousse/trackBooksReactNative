import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Button from "../components/Button";
import ScanCard from "../components/ScanCard";

export default function WelcomePage({ route, navigation }) {
	const user = useContext(AuthContext);
	// console.log(user);
	// const [comp, setComponent] = useState(false);

	const ScanSpotBooks = () => {
		navigation.navigate("ScanCard", {
			typeAction: "SpotBooksInformation",
		});
	};
	const { qrData } = route.params;
	// console.log(qrData);
	const urlLocalTunnel =
		"https://afraid-hounds-relate-90-112-199-68.loca.lt";

	const getProfil = async () => {
		try {
			const response = await fetch(
				"https://afraid-hounds-relate-90-112-199-68.loca.lt/api/v1/users/login",
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
			// if(response)
			user.dataUser = data;
			user.isLoged = true;
			console.log(user.dataUser.name);
		} catch (error) {
			console.error(erro);
		}
	};

	useEffect(() => {
		getProfil();
	}, []);
	return (
		<View style={{ flex: 1 }}>
			{/* {comp ? <ScanCard /> : null} */}
			<Text>Page Profil</Text>
			{user.isLoged ? (
				<Text>Welcome {user.dataUser.name}</Text>
			) : (
				<Text>Veuillez vous connecter</Text>
			)}

			{/* { {data.role === "admin" ? (
				<Text>welcome admin </Text>
			) : (
				<Text>Welcome guest</Text>
			)} } */}

			<Button label={"scan spotBooks"} onPress={ScanSpotBooks} />
			<Button label="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}
