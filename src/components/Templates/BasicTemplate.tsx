import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native'
import { Box } from 'native-base'

type BasicTemplate = {
	list: boolean
	navigation?: any
}

const BasicTemplate: React.FC<BasicTemplate> = ({list, children}) => {
	const isDarkMode = useColorScheme() === 'dark'

	return (
			<>
				<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
				
				{
					list ? (
							<SafeAreaView>
								<ScrollView contentInsetAdjustmentBehavior="automatic">
									<Box> { children } </Box>
								</ScrollView>
							</SafeAreaView>
						) : (
							<Box> { children } </Box>
					)
				}
				
			</>
		)
}

export default BasicTemplate
