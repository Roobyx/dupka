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
				<Center flex={1}>
					<Image style={styles.iconImage} resizeMode='contain' source={ IconImage } />

					<Heading flex={1}>
						Welcome!
					</Heading>
				</Center>
				
				<Box flex={1}>
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
	}
})
