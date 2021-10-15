import React, { useContext, useState } from 'react'
import { StatusBar, useColorScheme } from 'react-native'

import BasicTemplate from './BasicTemplate'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'


interface NotLoggedTemplateInterface {
	navigation?: any
}


const NotLoggedTemplate: React.FC<NotLoggedTemplateInterface> = ({navigation, children}) => {
	const [ loggedIn, setLoggedIn ] = useState(false)
	const isDarkMode = useColorScheme() === 'dark'
	const user = useContext(AuthContext)
	
	useFocusEffect(
		React.useCallback(() => {
			if(user) {
				setLoggedIn(true)
				// console.log('Should navigate home')
				navigation.navigate('Home')
			} else {
				setLoggedIn(false)
			}
		}, [user])
	)


	return (
			<>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				{
					!loggedIn && (
						<BasicTemplate isList={false}>
							{children}
						</BasicTemplate>
					)
				}
			</>
		)
}

export default NotLoggedTemplate
