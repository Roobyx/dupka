// Vendor
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Alert } from 'react-native'
import { Box, Image, Button, Center, Text, Heading} from 'native-base'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

// Redux
import { getUserId } from '../../../../redux/features/auth/authSlice'

// Expo
import * as ImageManipulator from 'expo-image-manipulator'
import { Action, ActionResize } from 'expo-image-manipulator'
// import * as FileSystem from 'expo-file-system'

// Firebase
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore'
import { db as FBDB, firebaseStorage } from '../../../../firebaseSetup'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useAppSelector } from '../../../../redux/features/hooks'

// Custom
//- Helpers
import { getFullLocationInfo, getLocation, RichLocationObject } from '../../../helpers/location'
import LoadingIndicator from '../../Molecules/LoadingIndicator'
import StarRating from 'react-native-star-rating-widget'

//- Components
//-- Molecules

type CreateReportComponent = {
	route: any
	navigation?: any,
}

const CreateReport = ({route, navigation}: CreateReportComponent) => {
	const userId = useAppSelector(getUserId)
	const db = FBDB
	const [sendingReport, setSendingReport] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)
	const [photoExif, setPhotoExif] = useState(route.params.photoExif)
	const [richLocation, setRichLocation] = useState<RichLocationObject | null>(null)
	// TODO: Unneded state logic - merge it into one
	const [originalPhotoURI, setOriginalPhotoURI] = useState<string>(route.params.photoPath)
	const [crunchedPhoto, setCrunchedPhoto] = useState<string>(originalPhotoURI)
	const [rating, setRating] = useState(0)

	// Crunch the photo upon landing on the screen
	useEffect(() => {
		// (async ()=>{
		// 	await updateLoc()
		// })()
		
		crunchPhoto()
		console.log('IN CREATE REPORT (useEffect)')
	}, [])
	

	const updateLoc = async () => {
		let loc = await getFullLocationInfo()
		// setRichLocation(loc)

		return loc
	}

	// Bundle the report upload
	const saveReport = async () => {
		const tempUuid = uuid()
		const uri = crunchedPhoto
		const storageFileName = `reports/${userId}/${tempUuid}`
		const res = await fetch(uri)
		const blob = await res.blob()
		const storage = firebaseStorage
		const storageRef = ref(storage, storageFileName)
		
		const uploadTask = uploadBytesResumable(storageRef, blob)

		if(rating === 0) {
			Alert.alert(
				"Rating is required",
				"Please rate the report, before submiting",
				[
					{ text: "OK", onPress: () => console.log("OK Pressed") }
				]
			)

		} else {
			uploadTask.on('state_changed', (snapshot: any) => {
				// Set the loading logic to true
				setSendingReport(true)
			
				// Listen for state changes, errors, and completion of the upload.
		
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log('Upload is ' + progress + '% done')
					setUploadProgress(progress)
	
					switch (snapshot.state) {
						case 'paused':
						console.log('Upload is paused')
						break
						case 'running':
						console.log('Upload is running')
						break
					}
				},  (e: any) => {
					switch (e.code) {
						case 'storage/unauthorized':
						// User doesn't have permission to access the object
						break
						case 'storage/canceled':
						// User canceled the upload
						break
						case 'storage/unknown':
						// Unknown error occurred, inspect error.serverResponse
						break
					}
				}, () => {
					// Upload completed successfully, now we can get the download URL
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('File available at', downloadURL)
						uploadReport(downloadURL)
					}).then(
						() => {
							// Set the loading back to false
							setSendingReport(false)
							// alert('Report sent. Waiting for approval.')
							Alert.alert(
								"Report submited",
								"Your report is being proccesed and will be available when ready.",
								[
									{ text: "OK", onPress: () => console.log("OK Pressed") }
								]
							)
							navigation.popToTop({reportStatus: 'success'})
						}
					)
				}
			)
		}
	}

	// Utility to build up and upload the report
	const uploadReport = async (downloadUrl: string) => {
		console.log('Running uploadReport')
		const newRichLoc = await updateLoc()

		// TODO: Add report templates
		try {
			const docRef = await addDoc(collection(db, "reports"), {
				uid: userId,
				reportImage: downloadUrl,
				location: newRichLoc.location,
				address: newRichLoc.address,
				rating: rating,
				rates: [userId],
				status: 'pending',
				likes: [],
				faces: route.params.faceDetected,
				timestamp: serverTimestamp()
			})

			console.log("Document written with ID: ", docRef.id)
		} catch(e) {
			console.log('Error in db write: ', e)
		}
		
	}
	
	// Compress the photo to save bandwith on the server
	const crunchPhoto = async () => {
		// console.log('Initial size: ', await FileSystem.getInfoAsync(originalPhotoURI, {size: true}))
		const options = setMaxDimention()
		let optionsArray: Action[] = []

		if(options) {
			optionsArray = [options]
		}


		const manipResult = await ImageManipulator.manipulateAsync(
			originalPhotoURI,
			optionsArray,
			// TODO: Test different compression levels
			{ format: ImageManipulator.SaveFormat.JPEG, compress: 0.2 }
		)
		
		setCrunchedPhoto(manipResult.uri)
		// console.log('Compressed size: ', await FileSystem.getInfoAsync(manipResult.uri, {size: true}))
	}

	// const testLocations = async () => {
	// 	setSendingReport(true)

	// 	let newLoc = await getLocation()

	// 	console.log('getLoc loc: ', newLoc)
	// 	// console.log('Rich loc: ', richLocation?.address)

	// 	setSendingReport(false)

	// 	if (richLocation !== null && richLocation !== undefined) {
	// 		alert(richLocation.address)
	// 	} else {
	// 		alert('problem')
	// 	}
	// }

	const setMaxDimention = () => {
		let len = photoExif.PixelYDimension || photoExif.ImageLength
		let width = photoExif.PixelXDimension || photoExif.ImageWidth
		let newSize = 2048
		let options: ActionResize = { resize: {}}
		// console.log('exif: ', photoExif)
		// console.log(`----> len: ${len}, width ${width}`)

		// Check origin of photo
		if(route.params.origin === 'camera') {
			// If its a photo check exif for dimentions, find the bigger, compare to max and cap if needed
			if(len > width) {
				if(len > newSize) {
					len = newSize
					// console.log(`Capped len = 2048 -> ${len}`)

				} else {
					// console.log(`Capped newSize = ${len}`)
					newSize = len
				}

				options = { resize: {height: newSize} }

			} else {
				if(width > newSize) {
					width = newSize
					// console.log(`Capped width = ${width}`)
				} else {
					// console.log(`Capped newSize = ${width}`)
					newSize = width
				}
				
				options = { resize: {width: newSize} }
			}
		} else {
			// If its from gallery ==> image is cropped and dimentions are the same
			// console.log('-----G-----')
			// console.log('Photo comes from gallery')
			// Apple does not attach photo dimentions to screenshots so check for undefined values
			if(len === undefined || width === undefined) {
			// If there len/width are undefined then its possibly an iOS screenshot, so checking for platform and if iphone, leave as is
			// TODO: Fix if there is an available solution for getting image size that is not exif based
			// console.log('-----Platform-----')
			// console.log('Platform: ', Platform)
			
			return null

			} else {
				if(width > newSize) {
					len = newSize
				} else {
					newSize = len
				}
			}

			options = { resize: {width: newSize} }
		}

		// console.log('FinalValue: ', options)
		return options
	}

	return (
		<Box bg='black' flex={1} style={styles.container}>
			{
				sendingReport ? (
					<LoadingIndicator action='Uploading' progress={uploadProgress} />
				) : (
					<>
						<Center>
							<Heading flex={1}>
								Crete report:
							</Heading>
						</Center>
						{/* TODO: Export to a comp and add to take and browse photos */}
						<Center flex={2}>
							<Image style={styles.photoPreview}
								source={{
									uri: originalPhotoURI,
								}}
								alt='Latest image'
							/>
						</Center>

						<Center flex={1}>
							<Text>
								Rate the severity:
							</Text>

							{/* TODO: Build a star rating comp and replace the external one */}
							<StarRating
								rating={rating}
								onChange={setRating}
							/>
						</Center>

						<Button onPress={saveReport}> Submit report </Button>
						{/* <Button onPress={() => uploadReport(crunchedPhoto)}> Fake report </Button> */}
						{/* <Button onPress={() => testLocations()}> Fake report </Button> */}
					</>
				)
			}
		</Box>
	)
}

export default CreateReport

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
		resizeMode: 'contain',
		height: 500,
		width: 500
	},
	text: {
		fontSize: 18,
		color: 'white',
	}
})

