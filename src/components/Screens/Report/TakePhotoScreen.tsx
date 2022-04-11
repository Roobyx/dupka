// Vendor
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { Camera, FaceDetectionResult } from 'expo-camera'
import { Box, Center, HStack, Circle, Pressable, Image } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Expo
import * as FaceDetector from 'expo-face-detector'
import { textAlign } from 'styled-system'

// {
// 	"faceBox": Object {
// 	  "origin": Object {
// 		"x": 18.818181818181813,
// 		"y": 189.85909090909092,
// 	  },
// 	  "size": Object {
// 		"height": 221.50227272727275,
// 		"width": 227.18181818181816,
// 	  },
// 	},
// 	"faceDetected": true,
//   }


type TFaceDetectionObject = {
	faceBox?: {
		origin: {
			x: number,
			y: number,
		},
		size: {
			height: number,
			width: number,
		},
	},
	pictureTaken?: boolean,
	faceDetected: boolean,
}



const TakePhotoScreen = ({navigation}: any) => {
	const [hasPermission, setHasPermission] = useState<null | string | boolean>(null)
	const [camera, setCamera] = useState<Camera | null>(null)
	const [photoPath, setPhotoPath] = useState<string | undefined>(undefined)
	const [photoExif, setPhotoExif] = useState<string | undefined>(undefined)
	const [type, setType] = useState(Camera.Constants.Type.back)
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)
	const [faceDetected, setFaceDetected] = useState<TFaceDetectionObject>({faceDetected: false})

	useEffect(() => {
		(async () => {
			// const { status } = await Camera.requestPermissionsAsync()
			const { status } = await Camera.requestCameraPermissionsAsync()
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
			const data = await camera.takePictureAsync({skipProcessing: true, exif: true})
			setPhotoPath(data.uri)
			setPhotoExif(data.exif)
		}
	}

	if (hasPermission === null) {
		return <View />
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}


	// Face detection
	const handleFaceDetection = ({faces}: {faces: any[]}) => {
		console.log('Face detected:')

		if (faces.length === 1){ // detect a face
			setFaceDetected({
				faceDetected: true, // variable state to hold face is detected
				faceBox: faces[0].bounds // variable to hold face location
			})
		} else { // no faces detected
			setFaceDetected({faceDetected: false})
		}

		console.log('---> ', faceDetected)
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
						<Camera 
							style={styles.camera} 
							ref={ref => setCamera(ref)} 
							type={type} 
							ratio={'4:3'} 
							flashMode={flashMode}
							
							onFacesDetected={handleFaceDetection}
							// onFaceDetectionError={this.handleFaceDetectionError}
							faceDetectorSettings={{
								mode: FaceDetector.FaceDetectorMode.accurate,
								detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
								runClassifications: FaceDetector.FaceDetectorClassifications.none,
							}}

						/>

						{faceDetected.faceDetected && (
							<>
								<Text
									style={{
										position: 'absolute',
										color: '#fff',
										textAlign: 'center'
									}}
								> 
									Please avoid people in the photo
								</Text>
								<Box
									style={{
										position: 'absolute',
										backgroundColor: 'transparent',
										flexDirection: 'row',
										// width: faceDetected.faceBox ? faceDetected.faceBox.size.width : '100%',
										// height: faceDetected.faceBox ? faceDetected.faceBox.size.height : '100%',
										// top: faceDetected.faceBox ? faceDetected.faceBox.origin.y : '0%',
										// left: faceDetected.faceBox ? faceDetected.faceBox.origin.x : '0%',
										// borderColor: '#33FF33',
										borderWidth: 5,
										borderStyle: 'dashed',
										display: faceDetected.faceDetected && !faceDetected.pictureTaken ? 'flex' : 'none',
									}}>
								</Box>
							</>
						)}
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
								onPress={() => navigation.navigate('Create Report', { photoPath, photoExif, origin: 'camera', faceDetected })}>

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
