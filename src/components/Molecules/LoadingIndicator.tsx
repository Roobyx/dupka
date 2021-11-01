import React from "react"
import { StyleSheet } from "react-native"
import { Box, Text, Center, Spinner, Heading } from "native-base"

type LoadingIndicator = {
	action?: string,
	progress?: number
	spinnerOnly?: boolean
	style?: any
}

const LoadingIndicator: React.FC<LoadingIndicator> = ({action, progress, spinnerOnly, style}) => {
	const componentHeight = spinnerOnly ? 'auto' : '100%'

	return (
		<Center style={style || styles} height={componentHeight} width={{base: '100%'}}>
			<Box>
				<Spinner accessibilityLabel="Loading posts" />
				{
					!spinnerOnly && (
						<Heading color="primary.500" fontSize="md">
							{
								action ? `${action} ` : 'Loading'
							}

							{
								progress && ` ${Math.floor(progress)}%` 
							}
						</Heading>
					)
				}
			</Box>
		</Center>
	)
}

const styles = StyleSheet.create({
})

export default LoadingIndicator

