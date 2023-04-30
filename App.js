import { StyleSheet } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Menu from "./screens/Menu.js";
import ScanCard from "./components/ScanCard";
import BorrowReturnAction from "./screens/BorrowReturnAction";
import ListBooks from "./screens/ListBooks";
import WelcomePage from "./screens/WelcomePage";
import { useState } from "react";
// import { AuthContext } from "./context/AuthContext";
import TestqrCode from "./screens/TestqrCode";
import ScanSpotBooks from "./screens/ScanSpotBooks";
import SpotBooksInformation from "./screens/SpotBooksInformation";
import BookInformation from "./screens/BookInformation";
import { AuthContext } from "./AuthContext";
import Map from "./screens/Map";
const Stack = createNativeStackNavigator();

export default function App() {
	const [user, setUser] = useState(null);
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<TailwindProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Menu" component={Menu} />
						<Stack.Screen name="ScanCard" component={ScanCard} />
						<Stack.Screen
							name="BorrowReturnAction"
							component={BorrowReturnAction}
						/>
						<Stack.Screen name="ListBooks" component={ListBooks} />
						<Stack.Screen
							name="WelcomePage"
							component={WelcomePage}
						/>
						<Stack.Screen name="TestqrCode" component={TestqrCode} />
						<Stack.Screen
							name="ScanSpotBooks"
							component={ScanSpotBooks}
						/>
						<Stack.Screen
							name="SpotBooksInformation"
							component={SpotBooksInformation}
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
