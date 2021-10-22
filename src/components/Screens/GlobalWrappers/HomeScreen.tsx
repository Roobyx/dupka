// Vendor
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ionicon from 'react-native-vector-icons/Ionicons'

// Expo
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

// Redux
import { useAppSelector } from '../../../../redux/features/hooks'

// UI
import { Box, Button, Flex, Row } from 'native-base'

// Screens
import AddPhotoScreen from '../Report/TakePhotoScreen'
// Molecules
// import { ResponsiveValue } from 'native-base/lib/typescript/components/types'
import ReportCTA from '../../Molecules/ReportCTA'

// Organisms
import Feed from '../../Organisms/Feed'
import Map from '../../Organisms/Map'


const Tab = createNativeStackNavigator()
// const Tab = createNativeBottom()

const HomeScreen: React.FC<Page> = ({navigation}) => {
	// const loggedInUserEmail = useAppSelector(state => state.auth.user.email)
	const isFocused = useIsFocused()

	return (
		<Box flex={1}>
			<Tab.Navigator>
				<Tab.Screen name="Feed" options={{ headerShown: false }} component={Feed} />
				<Tab.Screen name="Map" options={{ headerShown: false }} component={Map} />
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

})

export default HomeScreen

