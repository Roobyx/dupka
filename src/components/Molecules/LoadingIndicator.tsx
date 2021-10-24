import React from "react"
import { StyleSheet } from "react-native"
import { Box, Text, Center, Spinner, Heading } from "native-base"

type LoadingIndicator = {
	action?: string,
	progress?: number
}

const LoadingIndicator: React.FC<LoadingIndicator> = ({action, progress}) => {
	return (
		<Center height={'100%'} width={{base: '100%'}}>
			<Box>
				<Spinner accessibilityLabel="Loading posts" />
				<Heading color="primary.500" fontSize="md">
					{
						action ? `${action} ` : 'Loading'
					}

					{
						progress && ` ${Math.floor(progress)}%` 
					}
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

