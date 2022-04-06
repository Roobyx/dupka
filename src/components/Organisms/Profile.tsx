import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Box, Text, Icon, Pressable, HStack } from 'native-base'
import Ionicon from 'react-native-vector-icons/Ionicons'

interface IProfile {
	route: any
	navigation: any
}

const Profile = ({navigation, route}: IProfile) => {

	const [signOutFunction, onSignOutFunction] = useState(route.params.signOut);
	const defaultValue = () => void

	React.useLayoutEffect(() => {
		navigation.setOptions({
			signOut: signOutFunction === null ? defaultValue : signOutFunction,
		});
	}, [navigation, signOutFunction]);

	return (
		<Box flex={1}>
			<HStack>
				<Text> Logout:  </Text>

				<Pressable onPress={signOutFunction} >
					<Icon color={'#fff'} size='sm' as={
						<Ionicon name="log-out-outline" />
					} />
				</Pressable>
			</HStack>

			<Text> Privacy Policy</Text>
			<Text> Terms and Conditions</Text>
		</Box>
	)
}
const styles = StyleSheet.create({})

export default Profile