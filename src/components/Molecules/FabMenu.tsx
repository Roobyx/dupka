// Vendor
import React from 'react';
import {StyleSheet} from 'react-native';
import {Fab, Actionsheet, Box, Text, useDisclose} from 'native-base';
// Types & Interfaces
import {IFabMenu} from '../../interfaces/interfaces';
import ActionSheetContainer from './ActionSheetContainer';

const FabMenu = ({fab, actionSheetTitle, actionSheetItems}: IFabMenu) => {
	const {isOpen, onOpen, onClose} = useDisclose();

	return (
		<>
			<Fab
				position={fab.position}
				bg={fab.bg}
				size={fab.size}
				// Fab icon example: <Icon color="white" as={<Ionicon name="add" />} size="md" />
				icon={fab.icon}
				onPress={onOpen}
			/>

			<ActionSheetContainer
				actionSheetTitle={actionSheetTitle}
				actionSheetItems={actionSheetItems}
			/>
			<Actionsheet isOpen={isOpen} onClose={onClose}>
				<Actionsheet.Content>
					<Box w='100%' h={60} px={4} justifyContent='center'>
						<Text
							fontSize='16'
							color='gray.500'
							_dark={{
								color: 'gray.300',
							}}
						>
							{actionSheetTitle}
						</Text>
					</Box>

					{actionSheetItems.map((asItem, index) => (
						<Actionsheet.Item
							key={index}
							onPress={asItem.itemCallback}
						>
							<Text>{asItem.text}</Text>
						</Actionsheet.Item>
					))}
					<Actionsheet.Item onPress={onClose}>
						<Text>Cancel</Text>
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
};

export default FabMenu;

const styles = StyleSheet.create({});
