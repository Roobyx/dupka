import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, StatusBar, useColorScheme } from 'react-native'
import { Box } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';

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
						<Box flex={1}>
							<LinearGradient
								colors={['#2c5364', '#203a43', '#0f2027']}
								style={styles.background}
							>
								{ children }
							</LinearGradient>
						</Box>
					)
			}
		</Box>
	)
}

export default BasicTemplate

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
	background: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: '100%',
	},
})
