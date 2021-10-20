import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { Fab, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

import BasicTemplate from './BasicTemplate'
import { auth } from "../../../firebaseSetup"


interface LoggedTemplateInterface {
	navigation?: any
}

// Fix template
const LoggedTemplate: React.FC<LoggedTemplateInterface> = ({navigation, children}) => {
	const isDarkMode = useColorScheme() === 'dark'

	return (
			<BasicTemplate isList={false}>
				{/* TODO: potentially devide into isList and not */}
				{children}
			</BasicTemplate>
		)
}
export default LoggedTemplate
