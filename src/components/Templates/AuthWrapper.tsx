import React from 'react'
import { StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native'
import { Button, Center, Pressable, Text, Container, Heading, Box } from "native-base"

// Assets
import icon from '../../../assets/icon.png'

import BasicTemplate from './BasicTemplate'


interface AuthWrapperInterface {
	navigation?: any
}

// Fix template
const AuthWrapper: React.FC<AuthWrapperInterface> = ({navigation, children}) => {
	const IconImage = Image.resolveAssetSource(icon)

	return (
		<BasicTemplate isList={false} navigation={navigation}>
			<Box width='100%' px='10' py='20' flex={1}>
				<Center flex={1.5}>
					<Image style={styles.iconImage} resizeMode='contain' source={ IconImage } />

					<Heading mt={10} color={'#fff'} flex={1}>
						Welcome!
					</Heading>
				</Center>
				
				<Box flex={2}>
					{ children }
				</Box>
			</Box>
		</BasicTemplate>
	)
}
export default AuthWrapper


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center"
	},
	iconImage: {
		flex: 1
	},
	authWrapper: {
		backgroundColor: '#384661'
	}
})
