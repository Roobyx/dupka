// Vendor
import React, { useContext } from 'react'
import { Button, Center, Pressable, Text } from "native-base"

// Templates
import { AuthContext } from '../../context/AuthContext'
import NotLoggedTemplate from '../Templates/NotLoggedTemplate'

const Landing: React.FC<Page> = ({navigation}) => {

	const user = useContext(AuthContext)
	// console.log('CU: ', user)

	return (
		<Center flex={1}>
			<NotLoggedTemplate navigation={navigation}>
				<Button onPress={() => navigation.navigate('Login') }> Log in  </Button>
				
				<Pressable onPress={() => navigation.navigate('Register') }> 
					<Text> Dont have an account yet? </Text> 
				</Pressable>
			</NotLoggedTemplate>
		</Center>
	)
}


export default Landing