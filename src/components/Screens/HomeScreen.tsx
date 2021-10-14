import React from 'react'
import { Box, Text } from 'native-base'

const HomeScreen: React.FC<Page> = ({ route }) => {
	return (
		<Box>
			<Text> Welcome {route.params.email} </Text>
		</Box>
	)
}

export default HomeScreen
