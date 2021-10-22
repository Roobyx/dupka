// Vendor
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { Camera } from 'expo-camera'
import { Box, Center, HStack, Circle, Pressable, Image } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'

const TakePhotoScreen = ({navigation}: any) => {
	const [hasPermission, setHasPermission] = useState<null | string | boolean>(null)
	const [camera, setCamera] = useState<Camera | null>(null)
	const [photoPath, setPhotoPath] = useState<string | undefined>(undefined)
	const [type, setType] = useState(Camera.Constants.Type.back)
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const rotateCameraMode = () => {
		if(flashMode === Camera.Constants.FlashMode.off) {
			setFlashMode(Camera.Constants.FlashMode.on)
		} else if (flashMode === Camera.Constants.FlashMode.on) {
			setFlashMode(Camera.Constants.FlashMode.auto)
		} else if (flashMode === Camera.Constants.FlashMode.auto) {
			setFlashMode(Camera.Constants.FlashMode.torch)
		} else if (flashMode === Camera.Constants.FlashMode.torch) {
			setFlashMode(Camera.Constants.FlashMode.off)
		}
	}

	const takePhoto = async () => {
		if(camera) {
			const data = await camera.takePictureAsync()
			setPhotoPath(data.uri)
		}
	}

	if (hasPermission === null) {
		return <View />
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}
	return (
		<Box flex={1} bg={'black'}>
			<HStack h="20%" alignItems="center" style={styles.actionsRow}>
				<Box>
					{
						(() => {
							switch (flashMode) {
								case Camera.Constants.FlashMode.off:
									return (<Pressable onPress={rotateCameraMode}>
												<Icon name="flash-off" color='white' size={36}/> 
											</Pressable>)

								case Camera.Constants.FlashMode.on:
									return (<Pressable onPress={rotateCameraMode}>
												<Icon name="flash-on" color='white' size={36}/> 
											</Pressable>)

								case Camera.Constants.FlashMode.auto:
									return <Pressable onPress={rotateCameraMode}>
												<Icon name="flash-auto" color='white' size={36}/> 
											</Pressable>
								default:
									return (<Pressable onPress={rotateCameraMode}>
												<Icon name="flash-on" color='yellow' size={36}/> 
											</Pressable>)
							}
						})()
					}
				</Box>
			</HStack>
			
			{
				photoPath ? (
					<Box style={styles.container}>
						<Box style={styles.camera}> 
							<Image source={{
									uri: photoPath,
								}} 
								size='full'
								alt='Latest image'
							/>
						</Box>
					</Box>
				) : (
					<Box style={styles.container}>
						<Camera style={styles.camera} ref={ref => setCamera(ref)} type={type} ratio={'4:3'} flashMode={flashMode}/>
					</Box>
				)
			}
			
			<HStack h="20%" alignItems="center" style={styles.actionsRow}>
				
				{
					photoPath ? (
						<>
							<Pressable
								w='20'
								onPress={() => setPhotoPath(undefined)}>
								<Center>
									<Text style={styles.text}> X </Text>
								</Center>
							</Pressable>

							<Pressable
								w='20'
								onPress={() => navigation.navigate('CreateReport', { photoPath })}>

								<Center>
									<Text style={styles.text}> Save </Text>
								</Center>
							</Pressable>
						</>
					) : (
						<>
							<Pressable
								w='20'
								onPress={() => navigation.goBack()}>
								<Center>
									<Text style={styles.text}> Cancel </Text>
								</Center>
							</Pressable>

							<Pressable
								w='20'
								onPress={takePhoto}>

								<Center>
									<Text style={styles.text}>
										<Circle size={20} bg="transparent" borderWidth={6} borderStyle={'solid'} borderColor={'white'} >
											<Circle size={16} bg="white"/>
										</Circle>
									</Text>
								</Center>
							</Pressable>

							<Pressable
								w='20'
								onPress={() => {
									setType(
										type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
									)
								}}>

								<Center>
									{
										Platform.OS === 'android' ? (
											<Icon name="flip-camera-android" color='white' size={36}/>
										) : (
											<Icon name="flip-camera-ios" color='white' size={36}/>
										)
									}
								</Center>
							</Pressable>
						</>
					)
				}

			</HStack>
		</Box>
		)
}

export default TakePhotoScreen

const styles = StyleSheet.create({
	actionsRow: {
		justifyContent: 'space-around'
	},
	container: {
		flex: 1
	},
	camera: {
		flex: 1
	},
	cameraActions: {
	},
	text: {
		fontSize: 18,
		color: 'white',
	}
})
