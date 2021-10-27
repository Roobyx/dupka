// Vendor
import React, { useState } from 'react'
import { Button } from 'react-native'
import { Center, Pressable, Text } from 'native-base'

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth as FbAuth, } from '../../../../firebaseSetup'

// Components
// Atoms
import Input from '../../Atoms/Input'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'
import { Screen } from '../../../interfaces/interfaces'



const RegisterScreen: React.FC<Screen> = ({navigation}) => {
	const auth = FbAuth,
	[state, setState] = useState({
		email: '',
		password: '',
		passwordVerify: ''
	})

	const onSignup = async () => {
		// TODO: verify passwords match first
		const { email, password } = state
		const res = await createUserWithEmailAndPassword(auth, email, password)
	}

	return (
		<BasicTemplate isList={false} navigation={navigation}>

			<Input
				onChangeText={(email) => setState({...state, email })}
				placeholder="Email"
				keyboardType="default"
			/>

			<Input
				onChangeText={(password) => setState({...state, password })}
				placeholder="Password"
				secure
				keyboardType="visible-password"
			/>

			<Input
				onChangeText={(passwordVerify) => setState({...state, passwordVerify })}
				placeholder="Repeat password"
				secure
				keyboardType="visible-password"
			/>

			<Button title="Complete account" onPress={onSignup} />
			
			<Center width='100%'>
				<Pressable onPress={() => navigation.navigate('Login') }> 
					<Text> Already have an account? </Text> 
				</Pressable>
			</Center>

		</BasicTemplate>
	)
}


export default RegisterScreen
