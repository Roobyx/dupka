// Vendor
import React, { useState } from 'react'
import { Button } from 'react-native'
import firebase from 'firebase'

// Components
// Atoms
import Input from '../../Atoms/Input'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'

const LoginScreen: React.FC<Page> = ({navigation}) => {

	const [ loginState, setLoginState ]= useState({
		email: '',
		password: ''
	})
	
	const onLogin = async () => {
		// TODO: verify passwords match first

		const { email, password } = loginState
		const res = await firebase.auth().signInWithEmailAndPassword(email, password)
		
		console.log('res: ', res)
		console.log('onLogin')
	}


	return (
		<BasicTemplate navigation={navigation} list={false}>
			
			<form>
				<Input
					onChangeText={(email) => setLoginState( {...loginState, email})}
					placeholder="Username"
					keyboardType="default"
				/>

				<Input
					onChangeText={(password) => setLoginState( {...loginState, password})}
					placeholder="Password"
					secure
					keyboardType="visible-password"
				/>

				<Button title="Log in" onPress={onLogin} />

			</form>

		</BasicTemplate>
	)
}


export default LoginScreen
