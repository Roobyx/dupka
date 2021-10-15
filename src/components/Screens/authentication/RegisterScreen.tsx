// Vendor
import React, { useState } from 'react'
import { Button } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Center, Pressable, Text } from 'native-base'

// Components
// Atoms
import Input from '../../Atoms/Input'

// Templates
import NotLoggedTemplate from '../../Templates/NotLoggedTemplate'



const RegisterScreen: React.FC<Page> = ({navigation}) => {
	const auth = getAuth()
	const [state, setState] = useState({
		email: '',
		password: '',
		passwordVerify: ''
	})

	const onSignup = async () => {
		// TODO: verify passwords match first

		const { email, password } = state
		const res = await createUserWithEmailAndPassword(auth, email, password)
		
		// console.log('onSignUp')
	}

	return (
		<NotLoggedTemplate navigation={navigation}>

			<Input
				onChangeText={(email) => setState({...state, email })}
				placeholder="Username"
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

		</NotLoggedTemplate>
	)
}


export default RegisterScreen
