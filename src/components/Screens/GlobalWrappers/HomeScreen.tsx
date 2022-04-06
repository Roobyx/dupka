// Vendor
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Icon, IFabProps } from 'native-base'
// Expo
import { useIsFocused } from '@react-navigation/native'

// UI
import { Box } from 'native-base'

//- Organisms
import Feed from '../../Organisms/Feed'
import Map from '../../Organisms/Map'

//- Types & Interfaces
import { Screen } from '../../../interfaces/interfaces'
import { TActionSheetItem } from '../../../interfaces/types'
import FabMenu from '../../Molecules/FabMenu'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { setReports } from '../../../../redux/features/reports/reportsSlice'
import { fetchAllReports } from '../../../../redux/features/reports/reportOperations'
import { useAppDispatch } from '../../../../redux/features/hooks'

const BTab = createMaterialBottomTabNavigator()

const HomeScreen: React.FC<Screen> = ({navigation}) => {
	const isFocused = useIsFocused()
	const dispatch = useAppDispatch()
	
	const fabIcon = (
		<Icon color="white" as={<Ionicon name="add" />} size="md" />
	)

	// Get All reports on start
	useEffect(() => {
		(async () => {
			const fetchedReports = await fetchAllReports()
			const parsedReports = JSON.parse(JSON.stringify(fetchedReports))
			dispatch(setReports(parsedReports))
		})()
	}, [])

	const fab: IFabProps = {
		position: 'absolute',
		bg: '#20d3ee',
		size: "md",
		icon: fabIcon
	}
	
	const openPhotoScreen = (screen: string) => {
		screen === 'takePhoto' ? (
			navigation.navigate('AddPhoto')
		) : (
			navigation.navigate('BrowsePhoto')
		)
	}

	const asItems: TActionSheetItem[] = [
		{ itemCallback: () => openPhotoScreen('takePhoto'), text: 'Take photo' },
		{ itemCallback: () => openPhotoScreen('browsePhoto'), text: 'Browse from gallery' }
	]

	return (
		<Box flex={1}>
			{
				isFocused && (
					<FabMenu 
						fab={fab}
						actionSheetTitle="Which photo would you like to use?"
						actionSheetItems={asItems}
					/>
				)
			}

				<BTab.Navigator
					activeColor="#20d3ee"
					inactiveColor="#0c4f59"
					shifting={true}
					barStyle={{ backgroundColor: '#0f2027' }}
				>
					<BTab.Screen 
						name="Feed" options={{ 
							tabBarIcon: () => (
								<Icon color={isFocused ? "#fff" : "amber.400"} as={<Ionicon name="images-outline" />} size="sm" />
							),
						}} component={Feed} />
					<BTab.Screen name="Map" options={{
						tabBarIcon: () => (
							<Icon color={isFocused ? "#fff" : "amber.400"} as={<Ionicon name="map-outline" />} size="sm" />
						),
					}} component={Map} />
				</BTab.Navigator>
		</Box>
	)
}

const styles = StyleSheet.create({
	
})

export default HomeScreen