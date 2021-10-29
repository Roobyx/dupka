import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, StatusBar, useColorScheme, SafeAreaView } from 'react-native'
import { Box, Container } from 'native-base'

type BasicTemplate = {
	isList: boolean
	navigation?: any
}

const BasicTemplate: React.FC<BasicTemplate> = ({isList, children}) => {
	const isDarkMode = useColorScheme() === 'dark'

	useEffect(() => {
	}, [])

	return (
			<Box style={styles.container}>
				<StatusBar translucent={true} />
				{
					isList ? (
						<ScrollView contentInsetAdjustmentBehavior="automatic">
							<Box flex={1}> { children } </Box>
						</ScrollView>
						) : (
						<Box flex={1}> { children } </Box>
					)
				}
			</Box>
		)
}

export default BasicTemplate

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center"
	}
})
