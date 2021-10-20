// React
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'

// Expo
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

// Redux
import { useAppSelector } from '../../../redux/features/hooks'

// Others
// import MapView from 'react-native-maps'
import MapView, { Marker } from 'react-native-maps'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// UI
import { Box, Button, Fab, Flex, Icon, Row, Text } from 'native-base'

// App
import Ionicon from 'react-native-vector-icons/Ionicons'

import LoadingIndicator from '../Molecules/LoadingIndicator'


const Tab = createNativeStackNavigator()


type Feed = {
	userEmail: string, 
	locationText: string
}

const HomeFeed = ({userEmail, locationText}: Feed) => {
	return (
		<Box>
			<Text> Home feed sub-screen </Text>
		</Box>
	)
}

const HomeMap = () => {
	const [loading, setLoading] = useState(false)
	const [location, setLocation] = useState<LocationObject>()
	const [region, setRegion] = useState<Region>()
	const [errorMsg, setErrorMsg] = useState('')

	useEffect(() => {
		(async () => {
			setLoading(true)

			let { status } = await Location.requestForegroundPermissionsAsync()
			
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}
		
			let newLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced }),
			region = {
				latitude: newLocation.coords.latitude,
				longitude: newLocation.coords.longitude,
				latitudeDelta: 0.015,
				longitudeDelta: 0.0121,
			}

			setLocation(location)
			setLocation(newLocation)
			setRegion(region)
			setLoading(false)
		})()

		// TODO: Check for potential mem leack (unsubscribe) - Check all other useEffect hooks (2)
		return () => {}
	}, [])

	let locationText = 'Waiting..'

	if (errorMsg) {
		locationText = errorMsg
	} else if (location) {
		locationText = `Lat: ${location.coords.latitude.toString()} / Long: ${location.coords.longitude.toString()}`
	}
	
	return (
		// TODO: Make sure lat/long is NOT undefined before rendring this
		<Box  style={styles.container}>

			{
				loading ? (
					<LoadingIndicator />
				) : (
					<MapView style={styles.map}
						region={region}
					> 
						{
							(location && location.coords.latitude && location.coords.longitude) && (
								<Marker
									coordinate={{ latitude : location.coords.latitude , longitude : location.coords.longitude }}
									title={'Test'}
									description={'Test desc'}
								/>
							)
						}
					</MapView>
				)
			}

			
		</Box>
	)
}

type Region = {
	latitude: number,
	longitude: number,
	latitudeDelta: number | 0.015,
	longitudeDelta: number | 0.0121,
}


const HomeScreen: React.FC<Page> = ({navigation}) => {
	const loggedInUserEmail = useAppSelector(state => state.auth.user.email)
	console.log('Current Redux user: ', loggedInUserEmail)

	
	return (
		<>
			<Tab.Navigator>
				<Tab.Screen name="Feed" options={{ headerShown: false }} component={HomeFeed} />
				<Tab.Screen name="Map" options={{ headerShown: false }} component={HomeMap} />
			</Tab.Navigator>

			<Fab
				position="absolute"
				bg={'tertiary.800' }
				size="md"
				icon={<Icon color="white" as={<Ionicon name="flag" />} size="md" />}
				onPress={() => {}}
			/>

			<Flex>
				<Row>
					<Button w="50%" h='10' onPress={() => navigation.navigate('Map')}> Map </Button>
					<Button w="50%" h='10' onPress={() => navigation.navigate('Feed')}> Feed </Button>
				</Row>
			</Flex>
		</>
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
		height: '100%',
	},
})

export default HomeScreen

