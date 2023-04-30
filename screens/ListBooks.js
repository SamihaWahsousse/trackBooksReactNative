import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
// import { AuthContext } from "../context/AuthContext";
import { TextInput } from "react-native";
export default function ListBooks() {
	const urlLocalTunnel =
		"https://ten-meals-stare-90-112-199-68.loca.lt";
	// const urlApi = urlLocalTunnel + "/api/v1/books";
	const [data, setData] = useState(null);
	// const { user, setUser } = useContext(AuthContext);

	const handleFetch = async () => {
		const req = await fetch(urlLocalTunnel + "/api/v1/books");
		const result = await req.json();
		setData(result);
		console.log(data);
	};

	useEffect(() => {
		handleFetch();
	}, []);

	return (
		<SafeAreaView>
			{data ? (
				data.map((item) => <Text key={item.id}>{item.title}</Text>)
			) : (
				<Text>Loading data...</Text>
			)}
		</SafeAreaView>
	);
}
