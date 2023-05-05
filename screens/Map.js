import { View, StyleSheet, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const geolocalisationInitial = {
	latitude: 45.15348777096939,
	latitudeDelta: 0.3064543192549749,
	longitude: 5.744055882096291,
	longitudeDelta: 0.24092607200145721,
};

const testLoca = {
	latitude: 45.15348777096939,
	// latitudeDelta: 0.3064543192549749,
	longitude: 5.744055882096291,
	// longitudeDelta: 0.24092607200145721,
};
const logoSpot = require("../assets/images/logo-boite-livre.png");

export default function Map() {
	//fetch data
	const urlLocalTunnel =
		"https://fair-eggs-warn-90-112-199-68.loca.lt";
	// const urlApi = urlLocalTunnel + "/api/v1/books";
	const [spot, setSpot] = useState([]);

	const handleFetch = async () => {
		const req = await fetch(urlLocalTunnel + "/api/v1/spotbooks");
		const result = await req.json();
		console.log(result);
		setSpot(result);
	};
	// console.log(handleFetch());
	useEffect(() => {
		handleFetch();
	}, []);
	const showSpots = () => {
		return spot.map((item, index) => {
			return (
				<Marker
					key={index}
					coordinate={{
						latitude: parseFloat(item.goelocalisation["1"]),
						longitude: parseFloat(item.goelocalisation["2"]),
					}}
					title={item.street}
				/>
			);
		});
	};

	const [region, setRegion] = useState({
		latitude: 45.166672,
		longitude: 5.71667,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
	const onRegionChange = (region) => {
		console.log(region);
	};

	return (
		<View style={styles.container}>
			{/* // Render our MapView  */}
			<MapView
				style={styles.map}
				onRegionChange={onRegionChange}
				initialRegion={geolocalisationInitial}
				//onRegionChangeComplete runs when the user stops dragging MapView
				onRegionChangeComplete={(region) => setRegion(region)}
			>
				{showSpots()}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		flex: 1, //the container will fill the whole screen.
		justifyContent: "flex-end",
		alignItems: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
	imageMarker: {
		width: 30,
		height: 30,
	},
});
