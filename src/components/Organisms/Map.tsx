import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Box } from 'native-base'

// Expo
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

// RN Maps
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'

// Custom
// Molecules
import LoadingIndicator from '../Molecules/LoadingIndicator'

const Map = () => {
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

export default Map

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
	}
})