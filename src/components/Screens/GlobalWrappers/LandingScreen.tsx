// Vendor
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Button, Center, Pressable, Text, Heading, Box } from "native-base"

// Assets
import icon from '../../../../assets/icon.png'

// Templates
import { Screen } from '../../../interfaces/interfaces'
import AuthWrapper from '../../Templates/AuthWrapper'
import { signInAnonymously } from '@firebase/auth'
import { auth } from '../../../../firebaseSetup'
import { setActiveUser } from '../../../../redux/features/auth/authSlice'
import { useAppDispatch } from '../../../../redux/features/hooks'

const Landing: React.FC<Screen> = ({navigation}) => {
	const dispatch = useAppDispatch()
	const IconImage = Image.resolveAssetSource(icon)
	
	const onAnonymus = async () => {

		try {
			const res = await signInAnonymously(auth)
			const user = JSON.parse(JSON.stringify(res.user))
			
			if( user ) {
				console.log('successfully logged user: ', res.user.email)
				dispatch(setActiveUser(user))
				navigation.navigate('Home')
			}
		} catch(e: any) {
			console.log('Error: ', e.code, e.message)
		}
	}

	return (
		<AuthWrapper>
			{/* <Pressable onPress={onAnonymus} >
				<Box
					bg={{
						linearGradient: {
						colors: ['lightBlue.300', 'violet.800'],
						start: [0, 0],
						end: [1, 0],
						},
					}}
					p="12"
					rounded="xl"
					_text={{
						fontSize: 'md',
						fontWeight: 'medium',
						color: 'warmGray.50',
						textAlign: 'center',
					}}
					>
					Report now with anonymus account
				</Box>
			</Pressable> */}
			
			<Button my={4} onPress={onAnonymus}> Continue without logging in </Button>
			<Button onPress={() => navigation.navigate('Login') }> Log in  </Button>

			<Center>
				{/* <Heading>
					Dont have an account yet?
				</Heading> */}

				<Pressable pt='2' onPress={() => navigation.navigate('Register') }> 
					<Text> Don't have an account? </Text> 
				</Pressable>
			</Center>
		</AuthWrapper>
	)
}


export default Landing


const styles = StyleSheet.create({
	container: {
		flex: 1,
		
		justifyContent: "center"
	},
	iconImage: {
		flex: 1
	},
	
})
function dispatch(arg0: any) {
	throw new Error('Function not implemented.')
}

