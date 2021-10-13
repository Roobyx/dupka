import React from 'react'
import { View, SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native'

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
									<View> { children } </View>
								</ScrollView>
							</SafeAreaView>
						) : (
							<View> { children } </View>
					)
				}
				
			</>
		)
}

export default BasicTemplate
