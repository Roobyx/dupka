// Expo
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'

export const checkLocationPermission = async () => {
	let { status } = await Location.requestForegroundPermissionsAsync()

	if (status !== 'granted') {
		alert('No location access')
		return false
	}

	return true
}

// Returns a LocationObject with the current device location
export const getLocation = async (): Promise<LocationObject | null> => {
	// let { status } = await Location.requestForegroundPermissionsAsync()

	// if (status !== 'granted') {
	// 	alert('No location access')
	// 	return null
	// }
	let permission = await checkLocationPermission()

	if (permission) {
		let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
		console.log('-----> Got NEW  loc: <------', location)

		// alert(location.coords.longitude + ' / ' + location.coords.latitude)
		return location
	}

	return null
}

// Returns an adress from given LocationObject
export const getAddressFromLocation = async (location: LocationObject): Promise<string> => {
	let currentAddress = ''

	if (location.coords) {
		const { latitude, longitude } = location.coords

		let response = await Location.reverseGeocodeAsync({
			latitude,
			longitude
		})

		for (let item of response) {
			let address = `${item.street}, ${item.name}, ${item.city}, ${item.postalCode}`

			currentAddress = address
		}
	}

	return currentAddress
}


// Diretcly returns the device's adress, without the need for LocationObject arguments
export const getAddress = async (): Promise<string> => {
	let currentAddress: string = '',
		location: LocationObject | null

	location = await getLocation()

	if (location && location.coords) {
		const { latitude, longitude } = location.coords

		let response = await Location.reverseGeocodeAsync({
			latitude,
			longitude
		})

		for (let item of response) {
			let address = `${item.street}, ${item.name}, ${item.city}, ${item.postalCode}`

			currentAddress = address
		}
	}

	return currentAddress
}

export type RichLocationObject = {
	location: Location.LocationObject | null,
	address: string | undefined
}

export const getFullLocationInfo = async (): Promise<RichLocationObject> => {
	let location = await getLocation()
	// let address = await getAddress()
	let address
	let permission = await checkLocationPermission()

	if (permission && location) {
		address = await getAddressFromLocation(location)
	}

	return {
		location,
		address
	}
}