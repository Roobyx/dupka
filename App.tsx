// Vendor
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider, Pressable } from 'native-base'
import Icon from 'react-native-vector-icons/Entypo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Platform, StyleSheet } from 'react-native'
import { LogBox } from 'react-native'

// Expo
// import AppLoading from 'expo-app-loading'

// State
//- Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { useAppDispatch, useAppSelector } from './redux/features/hooks'
import { checkIsAdmin, getLoadingState, getLoggedState, logUserOut } from './redux/features/auth/authSlice'

import { auth } from './firebaseSetup'

// Components
//- Screens
import LandingScreen from './src/components/Screens/GlobalWrappers/LandingScreen'
import RegisterScreen from './src/components/Screens/Authentication/RegisterScreen'
import LoginScreen from './src/components/Screens/Authentication/LoginScreen'
import HomeScreen from './src/components/Screens/GlobalWrappers/HomeScreen'
import AddPhotoScreen from './src/components/Screens/Report/TakePhotoScreen'
import BrowsePhotoScreen from './src/components/Screens/Report/BrowsePhotoScreen'
import CreateReportScreen from './src/components/Screens/Report/CreateReportScreen'
//- Molecules
import LoadingIndicator from './src/components/Molecules/LoadingIndicator'


// Nav config
const Stack = createNativeStackNavigator()
let persistor = persistStore(store)

// Ignoring the "Long timer" warning for Android that is caused by long timer in firebase storage
if(Platform.OS !== 'web') {
	LogBox.ignoreLogs(['Setting a timer'])
}

// Creating an additional element to wrap it in the AuthProvider as Expo is missing index.ts which would usually be the wrapepr
const Index = () => {
	const dispatch = useAppDispatch(),
			loaded = useAppSelector(getLoadingState),
			loggedInState = useAppSelector(getLoggedState)
	console.log('Logged on land ', loggedInState)

	const isAdmin = useAppSelector(checkIsAdmin)
	console.log('Is admin: ', isAdmin)

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
					<Stack.Navigator initialRouteName='Home'>
						{ 
							loggedInState ? (
								<>
									<Stack.Screen name="Home" component={HomeScreen} options={{
										headerBackVisible: false,
										headerBackButtonMenuEnabled: false,
											headerRight: () => (
												<Pressable onPress={SignOut}>
													<Icon name="log-out" size={20}/>
												</Pressable>
											),
										}}
									/>
									<Stack.Screen name="AddPhoto" component={AddPhotoScreen} options={{ headerShown: false }} />
									<Stack.Screen name="BrowsePhoto" component={BrowsePhotoScreen} options={{ headerShown: false }} />
									<Stack.Screen name="CreateReport" component={CreateReportScreen} />
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

// The app itself wrapped in providers
export default function App() {
	return (
		<Provider store={store}>
			 <PersistGate loading={null} persistor={persistor}>
				<SafeAreaProvider>
					<NativeBaseProvider>
						<Index />
					</NativeBaseProvider>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	)
}


const styles = StyleSheet.create({
	addPhotoContainer: {
		zIndex: 999999,
		flex: 1
	}
})