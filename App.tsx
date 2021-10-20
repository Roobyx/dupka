// Vendor
import React from 'react'
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
import { useAppDispatch, useAppSelector } from './redux/features/hooks'
import { getLoadingState, getLoggedState, logUserOut } from './redux/features/auth/authSlice'

import { auth } from './firebaseSetup'

// Components
//- Screens
import LandingScreen from './src/components/Screens/LandingScreen'
import RegisterScreen from './src/components/Screens/authentication/RegisterScreen'
import LoginScreen from './src/components/Screens/authentication/LoginScreen'
import HomeScreen from './src/components/Screens/HomeScreen'
//- Molecules
import LoadingIndicator from './src/components/Molecules/LoadingIndicator'

// Nav config
const Stack = createNativeStackNavigator()
let persistor = persistStore(store)

// Creating an additional element to wrap it in the AuthProvider as Expo is missing index.ts which would usually be the wrapepr
const Index = () => {
	const dispatch = useAppDispatch(),
			loaded = useAppSelector(getLoadingState),
			loggedInState = useAppSelector(getLoggedState)
	console.log('Logged on land ', loggedInState)


	// Sign the user out on demand
	// Clear the local state
	// Cleare Redux state
	// Purge the persisted state
	const SignOut = async () => {
		await auth.signOut()
		dispatch(logUserOut())

		// TODO: Should this be here or in an action? / Should it purge everything?
		persistor.purge()
		console.log('Logged out')
	}

	return (
		<>
		{
			loaded ? (
				<NavigationContainer>
					<Stack.Navigator>
						{ 
							loggedInState ? (
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
				<NativeBaseProvider>
					<Index />
				</NativeBaseProvider>
			</PersistGate>
		</Provider>
	)
}
