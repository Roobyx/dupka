import { Fab, Icon, Actionsheet, Box, Text, useDisclose } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

const ReportCTA = ({navigation}: NavElement) => {
	const { isOpen, onOpen, onClose } = useDisclose()
	
	const openPhotoScreen = (screen: string) => {
		screen === 'takePhoto' ? (
			navigation.navigate('AddPhoto')
		) : (
			navigation.navigate('BrowsePhoto')
		)
	}

	return (
		<>
			<Fab
				position='absolute'
				bg={'tertiary.800' }
				size="md"
				icon={<Icon color="white" as={<Ionicon name="add" />} size="md" />}
				onPress={onOpen}
			/>

			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Box w="100%" h={60} px={4} justifyContent="center">
						<Text fontSize="16"
							color="gray.500"
							_dark={{
								color: "gray.300",
							}} >
							Which photo would you like to use?
						</Text>
					</Box>

					<Actionsheet.Item onPress={() => openPhotoScreen('takePhoto')}> Take photo </Actionsheet.Item>
					<Actionsheet.Item onPress={() => openPhotoScreen('browsePhoto')}> Browse from gallery </Actionsheet.Item>
					<Actionsheet.Item onPress={onClose} > Cancel </Actionsheet.Item>
					
				</Actionsheet.Content>
			</Actionsheet>
		</>
	)
}

export default ReportCTA

const styles = StyleSheet.create({})
