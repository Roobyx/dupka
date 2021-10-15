// React
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

// Expo
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

// Others
// import MapView from 'react-native-maps'
import MapView from 'react-native-maps'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// UI
import { Box, Button, Text } from 'native-base'

// App
import LoggedInTemplate from '../Templates/LoggedTemplate'
import { AuthContext } from '../../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'

const Tab = createNativeStackNavigator()

type Feed = {
	userEmail: string, 
	locationText: string
}

const HomeFeed = ({userEmail, locationText}: Feed) => {
	return (
		<Box>
			<Text> Welcome {userEmail} </Text>
			<Text> Your locations is: {locationText} </Text>
		</Box>
	)
}

type TMapComp = {
	lat: number,
	long: number
}

const HomeMap = ({lat, long}: TMapComp) => {
	return (
		// TODO: Make sure lat/long is NOT undefined before rendring this
		<Box pt={300} style={styles.container}>
			MAP: {lat} / {long}
			<MapView style={styles.map} 
				region={{
					latitude: lat,
					longitude: long,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}}
			/>
		</Box>
	)
}


const HomeScreen: React.FC<Page> = ({navigation}) => {
	const user = useContext(AuthContext)
	const [location, setLocation] = useState<LocationObject>()
	const [errorMsg, setErrorMsg] = useState('')

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}
		
			let location = await Location.getCurrentPositionAsync({})
			setLocation(location)
		})()

		// TODO: Check for potential mem leack (unsubscribe) - Check all other useEffect hooks (2)
		return () => {}
	}, [])

	let locationText = 'Waiting..'

	if (errorMsg) {
		locationText = errorMsg
	} else if (location) {
		locationText = `Lat: ${location.coords.longitude.toString()} / Long: ${location.coords.longitude}`
	}

	return (
		<SafeAreaView>
			<LoggedInTemplate navigation={navigation} >
				{/* <Box pt='10'>
					<Button onPress={() => navigation.navigate('HomeMap', 
									{userEmail: user?.email, locationText: locationText})}> Map </Button>

					<Button onPress={() => navigation.navigate('HomeFeed', 
									{userEmail: user?.email, locationText: locationText})}> Feed </Button>
					
				</Box> */}

				<HomeMap lat={location?.coords.latitude!} long={location?.coords.longitude!} />

				
				


				{/* <Box pt='10'>
					<Tab.Navigator>
						<Tab.Screen name="HomeMap" component={HomeMap} options={{ headerShown: false }} />

						<Tab.Screen name="HomeFeed" component={HomeFeed} options={{ headerShown: false }} />
					</Tab.Navigator>
				</Box> */}
			</LoggedInTemplate>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: Dimensions.get('window').width,
		height: 400,
	},
})

export default HomeScreen

