// Vendor
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Image } from 'react-native'
import { getAuth, linkWithPopup, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Button, Center, Pressable, Text, Box, Divider, Heading, HStack } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'

// Firebase
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth"

// Redux
import { setActiveUser } from '../../../../redux/features/auth/authSlice'
import { useAppDispatch } from '../../../../redux/features/hooks'

// Components
// Atoms
import Input from '../../Atoms/Input'
import Error from '../../Atoms/Error'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'
import { Screen } from '../../../interfaces/interfaces'
import AuthWrapper from '../../Templates/AuthWrapper'
import { auth } from '../../../../firebaseSetup'

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()


const LoginScreen: React.FC<Screen> = ({navigation}) => {
	// const auth = getAuth()
	const dispatch = useAppDispatch()

	const [ loginType, setLoginType ] = useState('default')

	const [ loginState, setLoginState ] = useState({
		email: '',
		password: ''
	})
	
	const [ loginError, setLoginerror ] = useState('')

	const onLoginEmail = async () => {
		const { email, password } = loginState


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
			setLoginerror(e.message)
		}
	}

	const onLoginGoogle = async () => {

		try {
			const res = await signInWithPopup(auth, googleProvider)
			const credential = GoogleAuthProvider.credentialFromResult(res)

			console.log('Mid1: Cred: ', credential)
			const token = credential?.accessToken
			console.log('Mid2: token: ', token)

			const user = res.user

			if( user ) {
				console.log('successfully logged user: ', res.user.email)
				dispatch(setActiveUser(user))
				navigation.navigate('Home')
			}

		} catch(e: any) {

			// Handle Errors here.
			// const errorCode = e.code;
			// const errorMessage = e.message;
			// The email of the user's account used.
			// const email = e.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(e)

			console.log(`Error with code ${e.code}: *${e.message}* and email ${e.email} / ${credential} `)
		}
	}

	const onLoginFacebook = async () => {

	}

	const backgroundImage = { uri: 'splash.png' }

	return (
		<AuthWrapper>
			<Center> <Heading> Login with email </Heading> </Center>

			<Input
				onChangeText={(email) => setLoginState( {...loginState, email})}
				placeholder="Username"
				keyboardType="default"
			/>

			<Input
				onChangeText={(password) => setLoginState( {...loginState, password})}
				placeholder="Password"
				secure
				keyboardType="default"
			/>

			<Button onPress={onLoginEmail} > Log in </Button>

			{/* TODO: Implement Google/FB sign-ins with https://github.com/react-native-google-signin/google-signin*/}
			{/* <Divider bg="indigo.500" thickness="2" mx="2" /> */}
			{/* <Center> <Heading> or </Heading> </Center>

			<Button my={2} shadow='3' bg='white' onPress={ onLoginGoogle }> 
				<HStack> 
					<Icon name="google" size={24}/> 
					<Text> Sign in with Google </Text> 
				</HStack>
			</Button>
			<Button my={2} shadow='3' bg='blue.600' onPress={ onLoginFacebook }> 
				<HStack>
					<Icon color='white' name="facebook-square" size={24}/> 
					<Text color='white'> Sign in with Facebook </Text> 
				</HStack>
			</Button> */}

			<Center width='100%'>
				<Pressable pt='5' onPress={() => navigation.navigate('Register') }> 
					<Text> Dont have an account yet? </Text> 
				</Pressable>
			</Center>
					
			<Error> {loginError} </Error>
		</AuthWrapper>
	)
}


export default LoginScreen


const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: "center"
	}
})
