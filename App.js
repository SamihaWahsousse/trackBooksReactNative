import { StyleSheet } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen.js";
import ScanQRCode from "./components/ScanQRCode";
// import BorrowReturnAction from "./screens/BorrowReturnAction";
import ListBooks from "./screens/ListBooks";
import Profile from "./screens/Profile";
import { useState } from "react";
// import TestqrCode from "./screens/TestqrCode";
import ScanSpotBooks from "./screens/ScanSpotBooks";
import SpotInformation from "./screens/SpotInformation";
import BookInformation from "./screens/BookInformation";
import { AuthContext } from "./AuthContext";
import Map from "./screens/Map";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const tab = createMaterialBottomTabNavigator();

export default function App() {
	const [user, setUser] = useState(null);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<TailwindProvider>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerStyle: {
								backgroundColor: "#009387",
							},
							headerTintColor: "#fff",
							headerTitleStyle: {
								fontWeight: "bold",
							},
						}}
					>
						<Stack.Screen name="Home" component={OnboardingScreen} />
						<Stack.Screen name="HomeScreen" component={HomeScreen} />
						<Stack.Screen name="ScanQRCode" component={ScanQRCode} />
						<Stack.Screen name="ListBooks" component={ListBooks} />
						<Stack.Screen name="Profile" component={Profile} />
						<Stack.Screen
							name="ScanSpotBooks"
							component={ScanSpotBooks}
						/>
						<Stack.Screen
							name="SpotInformation"
							component={SpotInformation}
						/>
						<Stack.Screen
							name="BookInformation"
							component={BookInformation}
						/>
						<Stack.Screen name="Map" component={Map} />
					</Stack.Navigator>
				</NavigationContainer>
			</TailwindProvider>
		</AuthContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "red",
	},
	firstText: {
		color: "red",
	},

	homeBackground: {
		backgroundColor: "#505433",
	},
	imageContainer: {
		flex: 1,
		paddingTop: 30,
	},
	imagebg: {
		width: 320,
		height: 440,
	},
});
