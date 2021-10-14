// Vendor
import React, { useState } from 'react'
import { Button } from 'react-native'
// import firebase from 'firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Components
// Atoms
import Input from '../../Atoms/Input'
import Error from '../../Atoms/Error'

// Templates
import BasicTemplate from '../../Templates/BasicTemplate'

const LoginScreen: React.FC<Page> = ({navigation}) => {
	const auth = getAuth()

	const [ loginState, setLoginState ] = useState({
		email: '',
		password: ''
	})
	
	const [ loginError, setLoginerror ] = useState('')
	
	const onLogin = async () => {
		const { email, password } = loginState
		
		try {
			const res = await signInWithEmailAndPassword(auth, email, password)
			const user = res.user
	
			if( user ) {
				navigation.navigate('Home', { email: user.email })
			}
	
			console.log('res: ', res)
			console.log('Login')
		} catch (e: any) {
			setLoginerror(e.message)
			console.log('Error: ', e)
		}
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
			
			<Error> {loginError} </Error>


		</BasicTemplate>
	)
}


export default LoginScreen
