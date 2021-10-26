import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Box, Text } from 'native-base'
import { Icon, IFabProps } from 'native-base'
import Ionicon from 'react-native-vector-icons/Ionicons'

// Expo
// import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

// Redux
import { useAppDispatch, useAppSelector } from '../../../redux/features/hooks'

// RN Maps
// import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import MapView, { PROVIDER_GOOGLE, Heatmap, Marker } from 'react-native-maps'

// Custom
// Atoms
import Error
 from '../Atoms/Error'
// Molecules
import LoadingIndicator from '../Molecules/LoadingIndicator'
import { getLocation } from '../../helpers/location'
import { getAllReports } from '../../../redux/features/reports/reportsSlice'

// Types & Interfaces
import { Region, MapMode } from '../../interfaces/types'
import { Report } from '../../interfaces/interfaces'
import FabMenu from '../Molecules/FabMenu'
import { useIsFocused } from '@react-navigation/native'



const Map = () => {
	// const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false)
	const [location, setLocation] = useState<LocationObject>()
	const [region, setRegion] = useState<Region>()
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [mapMode, setMapMode] = useState<MapMode>({mode: 'default'})
	const isFocused = useIsFocused()


	useEffect(() => {
		(async () => {
			setLoading(true)

			let newLocation = await getLocation()
			
			if( newLocation ) {
				let region = {
					latitude: newLocation.coords.latitude,
					longitude: newLocation.coords.longitude,
					latitudeDelta: 0.015,
					longitudeDelta: 0.0121,
				}

				setLocation(location)
				setLocation(newLocation)
				setRegion(region)

			} else {
				setErrorMsg('No location permission provided.')
			}

			setLoading(false)
		})()

		// TODO: Check for potential mem leack (unsubscribe) - Check all other useEffect hooks (2)
		return () => {}
	}, [])

	const allReports: Report[] = useAppSelector(getAllReports)

	const toggleMapMode = (newMode: MapMode) => {
		setMapMode(newMode)
	}

	const fabIcon = (
		<Icon color="white" as={<Ionicon name="layers-outline" />} size="md" />
	)
	
	const mapToggleFab: IFabProps = {
		position: 'absolute',
		bg: 'tertiary.800',
		size: "md",
		icon: fabIcon
	}

	return (
		// TODO: Make sure lat/long is NOT undefined before rendring this
		<Box flex={1} style={styles.container}>

		{
			loading ? (
				<LoadingIndicator />
			) : (
				<>

					{mapMode.mode === 'default' ? (
						errorMsg !== null ? (
							<Error> errorMsg </Error>
						) : (
							<MapView 
								provider={ PROVIDER_GOOGLE }
								style={styles.map}
								region={region}
							> 
								{/* {
									(location && location.coords.latitude && location.coords.longitude) && (
										<Marker
											coordinate={{ latitude : location.coords.latitude , longitude : location.coords.longitude }}
											title={'Test'}
											description={'Test desc'}
										/>
									)
								} */}
		
		
								{
									allReports && (
										allReports.map((report, index) => (
											<Marker
												key={index}
												coordinate={{ latitude: report.location.coords.latitude, longitude: report.location.coords.longitude }}
												title='Title'
												description='Desc'
											/>
										))
									)
								}
							</MapView>
							
						)
					) : (
						<>
							<MapView 
								provider={ PROVIDER_GOOGLE }
								style={styles.map}
								region={region}
							>
								<Heatmap 
									points={
										allReports.map( (report) => {
											return ({
												latitude: report.location.coords.latitude, 
												longitude: report.location.coords.longitude,
												weight: 1
											})
										})
									}
								/>
							</MapView>
						</>
					)}
				
					{
						isFocused && (
							<FabMenu
								fab={mapToggleFab}
								actionSheetTitle="Which photo would you like to use?"
								actionSheetItems={[
									{ itemCallback: () => toggleMapMode({mode: 'default'}), text: 'Normal map' },
									{ itemCallback: () => toggleMapMode({mode: 'heatmap'}), text: 'Heatmap' }
								]}
							/>
						)
					}

				</>
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