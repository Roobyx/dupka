// Vendor
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Box, Center, Image, Button} from 'native-base'
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import { Asset } from 'expo-asset'
import * as ImageManipulator from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system'

// Redux
import { getUserUid } from '../../../../redux/features/auth/authSlice'

// Firebase
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore'
import { db as FBDB, firebaseStorage } from '../../../../firebaseSetup'
import { ref } from "firebase/storage"
import { useAppSelector } from '../../../../redux/features/hooks'

type CreateReportComponent = {
	route: any
	navigation?: any,
}

const CreateReport = ({route, navigation}: CreateReportComponent) => {
	const userUid = useAppSelector(getUserUid)
	const db = FBDB
	const [originalPhotoURI, setOriginalPhotoURI] = useState<string>(route.params.photoPath)
	const [crunchedPhoto, setCrunchedPhoto] = useState<any>(originalPhotoURI)

	// Crunch the photo upon landing on the screen
	useEffect(() => {
		crunchPhoto()
	}, [])
	

	// Bundle the report upload
	const saveReport = async () => {
		const tempUuid = uuid()
		const uri = originalPhotoURI
		const storageFileName = `reports/${userUid}/${tempUuid}`
		const res = await fetch(uri)
		const blob = await res.blob()
		const storage = firebaseStorage
		const storageRef = ref(storage, storageFileName)
		
		// const uploadTask = uploadBytesResumable(storageRef, blob)

		// uploadTask.on('state_changed', (snapshot: any) => {
	// 		// Listen for state changes, errors, and completion of the upload.
	
	// 		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	// 		const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
	// 			console.log('Upload is ' + progress + '% done')
	// 			switch (snapshot.state) {
	// 				case 'paused':
	// 				console.log('Upload is paused')
	// 				break
	// 				case 'running':
	// 				console.log('Upload is running')
	// 				break
	// 			}
	// 		},  (e: any) => {
	// 			switch (e.code) {
	// 				case 'storage/unauthorized':
	// 				// User doesn't have permission to access the object
	// 				break
	// 				case 'storage/canceled':
	// 				// User canceled the upload
	// 				break
	// 				case 'storage/unknown':
	// 				// Unknown error occurred, inspect error.serverResponse
	// 				break
	// 			}
	// 		}, () => {
	// 			// Upload completed successfully, now we can get the download URL
	// 			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
	// 				console.log('File available at', downloadURL)
	// 				// uploadReport(downloadURL)
	// 			})
	// 		}
	// 	)
	}

	// Utility to build up and upload the report
	const uploadReport = async (downloadUrl: string) => {
		console.log('Running uploadReport')

		try {
			const docRef = await addDoc(collection(db, "reports"), {
				uid: userUid,
				reportImage: downloadUrl,
				timestamp: serverTimestamp()
			})

			console.log("Document written with ID: ", docRef.id)
			navigation.popToTop({reportStatus: 'success'})
		} catch(e) {
			console.log('Error in db write: ', e)
		}
	}
	
	// Compress the photo to save bandwith on the server
	const crunchPhoto = async () => {
		console.log('Initial size: ', await FileSystem.getInfoAsync(originalPhotoURI, {size: true}))

		const manipResult = await ImageManipulator.manipulateAsync(
			originalPhotoURI,
			[],
			// TODO: Test different compression levels
			{ format: ImageManipulator.SaveFormat.JPEG, compress: 0.9 }
		)
		
		setCrunchedPhoto(manipResult)
		console.log('Compressed size: ', await FileSystem.getInfoAsync(manipResult.uri, {size: true}))
	}

	return (
		<Box bg='black' flex={1} style={styles.container}>
			{/* TODO: Export to a comp and add to take and browse photos */}
			<Box flex={1}>
				<Image style={styles.photoPreview}
					source={{
						uri: originalPhotoURI,
					}}
					alt='Latest image'
				/>
			</Box>

			{/* <Button onPress={saveReport}> Save report </Button> */}
			<Button onPress={() => uploadReport}> Fake report </Button>
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

