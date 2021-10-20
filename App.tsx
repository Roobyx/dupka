// Vendor
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider, Pressable } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

// Expo
// import AppLoading from 'expo-app-loading'

// State
//- Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { AuthProvider } from './src/provider/AuthProvider'
import { auth } from './firebaseSetup'

// Components
//- Pages
import LandingScreen from './src/components/Screens/LandingScreen'
import RegisterScreen from './src/components/Screens/authentication/RegisterScreen'
import LoginScreen from './src/components/Screens/authentication/LoginScreen'
import HomeScreen from './src/components/Screens/HomeScreen'
//- Molecules
import LoadingIndicator from './src/components/Molecules/LoadingIndicator'
import { getFullUserData, getLoggedState, setLoggedOut } from './redux/features/auth/authSlice'
import { useAppSelector } from './redux/features/hooks'


// Nav config
const Stack = createNativeStackNavigator()
let persistor = persistStore(store)

// Creating an additional element to wrap it in the AuthProvider as Expo is missing index.ts which would usually be the wrapepr
const Index = () => {
	// Keep a state of loaded
	const [ loaded, setLoaded ] = useState(false)
	const [ userLoggedIn, setUserLoggedIn ] = useState(false)
	
	const user = useAppSelector(getFullUserData)
	const loggedInState = useAppSelector(getLoggedState)
	console.log('Logged? ', userLoggedIn)

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

	// Keep track of the logged in/out state to switch nav stacks
	useEffect(() => {
		if(loggedInState) {
			setUserLoggedIn(true)
		} else {
			setUserLoggedIn(false)
		}

		// TODO: Check for potential mem leack (unsubscribe) - Check all other useEffect hooks
		return () => {}
	}, [loggedInState])


	// Sign the user out on demand
	// Clear the local state
	// Cleare Redux state
	// Purge the persisted state
	const SignOut = async () => {
		await auth.signOut()
		setUserLoggedIn(false)
		setLoggedOut()
		// TODO: Should this be here or in an action? / Should it purge everything?
		persistor.purge()
		console.log('Logged out ', userLoggedIn)
	}

	return (
		<>
		{
			loaded ? (
				<NavigationContainer>
					<Stack.Navigator>
						{ 
							userLoggedIn ? (
								<>
									<Stack.Screen name="Home" component={HomeScreen} options={{
										headerBackVisible: false,
										headerBackButtonMenuEnabled: false,
											headerRight: () => (
												<Pressable onPress={SignOut}>
													<Icon name="person" size={20}/>
												</Pressable>
											),
										}}
									/>
								</>
							) : (
								<>
									<Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
									<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
									<Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
									
								</>
							)
						}
					</Stack.Navigator>
				</NavigationContainer>

			) : (

				<LoadingIndicator />
			)
		}
		</>
	)
}

// The app itself
export default function App() {
	return (
		<Provider store={store}>
			 <PersistGate loading={null} persistor={persistor}>
				<AuthProvider>
					<NativeBaseProvider>
						<Index />
					</NativeBaseProvider>
				</AuthProvider>
			</PersistGate>
		</Provider>
	)
}
