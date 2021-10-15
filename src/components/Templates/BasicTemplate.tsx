import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native'
import { Box } from 'native-base'

type BasicTemplate = {
	isList: boolean
	navigation?: any
}

const BasicTemplate: React.FC<BasicTemplate> = ({isList, children}) => {
	const isDarkMode = useColorScheme() === 'dark'

	useEffect(() => {
	}, [])

	return (
			<>
				<StatusBar translucent={true} />

				{
					isList ? (
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
