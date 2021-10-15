import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box, Text, NativeBaseProvider, Center } from 'native-base'

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
	// console.log("App CU: ", user)

	// On user change set loaded.
	// loaded is used to control the app flow and allow/disallow user manipulating pages to be shown
	useEffect(() => {
		if(user !== undefined) {
			setLoaded(true)
		} else {
			setLoaded(false)
		}

		// TODO: Check for potential mem leack (unsubscribe) - Check all other useEffect hooks
		return () => {}
	}, [user])

	return (
		<>
		{
			loaded ? (
				<NavigationContainer>
					<Stack.Navigator>
						{/* Landing is first to check the logged in user */}
						<Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
						<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
					</Stack.Navigator>
				</NavigationContainer>
			) : (
				<Center height={'100%'} width={{base: '100%'}}>
					<Box bg='teal.400' rounded='xl' size={32}>
						<Center height={'100%'} width={{base: '100%'}}>
							<Text> Loading </Text>
						</Center>
					</Box>
				</Center>
			)
		}
		</>
	)
}

// The app itself
export default function App() {
	return (
		<AuthProvider>
			<NativeBaseProvider>
				<Index />
			</NativeBaseProvider>
		</AuthProvider>
	)
}
