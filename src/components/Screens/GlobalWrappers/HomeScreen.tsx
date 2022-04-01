// Vendor
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Icon, IFabProps } from 'native-base'
// Expo
import { useIsFocused } from '@react-navigation/native'


// UI
import { Box, Button, Flex, Row } from 'native-base'

//- Organisms
import Feed from '../../Organisms/Feed'
import Map from '../../Organisms/Map'

//- Types & Interfaces
import { Screen } from '../../../interfaces/interfaces'
import { TActionSheetItem } from '../../../interfaces/types'
import FabMenu from '../../Molecules/FabMenu'
import { getLocation } from '../../../helpers/location'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { setReports } from '../../../../redux/features/reports/reportsSlice'
import { fetchAllReports } from '../../../../redux/features/reports/reportOperations'
import { useAppDispatch } from '../../../../redux/features/hooks'

const Tab = createNativeStackNavigator()
const BTab = createBottomTabNavigator()

const HomeScreen: React.FC<Screen> = ({navigation}) => {
	// const loggedInUserEmail = useAppSelector(state => state.auth.user.email)
	const isFocused = useIsFocused()
	const dispatch = useAppDispatch()
	
	const fabIcon = (
		<Icon color="white" as={<Ionicon name="add" />} size="md" />
	)

	// console.log('Nav: ', navigation.getState().index === 0)
	// console.log('isFocused: ', isFocused)

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
		bg: 'tertiary.800',
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
			{/* <Tab.Navigator>
				<Tab.Screen name="Feed" options={{ headerShown: false }} component={Feed} />
				<Tab.Screen name="Map" options={{ headerShown: false }} component={Map} />
			</Tab.Navigator> */}

			{
				isFocused && (
					// <ReportCTA navigation={navigation} />
					<FabMenu 
						fab={fab}
						actionSheetTitle="Which photo would you like to use?"
						actionSheetItems={asItems}
					/>
				)
			}

			<BTab.Navigator>
				<BTab.Screen 
					name="Feed" options={{ 
						headerShown: false,
						tabBarIcon: () => (
							<Icon color={isFocused ? "#20d3ee" : "amber.400"} as={<Ionicon name="images-outline" />} size="sm" />
						),
					}} component={Feed} />
				<BTab.Screen name="Map" options={{
					headerShown: false,
					tabBarIcon: () => (
						<Icon color={isFocused ? "#20d3ee" : "amber.400"} as={<Ionicon name="map-outline" />} size="sm" />
					),
				}} component={Map} />
			</BTab.Navigator>

			{/* <Flex>
				<Row>
					<Button w="50%" rounded='0' h='10' onPress={() => navigation.navigate('Map')}> Map </Button>
					<Button w="50%" rounded='0' h='10' onPress={() => navigation.navigate('Feed')}> Feed </Button>
				</Row>
			</Flex> */}
		</Box>
	)
}

const styles = StyleSheet.create({

})

export default HomeScreen