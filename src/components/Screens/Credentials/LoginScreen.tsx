// Vendor
import React from 'react'
import { Button } from 'react-native'

// Components
// Atoms
import Input from '../../Atoms/Input'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'



const LoginScreen: React.FC<Page> = ({navigation}) => {

	const onChangeFake = () => {
		console.log('On faked')
	},
	value = ''


	return (
		<BasicTemplate navigation={navigation} list={false}>
			<Input
				onChangeText={onChangeFake}
				value={value}
				placeholder="Username"
				keyboardType="default"
			/>

			<Input
				onChangeText={onChangeFake}
				value={value}
				placeholder="Password"
				keyboardType="visible-password"
			/>

			<Button title="Log in" onPress={() => navigation.navigate('Home') } />
		</BasicTemplate>
	)
}


export default LoginScreen
