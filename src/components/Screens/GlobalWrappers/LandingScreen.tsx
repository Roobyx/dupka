// Vendor
import React from 'react'
import { Button, Center, Pressable, Text } from "native-base"

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'
import { Screen } from '../../../interfaces/interfaces'

const Landing: React.FC<Screen> = ({navigation}) => {
	return (
		<Center flex={1}>
			<BasicTemplate isList={false} navigation={navigation}>
				<Button onPress={() => navigation.navigate('Login') }> Log in  </Button>
				
				<Pressable onPress={() => navigation.navigate('Register') }> 
					<Text> Dont have an account yet? </Text> 
				</Pressable>
			</BasicTemplate>
		</Center>
	)
}


export default Landing