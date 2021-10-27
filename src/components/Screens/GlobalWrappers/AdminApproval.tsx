// Vendor
import React from 'react'
import { StyleSheet } from 'react-native'

// UI
import { Box } from 'native-base'

//- Organisms
import AdminFeed from '../../Organisms/AdminFeed'

//- Types & Interfaces
import { Screen } from '../../../interfaces/interfaces'

const HomeScreen: React.FC<Screen> = () => {

	return (
		<Box flex={1}>
			<AdminFeed />
		</Box>
	)
}

const styles = StyleSheet.create({

})

export default HomeScreen

