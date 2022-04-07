import React, { useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Box, Button, Text, Center } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import icon from '../../../assets/icon.png'

interface IProfile {
	route: any
	navigation: any
}

const Profile = ({navigation, route}: IProfile) => {
	const IconImage = Image.resolveAssetSource(icon)

	// const [signOutFunction, onSignOutFunction] = useState(route.params.signOut);

	return (
		// <Box flex={1}>
		// 	<HStack>
				// <Button rounded='none' w='50%' onPress={ signOutFunction }> 
				// 	<Icon color={'#fff'} size='sm' as={
				// 		<Ionicon name="log-out-outline" />
				// 	} />
				// 	<Text> Logout </Text>
				// </Button>

		// 	</HStack>



		// 	<Box>
		// 		v.0.0.1
		// 	</Box>
		// </Box>

		<LinearGradient
			colors={['#2c5364', '#203a43', '#0f2027']}
			style={styles.background}
		>

			<Box width='100%' px='10' py='20' flex={1}>
				<Center flex={1.5}>
					<Button rounded='none' w='50%' onPress={ route.params.setShouldSignOut }> 
						{/* <Icon color={'#fff'} size='sm' as={
							<Ionicon name="log-out-outline" />
						} /> */}
						<Text> Logout </Text>
					</Button>
				</Center>
				
				<Box>
					<Text> Privacy Policy</Text>
					<Text> Terms and Conditions</Text>
				</Box>
				
				<Image style={styles.iconImage} resizeMode='contain' source={ IconImage } />
			</Box>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
	},
	iconImage: {
		flex: 1
	},
})
export default Profile