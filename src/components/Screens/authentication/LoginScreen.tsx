// Vendor
import React, { useState } from 'react'
import { Button } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Center, Pressable, Text } from 'native-base'

// Redux
import { useDispatch } from 'react-redux'

// Components
// Atoms
import Input from '../../Atoms/Input'
import Error from '../../Atoms/Error'

// Templates
import { setActiveUser } from '../../../../redux/features/auth/authSlice'
import BasicTemplate from '../../Templates/BasicTemplate'

const LoginScreen: React.FC<Page> = ({navigation}) => {
	const auth = getAuth()
	const dispatch = useDispatch()

	const [ loginState, setLoginState ] = useState({
		email: '',
		password: ''
	})
	
	const [ loginError, setLoginerror ] = useState('')
	
	// const user = useContext(AuthContext)
	// console.log('CU: ', user)

	const onLogin = async () => {
		const { email, password } = loginState
		
		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			const user = res.user
			// console.log('User: ', user)
			// console.log('Res: ', res)

			if( user ) {
				dispatch(setActiveUser(user))
				console.log()
				navigation.navigate('Home')
			}
	
			// console.log('res: ', res)
			// console.log('Login')
		} catch (e: any) {
			setLoginerror(e.message)
			// console.log('Error: ', e)
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
