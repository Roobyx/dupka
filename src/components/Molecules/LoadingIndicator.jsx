import React from "react"
import { StyleSheet } from "react-native"
import { Box, Text, Center, Spinner, Heading } from "native-base"

const LoadingIndicator = () => {
	return (
		<Center height={'100%'} width={{base: '100%'}}>
			<Box>
				<Spinner accessibilityLabel="Loading posts" />
				<Heading color="primary.500" fontSize="md">
					Loading
				</Heading>
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

