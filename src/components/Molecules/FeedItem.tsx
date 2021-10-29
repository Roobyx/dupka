// Vendor
import React from 'react'
import { StyleSheet } from 'react-native'
import { Box, Heading, Text, Image, AspectRatio, Center, Stack, HStack } from 'native-base'
import { Timestamp } from 'firebase/firestore'

type TFeedItem = {
	address: string,
	imageUri: string,
	timestamp: Timestamp,
	rating: number
}

const FeedItem = ({address, imageUri, timestamp, rating}: TFeedItem) => {
	const getTime = (seconds: number) => {
		const time = new Date(Date.UTC(1970, 0, 1))
		time.setSeconds(seconds)
		return time.toLocaleString()
	}

	console.log('Time: ', getTime(timestamp.seconds))
	const reportTime = getTime(timestamp.seconds)

	return (
		<Box
			rounded="lg"
			overflow="hidden"
			width="80"
			shadow={1}
			_light={{ backgroundColor: 'gray.50' }}
			_dark={{ backgroundColor: 'gray.700' }}
		>
			<Box p='0'>
				<AspectRatio ratio={1 / 1}>
					<Image source={{ uri: imageUri, }} alt="image" />
				</AspectRatio>
				
				<Center
					bg="violet.500"
					_text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
					position="absolute"
					bottom={0}
					px="3"
					py="1.5"
				>
					{ rating }
				</Center>
			</Box>
		
			<Stack p="4" space={3}>
				<Stack space={2}>
					<Heading size="md" ml="-1">
						{ address }
					</Heading>

					<Text
						fontSize="xs"
						_light={{ color: 'violet.500' }}
						_dark={{ color: 'violet.300' }}
						fontWeight="500"
						ml="-0.5"
						mt="-1"
					>
						{ reportTime }
					</Text>
				</Stack>
			</Stack>
		</Box>
	)
}

export default FeedItem

const styles = StyleSheet.create({})
