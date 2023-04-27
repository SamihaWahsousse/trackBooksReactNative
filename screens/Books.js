import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

// export default function Books() {
// 	const [books, setBooks] = useState([]);
// 	const [loading, setLoading] = useState(true);

const urlLocalTunnel = "https://jsonplaceholder.typicode.com/posts";
const urlApi = urlLocalTunnel + "/api/v1/books";

//code DOC React Native
const Books = () => {
	const [isLoading, setLoading] = useState(true);
	const [books, setBooks] = useState([]);

	const getBooks = async () => {
		try {
			const response = await fetch(urlLocalTunnel);
			const json = await response.json();
			console.log(response);
			setBooks(json);
			console.log(books);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBooks();
	}, []);

	return (
		<View style={{ flex: 1, padding: 24 }}>
			{/* <Text>{books.title}</Text> */}
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					books={books}
					keyExtractor={({ id }) => id}
					renderItem={({ item }) => (
						<Text>
							{item.title}, {item.author}
						</Text>
					)}
				/>
			)}
		</View>
	);
};

export default Books;

//code samiha
// const getBooksApi = () => {
// fetch(urlApi, {
// 	method: "GET",
// mode: "no-cors",
// headers: {
// 	// pragma: "no-cache",
// 	"Content-Type": "application/json",
// 	"Access-Control-Request-Method": "GET",
// 	"Access-Control-Request-Headers":
// 		"Content-Type, Authorization",
// },
// const getBooksFromApi = () => {
// 	axios
// 		.get(urlApi)
// 		.then(function (response) {
// 			// => setBooks(json.books))
// 			console.log(response);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		})
// 		.finally(() => setLoading(false));

// .then((response) => response.json())
// .then((json) => setBooks(json))
// .catch((error) => console.error(error))
// .finally(() => setLoading(false));

/*code m
	const getBooksApi = async () => {
		try {
			const response = await fetch(urlApi, {
				method: "GET",
				mode: "no-cors",
				headers: {
					"Access-Control-Allow-Origin": "*",
					//"Access-Control-Allow-Credentials": "true",
					//Authorization: "Basic  xxx",
					//Connection: "keep-alive",
					//pragma: "no-cache",
					// 	"Content-Type": "application/json",
					// 	"Access-Control-Request-Method": "GET",
					//"Access-Control-Request-Headers":
					//"Content-Type, Authorization",
				},
			});
			const json = await response.json();

			setBooks(json);
			console.log(json);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getBooksApi();
	}, []);

	console.log(loading);
	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<Text>loading ...</Text>
			) : (
				books.map((item, index) => (
					<View style={styles.item} key={index}>
						<Text style={styles.title}>{item.title}</Text>
						<Text>{item.author}</Text>
					</View>
				))
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 20,
	},
});
*/
