// Vendor
import React from 'react'
// import { Button } from 'react-native'
import { Button, Center, Pressable, Text } from "native-base"

// Templates
import BasicTemplate from '../Templates/BasicTemplate'

const Landing: React.FC<Page> = ({navigation}) => {
	let isLoged = false
	
	return (
		<BasicTemplate navigation={navigation} list={false}>
			
			{
				isLoged ? (
					<Button onPress={() => navigation.navigate('Home') } > Go to home </Button>
				) : (

					<Center flex={1}>
						<Button onPress={() => navigation.navigate('Login') }> Log in  </Button>
						
						<Pressable onPress={() => navigation.navigate('Register') }> 
							<Text> Dont have an account yet? </Text> 
						</Pressable>
					</Center>
				)
			}
			
			
		</BasicTemplate>
	)
}


export default Landing
