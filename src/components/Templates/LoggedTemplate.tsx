import React, { useContext } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { Fab, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

import BasicTemplate from './BasicTemplate'
import { AuthContext } from '../../context/AuthContext'
import { auth } from "../../../firebaseSetup"


interface LoggedTemplateInterface {
	navigation?: any
}

const LoggedTemplate: React.FC<LoggedTemplateInterface> = ({navigation, children}) => {
	const isDarkMode = useColorScheme() === 'dark'

	const user = useContext(AuthContext)

	// console.log('CU: ', user)

	const SignOut = async () => {
		await auth.signOut()
		navigation.navigate('Landing')

		// console.log('pressed the pressable')
	}

	return (
			<>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />


				{/* TODO: potentially devide into isList and not */}
				<BasicTemplate isList={false}>
					{children}
				</BasicTemplate>

				<Fab
					position="absolute"
					size="md"
					icon={<Icon color="white" as={<Ionicons name="alert" />} size="md" />}
					onPress={SignOut}
				/>

				
			</>
		)
}

export default LoggedTemplate
