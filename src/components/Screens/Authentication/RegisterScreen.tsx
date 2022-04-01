// Vendor
import React, { useState } from 'react'
import { StyleSheet} from 'react-native'
import { Center, Pressable, Text, Button } from 'native-base'

// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { auth as FbAuth, } from '../../../../firebaseSetup'

// Components
// Atoms
import Input from '../../Atoms/Input'
import Error from '../../Atoms/Error'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'
import { Screen } from '../../../interfaces/interfaces'
import { useAppDispatch } from '../../../../redux/features/hooks'
import { setActiveUser } from '../../../../redux/features/auth/authSlice'
import AuthWrapper from '../../Templates/AuthWrapper'
import LoadingIndicator from '../../Molecules/LoadingIndicator'



const RegisterScreen: React.FC<Screen> = ({navigation}) => {
	const auth = FbAuth
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false)
	const [regError, setRegError] = useState('')
	const [regState, setRegState] = useState({
		email: '',
		password: '',
		passwordVerify: ''
	})

	const onSignup = async () => {
		// TODO: verify passwords match first
		const { email, password } = regState
		setRegError('')

		if(regState.password.length > 5) {
			if(verifyPassword()) {
				try {
					setLoading(true)

					const res = await createUserWithEmailAndPassword(auth, email, password)
					setLoading(false)

					await onLogin()
	
				} catch (e: any ) {
					console.log('Err: ', e.message)
					if(e.message.includes('auth/email-already-in-use')) {
						console.log('Got ya')
						setRegError('Email is already taken')
					} else {
						const err = e.message.replace('Firebase: Error (auth/', '').replace(')', '').replace('-', ' ')
						setRegError(err)
					}
					setLoading(false)
				}
			} else {
				setRegError('Passwords do not match' )
				// setLoading(false)
			}
		} else {
			setRegError('Password needs to be at least 6 characters' )
		}
	}

	const onLogin = async () => {
		const { email, password } = regState


		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			const user = JSON.parse(JSON.stringify(res.user))
			// console.log('Trying to log user: ', res.user)

			if( user ) {
				console.log('successfully logged user: ', res.user.email)
				dispatch(setActiveUser(user))
				navigation.navigate('Home')
			}
		} catch (e: any) {
			console.log('Got error while logging: ', e.message)
			setRegError(e.message)
		}
	}

	const verifyPassword = (): boolean => {
		return regState.password === regState.passwordVerify
	}

	return (
		<AuthWrapper>
			
			{
				loading ? (
					<LoadingIndicator />
				) : (
					<>
						<Input
							onChangeText={(email) => setRegState({...regState, email })}
							placeholder="Email"
							keyboardType="default"
						/>

						<Input
							onChangeText={(password) => setRegState({...regState, password })}
							placeholder="Password"
							secure
							keyboardType="default"
						/>

						<Input
							onChangeText={(passwordVerify) => setRegState({...regState, passwordVerify })}
							placeholder="Repeat password"
							secure
							keyboardType="default"
						/>

						{ regError.length > 0 && (
							<Center py='2'>
								<Error> { regError } </Error>
							</Center>
						) }

						<Button style={styles.button} onPress={onSignup}> Complete account </Button>
						
						<Center width='100%'>
							<Pressable pt='5' onPress={() => navigation.navigate('Login') }> 
								<Text> Already have an account? </Text> 
							</Pressable>
						</Center>
					</>
				)
			}


		</AuthWrapper>
	)
}


const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: "center"
	},
	button: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 50,
	}
})

export default RegisterScreen
