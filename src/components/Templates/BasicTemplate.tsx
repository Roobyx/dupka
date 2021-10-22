import React, { useEffect } from 'react'
import { ScrollView, StatusBar, useColorScheme } from 'react-native'
import { Box } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

type BasicTemplate = {
	isList: boolean
	navigation?: any
}

const BasicTemplate: React.FC<BasicTemplate> = ({isList, children}) => {
	const isDarkMode = useColorScheme() === 'dark'

	useEffect(() => {
	}, [])

	return (
			<SafeAreaView>
				<StatusBar translucent={true} />

				{
					isList ? (
							<Box>
								<ScrollView contentInsetAdjustmentBehavior="automatic">
									<Box> { children } </Box>
								</ScrollView>
							</Box>
						) : (
							<Box> { children } </Box>
					)
				}
				
			</SafeAreaView>
		)
}

export default BasicTemplate
