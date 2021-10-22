// Vendor
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import MapView from 'react-native-maps'
import MapView, { Marker } from 'react-native-maps'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicon from 'react-native-vector-icons/Ionicons'

// Expo
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

// Redux
import { useAppSelector } from '../../../redux/features/hooks'

// UI
import { Box, Button, Fab, Flex, Icon, Row, Text } from 'native-base'

// Screens
import AddPhotoScreen from './report/TakePhotoScreen'
// Molecules
import LoadingIndicator from '../Molecules/LoadingIndicator'
import { ResponsiveValue } from 'native-base/lib/typescript/components/types'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import ReportCTA from '../Molecules/ReportCTA'


const Tab = createNativeStackNavigator()
// const Tab = createNativeBottom()


type Feed = {
	userEmail: string, 
	locationText: string
}

const HomeFeed = () => {
	return (
		<Box flex={1}>
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
		<Box flex={1} style={styles.container}>

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
	// const loggedInUserEmail = useAppSelector(state => state.auth.user.email)
	const isFocused = useIsFocused()

	return (
		<Box flex={1}>
			<Tab.Navigator>
				<Tab.Screen name="Feed" options={{ headerShown: false }} component={HomeFeed} />
				<Tab.Screen name="Map" options={{ headerShown: false }} component={HomeMap} />
			</Tab.Navigator>

			{
				isFocused && (
					<ReportCTA navigation={navigation} />
				)
			}

			<Flex>
				<Row>
					<Button w="50%" h='10' onPress={() => navigation.navigate('Map')}> Map </Button>
					<Button w="50%" h='10' onPress={() => navigation.navigate('Feed')}> Feed </Button>
				</Row>
			</Flex>
		</Box>
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

