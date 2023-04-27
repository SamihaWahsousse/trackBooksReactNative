import { View, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";

export default function BookInformation({ route }) {
	const user = useContext(AuthContext);
	// const { userInformation } = route.params;
	const { spotBooksInformation } = route.params;
	const [book, setbook] = useState([]);

	const { qrData } = route.params;

	const urlLocalTunnel =
		"https://wise-cycles-pull-90-112-199-68.loca.lt";

	const urlApi = urlLocalTunnel + "/api/v1/books/" + qrData;
	//alert(JSON.stringify(qrData));

	const getBook = async () => {
		try {
			const response = await fetch(urlApi);
			const data = await response.json();
			alert(JSON.stringify(data));
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

	return (
		<View>
			<Text>welcome {user.dataUser.name}</Text>
			<Text>spotBooks N°:{spotBooksInformation.id}</Text>
			{
				<Text>
					Vous avez déposer/ emprunter le livre :{book.title}
				</Text>
			}
		</View>
	);
}
