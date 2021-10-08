import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import firebase from 'firebase/app'

// Components
// Pages=
import LandingScreen from './src/components/Screens/LandingScreen'
import RegisterScreen from './src/components/Screens/Credentials/RegisterScreen'
import LoginScreen from './src/components/Screens/Credentials/LoginScreen'
import HomeScreen from './src/components/Screens/HomeScreen'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Move to env
const firebaseConfig = {
	apiKey: "AIzaSyAmRudeXfcJay0MVXu6bCB3HW_hI-5th4c",
	authDomain: "dupka-d8175.firebaseapp.com",
	projectId: "dupka-d8175",
	storageBucket: "dupka-d8175.appspot.com",
	messagingSenderId: "123851857096",
	appId: "1:123851857096:web:8dde6eb348e334e2fa99fd",
	measurementId: "G-VLWFKWNPXH"
}

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig)
}

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>

				<Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Landing screen' }} />
				<Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register screen' }} />
				<Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login screen' }} />
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home screen' }} />
					
			</Stack.Navigator>
		</NavigationContainer>
	)
}
