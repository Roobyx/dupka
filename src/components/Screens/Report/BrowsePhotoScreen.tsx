import React, { useState, useEffect } from 'react'

import { StyleSheet } from 'react-native'
import { Box, Center, HStack, Image, Pressable, Text } from 'native-base'
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { NavElement } from '../../../interfaces/types'

const BrowsePhotoScreen = ({navigation}: NavElement) => {
	const [photoPath, setPhotoPath] = useState<string | null>(null)
	const [photoExif, setPhotoExif] = useState<{ [key: string]: any; } | undefined>(undefined)

	useEffect(() => {
		(async () => {
			setPhotoPath(null)
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!')
				} else {
					pickImage()
				}
			} else {
				alert('Sorry, no photo upload from web')
				navigation.goBack()
			}
		})()
	}, [])

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			exif: true
		})

		if (!result.cancelled) {
			setPhotoPath(result.uri)
			setPhotoExif(result.exif)
		} else {
			navigation.goBack()
		}
	}

	return (
		<Box flex={1} bg={'black'}>
			{
				photoPath && (
					<>
						<Box style={styles.container}>
							<Center flex={1} px="3">
								<Image style={styles.photoPreview}
									source={{
										uri: photoPath,
									}}
									alt='Latest image'
								/>
							</Center>
						</Box>

						<HStack h="20%" alignItems="center" style={styles.actionsRow}>
							<Pressable
								w='20'
								onPress={() => navigation.goBack()}>
								<Center>
									<Text style={styles.text}> X </Text>
								</Center>
							</Pressable>

							<Pressable
								w='20'
								onPress={() => navigation.navigate('CreateReport', { photoPath, photoExif, origin: 'gallery' })}>

								<Center>
									<Text style={styles.text}> Save </Text>
								</Center>
							</Pressable>
						</HStack>
					</>
				)
			}
		</Box>
	)
}

export default BrowsePhotoScreen

const styles = StyleSheet.create({
	actionsRow: {
		flex: 1,
		justifyContent: 'space-around'
	},
	container: {
		flex: 10
	},
	// TODO: Better image fit
	photoPreview: {
		resizeMode: 'cover',
		height: 400,
		width: 400
	},
	text: {
		fontSize: 18,
		color: 'white',
	}
})

