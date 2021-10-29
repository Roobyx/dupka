// Vendor
import React from 'react'
import { StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native'
import { Button, Center, Pressable, Text, Container, Heading, Box } from "native-base"
import { Asset, useAssets } from 'expo-asset'

// Assets
import icon from '../../../../assets/icon.png'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'
import { Screen } from '../../../interfaces/interfaces'
import AuthWrapper from '../../Templates/AuthWrapper'

const Landing: React.FC<Screen> = ({navigation}) => {
	const IconImage = Image.resolveAssetSource(icon)
	
	return (
		<AuthWrapper>
			<Button onPress={() => navigation.navigate('Login') }> Log in  </Button>
			
			<Center>
				<Pressable pt='2' onPress={() => navigation.navigate('Register') }> 
					<Text> Dont have an account yet? </Text> 
				</Pressable>
			</Center>
		</AuthWrapper>
	)
}


export default Landing


const styles = StyleSheet.create({
	container: {
		flex: 1,
		
		justifyContent: "center"
	},
	iconImage: {
		flex: 1
	}
})
