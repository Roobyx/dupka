// Vendor
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Icon, IFabProps } from 'native-base'
// Expo
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

// Redux
// import { useAppSelector } from '../../../../redux/features/hooks'

// Firebse
// import { reportsCollectionRef } from '../../../../firebaseSetup'
// import { DocumentData, getDocs } from '@firebase/firestore'

// UI
import { Box, Button, Flex, Row } from 'native-base'

// Custom
//- Screens
// import AddPhotoScreen from '../Report/TakePhotoScreen'

//- Molecules
// import { ResponsiveValue } from 'native-base/lib/typescript/components/types'

//- Organisms
import Feed from '../../Organisms/Feed'
import Map from '../../Organisms/Map'
// import ReportCTA from '../../Organisms/ReportCTA'

//- Types & Interfaces
import { Page } from '../../../interfaces/interfaces'
import { TActionSheetItem } from '../../../interfaces/types'
import FabMenu from '../../Molecules/FabMenu'



const Tab = createNativeStackNavigator()
// const Tab = createNativeBottom()

const HomeScreen: React.FC<Page> = ({navigation}) => {
	// const loggedInUserEmail = useAppSelector(state => state.auth.user.email)
	const isFocused = useIsFocused()

	const fabIcon = (
		<Icon color="white" as={<Ionicon name="add" />} size="md" />
	)
	
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
			<Tab.Navigator>
				<Tab.Screen name="Feed" options={{ headerShown: false }} component={Feed} />
				<Tab.Screen name="Map" options={{ headerShown: false }} component={Map} />
			</Tab.Navigator>

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

})

export default HomeScreen

