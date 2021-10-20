// Vendor
import React, { useState } from 'react'
import { Button } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Center, Pressable, Text } from 'native-base'

// Redux
import { setActiveUser } from '../../../../redux/features/auth/authSlice'
import { useAppDispatch } from '../../../../redux/features/hooks'

// Components
// Atoms
import Input from '../../Atoms/Input'
import Error from '../../Atoms/Error'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'

const LoginScreen: React.FC<Page> = ({navigation}) => {
	const auth = getAuth()
	const dispatch = useAppDispatch()

	const [ loginState, setLoginState ] = useState({
		email: '',
		password: ''
	})
	
	const [ loginError, setLoginerror ] = useState('')

	const onLogin = async () => {
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


	return (
		<BasicTemplate isList={false} navigation={navigation}>

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

			<Center width='100%'>
				<Pressable onPress={() => navigation.navigate('Register') }> 
					<Text> Dont have an account yet? </Text> 
				</Pressable>
			</Center>
		
			<Error> {loginError} </Error>


		</BasicTemplate>
	)
}


export default LoginScreen
