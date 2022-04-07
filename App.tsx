// Vendor
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Badge, HStack, NativeBaseProvider, Pressable, Text, Icon } from 'native-base'
import Ionicon from 'react-native-vector-icons/Ionicons'
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
import AdminFeed from './src/components/Organisms/AdminFeed'
import Profile from './src/components/Organisms/Profile'
import { getUnnaprovedReportsCount, setReports } from './redux/features/reports/reportsSlice'
import { fetchAllReports } from './redux/features/reports/reportOperations'

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
	
	const [shouldSignOut, setShouldSignOut] = useState(false)

	useEffect(() => {
		console.log('UE sign in')
		setShouldSignOut(false)
	}, [])

	useEffect(() => {
		console.log('UE sign out')
		
		if(shouldSignOut) SignOut()
	}, [shouldSignOut])

	// Get All reports on start
	useEffect(() => {
		try {
			(async () => {
				const fetchedReports = await fetchAllReports()
				const parsedReports = JSON.parse(JSON.stringify(fetchedReports))
				dispatch(setReports(parsedReports))
			})()
		} catch(e) {
			console.log('Error on getting all reports: ', e);
		}

		console.log('APP.ts useEffect')
	}, [])

	// Count the pending ones
	const unapprovedReprotsCount = useAppSelector(getUnnaprovedReportsCount)

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
										<Stack.Screen name="Home" component={HomeScreen} 
											options={({ navigation, route }) => ({
												headerBackVisible: false,
												headerBackButtonMenuEnabled: false,
												headerStyle: {
													backgroundColor: '#203a43',
												},
												headerTintColor: '#fff',
												headerTitleStyle: {
													fontWeight: 'bold',
												},
													headerRight: () => {
														return (
															<>
																{isAdmin && (
																	<Pressable px='4' onPress={() => navigation.navigate('Beer Feed')}>
																		<HStack>
																			<Badge colorScheme="info"
																					rounded="999px"
																					zIndex={1}
																					mr={2}
																					variant="outline"
																					alignSelf="flex-end"
																					_text={{
																						fontSize: 6,
																					}}
																			>
																				<Text> {unapprovedReprotsCount} </Text>
																			</Badge>

																			<Icon color={'#fff'} size='sm' as={
																				<Ionicon name="beer-outline" />
																			} />
																		</HStack>
																	</Pressable>
																)}

																<Pressable onPress={
																	() => navigation.navigate('Profile', {
																		setShouldSignOut: setShouldSignOut
																	})
																} mr='10px'>
																	<Icon color={'#fff'} size='sm' as={
																		<Ionicon name="person-circle-outline" />
																	} />
																</Pressable>
															</>
													)},
												}
											)}
										/>
										<Stack.Screen name="Add Photo" component={AddPhotoScreen} options={{ headerShown: false }} />
										<Stack.Screen name="Browse Photo" component={BrowsePhotoScreen} options={{ headerShown: false }} />
										<Stack.Screen name="Create Report" component={CreateReportScreen} 
											options={() => ({
												headerStyle: {
													backgroundColor: '#203a43',
												},
												headerTintColor: '#fff',
												headerTitleStyle: {
													fontWeight: 'bold',
												},
											})}
										/>


										<Stack.Screen name="Profile" component={Profile} 
											options={() => ({
												headerStyle: {
													backgroundColor: '#203a43',
												},
												headerTintColor: '#fff',
												headerTitleStyle: {
													fontWeight: 'bold',
												},
											})}
										/>

										{
											isAdmin &&  <Stack.Screen name="AdminFeed" component={AdminFeed} />
										}
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
					<NativeBaseProvider config={config}>
						<Index />
					</NativeBaseProvider>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	)
}


const styles = StyleSheet.create({
})

const config = {
	dependencies: {
		'linear-gradient': require('expo-linear-gradient').LinearGradient
	}
}