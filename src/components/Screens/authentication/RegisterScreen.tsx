// Vendor
import React, { useContext, useState } from 'react'
import { Button } from 'react-native'
import { Center, Pressable, Text } from 'native-base'

// Firebase
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc  } from 'firebase/firestore'

import { auth as FbAuth, db as FBdb } from '../../../../firebaseSetup'

// Components
// Atoms
import Input from '../../Atoms/Input'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'



const RegisterScreen: React.FC<Page> = ({navigation}) => {
	const auth = FbAuth,
	db = FBdb,
	[state, setState] = useState({
		email: '',
		password: '',
		passwordVerify: ''
	})

	const onSignup = async () => {
		// TODO: verify passwords match first
		const { email, password } = state
		const res = await createUserWithEmailAndPassword(auth, email, password)

		try {
			const docRef = await addDoc(collection(db, "users"), {
				uid: res.user.uid,
				email: state.email
			})

			console.log("Document written with ID: ", docRef.id)
		} catch(e) {
			console.log('Error in db write: ', e)
		}
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
