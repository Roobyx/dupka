// Vendor
import React from 'react'
import { Button } from 'react-native'

// Components
// Atoms
import Input from '../Atoms/Input'

// Templates
import BasicTemplate from '../Templates/BasicTemplate'

const Landing: React.FC<Page> = ({navigation}) => {
	let isLoged = false

	return (
		<BasicTemplate navigation={navigation} list={false}>
			
			{
				isLoged ? (
					<Button title="Go to home" onPress={() => navigation.navigate('Home') } />
				) : (
					<>
						<Button title="Log in" onPress={() => navigation.navigate('Login') } />
						<Button title="Dont have an account yet?" onPress={() => navigation.navigate('Register') } />
					</>
				)
			}
			
			
		</BasicTemplate>
	)
}


export default Landing
