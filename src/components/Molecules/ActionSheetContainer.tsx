// Vendor
import React from 'react'
import { StyleSheet } from 'react-native'
import { Actionsheet, Box, Text, useDisclose} from 'native-base'
// Types & Interfaces
import { IActionMenuContainer } from '../../interfaces/interfaces'

const ActionMenuContainer = ({actionSheetTitle, actionSheetItems}: IActionMenuContainer) => {
	const { isOpen, onClose } = useDisclose()

	return (
		<Actionsheet isOpen={isOpen} onClose={onClose}>
			<Actionsheet.Content>
				<Box w="100%" h={60} px={4} justifyContent="center">
					<Text fontSize="16"
						color="gray.500"
						_dark={{
							color: "gray.300",
						}} >
							
						{actionSheetTitle}
					</Text>
				</Box>

				{
					actionSheetItems.map(
						(asItem, index) => (
							<Actionsheet.Item key={index} onPress={asItem.itemCallback}><Text>{asItem.text}</Text></Actionsheet.Item>
						)
					)
				}
				<Actionsheet.Item onPress={onClose}><Text>Cancel</Text></Actionsheet.Item>
			</Actionsheet.Content>
		</Actionsheet>
	)
}

export default ActionMenuContainer

const styles = StyleSheet.create({
})
