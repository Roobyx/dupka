import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box, Text, NativeBaseProvider } from 'native-base'

// Components
// Pages
import LandingScreen from './src/components/Screens/LandingScreen'
import RegisterScreen from './src/components/Screens/authentication/RegisterScreen'
import LoginScreen from './src/components/Screens/authentication/LoginScreen'
import HomeScreen from './src/components/Screens/HomeScreen'

import { AuthProvider } from './src/provider/AuthProvider'
import { AuthContext } from './src/context/AuthContext'

// Nav config
const Stack = createNativeStackNavigator()

// Creating an additional element to wrap it in the AuthProvider as Expo is missing index.ts which would usually be the wrapepr
const Index = () => {
	// Keep a state of loaded
	const [ loaded, setLoaded ] = useState(false)

	// The current user that is either logged in or not
	const user = useContext(AuthContext)

	// On user change set loaded. 
	// loaded is used to control the app flow and allow/disallow user manipulating pages to be shown
	useEffect(() => {
		if(user) {
			setLoaded(true)
		} else {
			setLoaded(false)
		}
	}, [user])

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				{
					loaded ? (
						<Stack.Navigator>
	
							<Stack.Screen name="Landing" component={LandingScreen} options={{ title: 'Landing screen' }} />
							<Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register screen' }} />
							<Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login screen' }} />
							<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home screen' }} />
								
						</Stack.Navigator>
					) : (
						<Box bg='teal.400' rounded='xl' size={24} safeAreaTop={8}>
							<Text> Loading </Text>
						</Box>
					)
				}
			</NavigationContainer>
		</NativeBaseProvider>
	)
}

// The app itself
export default function App() {
	return (
		<AuthProvider>
			<Index />
		</AuthProvider>
	)
}
