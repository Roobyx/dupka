import React from "react"
import { StyleSheet } from "react-native"
import { Box, Text, Center, isLoading, Button } from "native-base"

const LoadingIndicator = () => {
	return (
		<Center height={'100%'} width={{base: '100%'}}>
			<Box>
				<Button isLoading variant="ghost">
					Loading
				</Button>
			</Box>
		</Center>
	)
}

// const styles = StyleSheet.create({
// 	absolute: {
// 		position: 'absolute',
// 		top: '40pt',
// 		left: '40pt'
// 	}
// })

export default LoadingIndicator

