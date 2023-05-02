import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
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
		"https://true-pillows-smile-90-112-199-68.loca.lt";

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
			//alert(data.avatar);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(user);
	//const userAvatar = JSON.stringify(user.avatar);
	//alert("emm " + userAvatar);
	useEffect(() => {
		getProfile();
	}, []);
	const uriBase =
		"https://raw.githubusercontent.com/SamihaWahsousse/Trackbook-api-images/master/images/avatars/";

	// alert(uri);
	//"C:/Projet%20mobile/trackBooks-application/assets/avatars/avatarHomme.jpg";
	return (
		<View style={styles.mainContainer}>
			<View style={styles.userInformationContainer}>
				{user ? (
					<Text style={styles.textInformationUser}>
						Bienvenue {user.name}
					</Text>
				) : (
					<Text style={styles.textInformationUser}>
						Veuillez vous connecter !
					</Text>
				)}
				<View>
					<Image
						style={styles.imageContainer}
						source={{
							uri: uriBase + user?.avatar,
						}}
					/>
				</View>
				<Text style={[styles.textInformationUser, { fontSize: 18 }]}>
					Veuillez Scanner le QR code du Spot Books
				</Text>
				<Button
					label={"Scannez spot Books"}
					onPress={ScanSpotBooks}
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
	},
	userInformationContainer: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		marginTop: 50,
	},
	textInformationUser: {
		fontSize: 30,
		padding: 20,
		color: "#825144",
		fontWeight: "bold",
	},
});
